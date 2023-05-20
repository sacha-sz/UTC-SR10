var express = require('express');
var router = express.Router();
var entrepriseModel = require('../model/Entreprise');
var app = express();
var path = require('path');
const e = require('express');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/* GET Connexion page. */
app.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('entreprise_rejoindre', {
            title: 'Connexion',
            username: req.session.username
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/inscription', function (req, res, next) {
    result = entrepriseModel.readTypeOrganisation(function (err, result) {
        if (req.session.loggedin) {
            if (result == null || err) {
                console.log("Aucun type d'organisation");
                res.redirect('/entreprise');
            } else {
                res.render('entreprise_inscription', {
                    title: 'Inscription',
                    type_orga: result,
                    username: req.session.username
                });
            }
        } else {
            res.redirect('/login');
        }
    });

});

app.get('/delete_entreprise', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('entreprise_delete', {
            title: 'Suppression',
            username: req.session.username
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/delete_entreprise', function (req, res, next) {
    var siren = req.body.SIREN;
    var promises = [];

    console.log(siren);
    if (siren == null || siren == "") {
        console.log("Données manquantes");
        res.redirect('/entreprise');
    }
    
    promises.push(new Promise(function (resolve) {
        entrepriseModel.delete(siren, function (result) {
        if (result) {
            console.log("Entreprise supprimée");
            resolve(true);
        } else {
            console.log("Erreur lors de la suppression de l'entreprise");
            resolve(false);
        }
        });
    }));

    Promise.all(promises).then(function (values) {
        if (values.includes(false)) {
            res.redirect('/entreprise');
        } else {
            res.redirect('/'); 
        }
    });
});


app.post('/inscripion', function (req, res, next) {
    console.log('Inscription d\'une entreprise');
    var name = req.body.name;
    var siren = req.body.SIREN;
    var lat = req.body.lat;
    var long = req.body.long;
    var type_organisation = req.body.type_organisation;

    var promises = [];

    console.log(name);
    console.log(siren);
    console.log(lat);
    console.log(long);
    console.log(type_organisation);


    if (name == null || siren == null || name == "" || siren == "" || lat == null || lat == "" || long == null || long == "" || type_organisation == null || type_organisation == "") {
        console.log("Données manquantes");
        res.redirect('/entreprise/inscription');
    }
    
    promises.push(new Promise(function (resolve) {
        entrepriseModel.TEST_LATITUDE(lat, function (result) {
            if (result) {
                console.log("Latitude valide");
                resolve(true);
            } else {
                console.log("Latitude invalide");
                resolve(false);
            }
        });
    }));

    promises.push(new Promise(function (resolve) {
        entrepriseModel.TEST_LONGITUDE(long, function (result) {    
            if (result) {
                console.log("Longitude valide");
                resolve(true);
            } else {
                console.log("Longitude invalide");
                resolve(false);
            }
        });
    }));

    promises.push(new Promise(function (resolve) {
        entrepriseModel.isValidSIREN(siren, function (error, result) {
            if (result) {
                console.log("SIREN valide");
                resolve(true);
            } else {
                console.log("SIREN invalide");
                resolve(false);
            }
        });
    }));

    Promise.all(promises).then(function (values) {
        if (values.includes(false)) {
            res.redirect('/entreprise/inscription');
        } else {
            console.log("Toutes les données sont valides");
        }
    });

    if (type_organisation == "Autre") {
        var newType = req.body.newOrganisation;
        var newDescription = req.body.newDescription;
        if (newType == null || newType == "" || newDescription == null || newDescription == "") {
            console.log("Données manquantes");
            res.redirect('/entreprise/inscription');
        }


        type_organisation = newType;
        
        promises.push(new Promise(function (resolve) {
            entrepriseModel.createTypeOrganisation(newType, newDescription, function (result) {
                if (result) {
                    console.log("Organisation créée");
                    resolve(true);
                } else {
                    console.log("Erreur lors de la création de l'organisation");
                    resolve(false);
                }
            });
        }));
    }

    Promise.
    entrepriseModel.create(siren, name, lat, long, type_organisation, function (result) {
        if (result) {
            console.log("Entreprise créée");
            res.redirect('/');
        } else {
            res.redirect('/entreprise/inscription');
        }
    });
})



app.post('/rejoindre_entreprise', function (req, res, next) {
    var siren = req.body.SIREN;
    console.log(siren);

    // Vérif des données entrées
    if (siren == null || siren == "") {
        console.log("Données manquantes");
        res.redirect('/entreprise');
    }

    if (!entrepriseModel.isValidSIREN(siren)) {
        console.log("SIREN Invalide");
        res.redirect('/entreprise');
    }

    var promises = [];

    // Check si l'entreprise existe
    promises.push(new Promise(function (resolve) {
        entrepriseModel.read(siren, function (error, result) {
            if (result.lenght == 0) {
                console.log("Entreprise inexistante, Il faut la créer");
                resolve(false);
            }
            resolve(true);
        });
    }));

    if (promises[0] == true) {
        promises.push(new Promise(function (resolve) {
            entrepriseModel.addUser(siren, req.session.username, function (error, result) {
                if (result) {
                    console.log("Utilisateur ajouté à l'entreprise");
                    resolve(true);
                } else {
                    console.log("Erreur lors de l'ajout de l'utilisateur à l'entreprise");
                    resolve(false);
                }
            });
        }));
    }

    Promise.all(promises).then(function (values) {
        if (values.includes(false)) {
            res.redirect('/entreprise');
        }
        res.redirect('/entreprise');
    });

})

module.exports = app;