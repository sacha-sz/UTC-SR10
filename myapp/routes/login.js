var express = require('express');
var router = express.Router();
var loginModel = require('../model/Login');
var app = express();
var path = require('path');
const { promises } = require('dns');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/* GET Connexion page. */
app.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('index', {
            title: 'Accueil',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        res.render('connexion', {
            title: 'Connexion',
            msg: req.session.msg
        });
    }
});

/* GET Logout */
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

/* POST users Connexion */
app.post('/auth', function (req, res, next) {
    console.log("Connexion d'un utilisateur");
    var email = req.body.email;
    var password = req.body.password;

    // Test que toutes les données soient correctement renseignées
    if (email == null || password == null || email == "" || password == "") {
        console.log("Données manquantes");
        req.session.msg = "Données manquantes";
        res.redirect('/login');
    } else {
        if (req.session.failedAttempts > 3) {
            console.log("Trop de tentatives de connexion");
            var currentTime = new Date().getTime();
            var lastAttemptTime = req.session.lastAttemptTime || currentTime;
            var timeDiff = currentTime - lastAttemptTime;
            var minutesElapsed = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            if (minutesElapsed < 1) {
                // Attendez une minute avant de permettre à l'utilisateur de réessayer
                var remainingTime = 1 - minutesElapsed;
                res.render('connexion', {
                    title: 'Connexion',
                    msg: `Trop de tentatives de connexion. Veuillez réessayer dans ${remainingTime} minute(s).`
                });
                return;
            } else {
                // Réinitialisez le compteur de tentatives échouées
                req.session.failedAttempts = 0;
                req.session.lastAttemptTime = currentTime + (1000 * 60); // Ajoute une minute à l'heure actuelle
            }
        }

        loginModel.areValid_login(email, password, function (result, type) {
            if (result == true && type != null) {
                console.log("Utilisateur connecté");
                req.session.loggedin = true;
                req.session.username = email;
                req.session.type_user = type;
                // req.session.failedAttempts = 0; // Réinitialisez le compteur de tentatives échouées
                res.redirect('/');
            } else {
                console.log("Utilisateur non connecté");
                if(req.session.failedAttempts === undefined){
                    req.session.failedAttempts = 1;
                } else {
                    req.session.failedAttempts++;
                }
                console.log(req.session.failedAttempts);
                req.session.lastAttemptTime = new Date().getTime();
                if (req.session.failedAttempts >= 3) {
                    req.session.msg = "Trop de tentatives de connexion";
                } else {
                    req.session.msg = "Utilisateur non connecté";
                }
                res.redirect('/login');
            }
        });
    }
});

module.exports = app;
