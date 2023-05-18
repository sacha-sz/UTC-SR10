var express = require('express');
var router = express.Router();
var entrepriseModel = require('../model/Entreprise');
var app = express();
var path = require('path');


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
    console.log(siren);
    if (siren == null || siren == "") {
        console.log("Données manquantes");
        res.redirect('/entreprise');
    }
    entrepriseModel.delete(siren, function (result) {
        if (result) {
            console.log("Entreprise supprimée");
            res.redirect('/');
        } else {
            res.redirect('/entreprise');
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
    console.log(name);
    console.log(siren);
    console.log(lat);
    console.log(long);
    console.log(type_organisation);
    if (name == null || siren == null || name == "" || siren == "" || lat == null || lat == "" || long == null || long == "" || type_organisation == null || type_organisation == "") {
        console.log("Données manquantes");
        res.redirect('/entreprise/inscription');
    }
    if (!entrepriseModel.TEST_LATITUDE(lat) || !entrepriseModel.TEST_LONGITUDE(long)) {
        console.log("Coordonnées GPS invalides");
        res.redirect('/entreprise/inscription');
    }
    if (!entrepriseModel.isValidSIREN(siren)) {
        console.log("SIREN Invalide");
        res.redirect('/entreprise');
    }
    if (type_organisation == "Autre") {
        var newType = req.body.newOrganisation;
        var newDescription = req.body.newDescription;
        if (newType == null || newType == "" || newDescription == null || newDescription == "") {
            console.log("Données manquantes");
            res.redirect('/entreprise/inscription');
        }
        type_organisation = newType;
        entrepriseModel.createTypeOrganisation(newType, newDescription, function (result) {
            if (result) {
                console.log("Organisation créée");
            } else {
                res.redirect('/entreprise/inscription');
            }
        });
    }
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
    // TODO : Ajouter qq un a une entreprise,
    // Comment le rentrer dans la base de données
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

    // Check si l'entreprise existe
    entrepriseModel.read(siren, function (result) {
        if (result.lenght == 0) {
            console.log("Entreprise inexistante, Il faut la créer");
            res.redirect('/entreprise');
        }

        // Ajoute le formumaire pr ajouter un utilisateur à l'entreprise
        entrepriseModel.addUser(siren, req.session.username, function (result) {
            if (result) {
                console.log("Utilisateur ajouté à l'entreprise");
                res.redirect('/entreprise');
            } else {
                console.log("Erreur lors de l'ajout de l'utilisateur à l'entreprise");
                res.redirect('/entreprise');
            }
        });
    });

})

module.exports = app;