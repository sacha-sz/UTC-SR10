var express = require('express');
var router = express.Router();
var userModel = require('../model/Utilisateur');
var app = express();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;

router.get('/userslist', function (req, res, next) {
    result = userModel.readall(function (result) {
        res.render('userList', {
            title: 'Liste des utilisateurs',
            users: result
        })
    });
});

router.get('/inscription', function (req, res, next) {
    var ladate = new Date();
    var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();

    res.render('inscription', {
        title: "Inscription",
        date: date_creation
    })
});

//initialisation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/inscription', function (req, res, next) {
    // res.render('inscription_mail')
    /*récupérer les données passées via le body de la requête post :
    Exemple :*/
    const mail = req.body.email;
    const password = req.body.password;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.tel;
    const sexe = req.body.sexe;
    const ddn = req.body.ddn;
    const latitude = req.body.lat;
    const longitude = req.body.long;

    // Test que toutes les données soient correctement renseignées
    if (mail == null || password == null || nom == null || prenom == null || tel == null || sexe == null || ddn == null || latitude == null || longitude == null ||
        mail == "" || password == "" || nom == "" || prenom == "" || tel == "" || sexe == "" || ddn == "" || latitude == "" || longitude == "") {
        console.log("Données manquantes");
        return res.redirect('/users/inscription');
    }

    // Test que le mail soit valide
    userModel.TEST_MAIL(email, function (result) {
        if (!result) {
            console.log("Mail au mauvais format");
            return res.redirect('/users/inscription');
        }
    });

    // Test que le mot de passe soit valide
    userModel.TEST_MDP(password, function (result) {
        if (!result) {
            console.log("Mot de passe invalide");
            return res.redirect('/users/inscription');
        }
    });


    // Test que le numéro de téléphone soit valide
    userModel.TEST_TEL(tel, function (result) {
        if (!result) {
            console.log("Numéro de téléphone invalide");
            return res.redirect('/users/inscription');
        }
    });

    // Test que la latitude et la longitude soient valides
    userModel.TEST_COORDONNEES(latitude, longitude, function (result) {
        if (!result) {
            console.log("Coordonnées GPS invalides");
            return res.redirect('/users/inscription');
        }
    });


    // Test que la date de naissance soit valide
    userModel.TEST_DATE_NAISSANCE(ddn, function (result) {
        if (!result) {
            console.log("Date de naissance invalide");
            return res.redirect('/users/inscription');
        }
    });
    

    // utiliser le model pour enregistrer les données récupérées dans la BD
    result = userModel.create(mail, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (result) {
        if (result) {
            console.log("Utilisateur créé");
            res.redirect('/users/login');
        } else {
            console.log("Utilisateur non créé");
        }
    }
    )
});
