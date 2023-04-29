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
    if (!TEST_MAIL(mail)) {
        console.log("Mail invalide");
        return res.redirect('/users/inscription');
    }

    // Test que le mot de passe soit valide
    if (!TEST_MDP(password)) {
        console.log("Mot de passe invalide");
        return res.redirect('/users/inscription');
    }

    // Test que le numéro de téléphone soit valide
    if (!TEST_TEL(tel)) {
        console.log("Numéro de téléphone invalide");
        return res.redirect('/users/inscription');
    }

    // Test que la latitude et la longitude soient valides
    if (!TEST_LATITUDE(latitude) || !TEST_LONGITUDE(longitude)) {
        console.log("Coordonnées GPS invalides");
        return res.redirect('/users/inscription');
    }

    // Test que la date de naissance soit valide
    if (!TEST_DATE_NAISSANCE(ddn)) {
        console.log("Date de naissance invalide");
        return res.redirect('/users/inscription');
    }


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




/// Liste des fonctions utilisées dans le code ci-dessus

// Test que le mail soit valide
function TEST_MAIL(email_a_tester) {
    // Vérification de l'adresse e-mail 
    // Format :
    //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
    //  - @
    //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
    //  - .
    //  - 2 ou 3 caractères alphanumériques

    var correct_email_test = /^([a-zA-Z0-9_\.\-+]+)@([a-zA-Z0-9_\.\-+]+)\.([a-zA-Z]{2,3})$/;
    return correct_email_test.test(email_a_tester);
}

// Test que le mot de passe soit valide
function TEST_MDP(mdp1) {
    // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
    var correct_password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
    return correct_password_test.test(mdp1);
}

// Test que le numéro de téléphone soit valide
function TEST_TEL(num_tel) {
    // Vérification du numéro de téléphone 
    // Format : 
    // - Commence par un + (optionnel) suivi de 1 à 3 chiffres (indicatif pays)
    // - 0 ou 1 espace (optionnel)
    // - 9 chiffres
    var correct_tel_test = /^(\+\d{1,3})? ?\d{9}$/;
    return correct_tel_test.test(num_tel);
}

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

// Test que la date de naissance soit valide
function TEST_DATE_NAISSANCE(date_naissance) {
    // Vérification de la date de naissance 
    // Format : 
    // - AAAA-MM-JJ où AAAA est l'année (4 chiffres), MM est le mois (de 01 à 12) et JJ est le jour (de 01 à 31)
    var correct_date_test = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/;

    // Vérification de la date passée et d'au plus de 1900 ans
    var current_year = new Date().getFullYear();
    var date_naissance_year = parseInt(date_naissance.substring(0, 4));
    if (date_naissance_year >= current_year - 1900) {
        return false; // La date de naissance est supérieure à 1900 ans.
    }

    var date_naissance_match = date_naissance.match(correct_date_test);
    if (date_naissance_match == null) {
        return false; // Le format de la date est incorrect.
    }

    var date_naissance_object = new Date(date_naissance_match[0]);
    if (date_naissance_object >= new Date()) {
        return false; // La date de naissance est dans le futur.
    }

    return true;
}