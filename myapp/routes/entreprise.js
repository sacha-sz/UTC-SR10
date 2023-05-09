var express = require('express');
// var session = require('express-session');
var router = express.Router();
var entrepriseModel = require('../model/Entreprise');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/* GET Connexion page. */
app.get('/', function(req, res, next) {
    res.render('entreprise_rejoindre', { title: 'Connexion' });
});

app.get('/inscription', function(req, res, next) {
    result = entrepriseModel.readTypeOrganisation(function(result) {
        res.render('entreprise_inscription', { title: 'Inscription', type_orga: result});
    });
    // res.render('connexion', { title: 'Connexion' });
});

app.post('/inscripion', function(req, res, next) {
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
        return res.redirect('/entreprise/inscription');
    }
    if (!TEST_LATITUDE(lat) || !TEST_LONGITUDE(long)) {
        console.log("Coordonnées GPS invalides");
        return res.redirect('/entreprise/inscription');
    }
    if(!isValidSIREN(siren)) {
        console.log("SIREN Invalide");
        return res.redirect('/entreprise');
    }
    if(type_organisation == "Autre") {
        var newType = req.body.newOrganisation;
        var newDescription = req.body.newDescription;
        if(newType == null || newType == "" || newDescription == null || newDescription == "") {
            console.log("Données manquantes");
            return res.redirect('/entreprise/inscription');
        }
        type_organisation = newType;
        entrepriseModel.createTypeOrganisation(newType,newDescription, function(result) {
            if (result) {
                console.log("Organisation créée");
            } else {
                return res.redirect('/entreprise/inscription');
            }
        });
    }
    entrepriseModel.create(siren, name, lat, long, type_organisation, function(result) {
        if (result) {
            console.log("Entreprise créée");
            res.redirect('/'); // TODO : redirect to home login/home
        } else {
            res.redirect('/entreprise/inscription');
        }
    });
})

    app.post('/rejoindre_entreprise', function(req, res, next) {
        // TODO : Ajouter qq un a une entreprise,
        // Comment le rentrer dans la base de données
        var siren = req.body.SIREN;
        console.log(siren);
        // Vérif des données entrées
        if (siren == null || siren == "") {
            console.log("Données manquantes");
            return res.redirect('/entreprise');
        }
        if(!isValidSIREN(siren)) {
            console.log("SIREN Invalide");
            return res.redirect('/entreprise');
        }

        // Check si l'entreprise existe
        entrepriseModel.read(siren, function(result) {
        if(result.lenght == 0) {
            console.log("Entreprise inexistante, Il faut la créer");
            return res.redirect('/entreprise');
        }

        // Ajoute le formumaire pr ajouter un utilisateur à l'entreprise
        entrepriseModel.addUser(siren, req.session.username ,function(result) {
            if(result) {
                console.log("Utilisateur ajouté à l'entreprise");
                return res.redirect('/entreprise');
            } else {
                console.log("Erreur lors de l'ajout de l'utilisateur à l'entreprise");
                return res.redirect('/entreprise');
            }
        });
        });

    })


// Test que la latitude et la longitude soient valides
function TEST_LATITUDE(latitude) {
    // Vérification de la latitude
    // Format : 
    // - Un nombre décimal compris entre -90 et 90
    var correct_latitude_test = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
    return correct_latitude_test.test(latitude);
}

function TEST_LONGITUDE(longitude) {
    // Vérification de la longitude
    // Format : 
    // - Un nombre décimal compris entre -180 et 180
    var correct_longitude_test = /^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
    return correct_longitude_test.test(longitude);
}
function isValidSIREN(siren) {
    var pattern = /^[0-9]{9}$/;
    if (!pattern.test(siren)) {
      return false;
    } else {
        return true;
    }
}

function VerifSIREN(siren) {
    var somme = 0;
    var tmp;
    for (var cpt = 0; cpt < 8; cpt++) {
        if ((cpt % 2) == 1) {
            tmp = siren.charAt(cpt) * 2;
            if (tmp > 9) {
                tmp -= 9;
            }
        } else {
            tmp = siren.charAt(cpt);
        }
        somme += parseInt(tmp);
    }
    somme += parseInt(siren.charAt(8));
    if ((somme % 10) == 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = app;