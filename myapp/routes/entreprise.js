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
    res.render('entreprise_inscription', { title: 'Inscription' });
    // res.render('connexion', { title: 'Connexion' });
});

app.post('/inscripion', function(req, res, next) {
    console.log('Inscription d\'une entreprise');
    var name = req.body.name;
    var siren = req.body.SIREN;
    var lat = req.body.lat;
    var long = req.body.long;
    console.log(name);
    console.log(siren);
    console.log(lat);
    console.log(long);
    if (name == null || siren == null || name == "" || siren == "" || lat == null || lat == "" || long == null || long == "") {
        console.log("Données manquantes");
        return res.redirect('/entreprise/inscription');
    }
    if (!TEST_LATITUDE(lat) || !TEST_LONGITUDE(long)) {
        console.log("Coordonnées GPS invalides");
        return res.redirect('/entreprise/inscription');
    }
    // TODO : Vérif siren
    entrepriseModel.create(siren, name, lat, long, null, function(result) {
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
        if (siren == null || siren == "") {
            console.log("Données manquantes");
            return res.redirect('/entreprise');
        }
        entrepriseModel.read(siren, function(result) {
        if(result.lenght == 0) {
            console.log("Entreprise inexistante, Il faut la créer");
            return res.redirect('/entreprise');
        }
        // TODO : Ajouter l'utilisateur à l'entreprise
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

module.exports = app;