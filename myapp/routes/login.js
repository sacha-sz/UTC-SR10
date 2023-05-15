var express = require('express');
var router = express.Router();
var loginModel = require('../model/Login');
var app = express();
var path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/* GET Connexion page. */
app.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('index', { 
            title: 'Accueil',
            username: req.session.username
        });
    } else {
        res.render('connexion', { 
            title: 'Connexion',
            msg: req.session.msg
        })};
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
    }

    loginModel.areValid_login(email, password, function (result) {
        if (result) {
            console.log("Utilisateur connecté");
            req.session.loggedin = true;
            req.session.username = email;
            res.redirect('/');
        } else {
            console.log("Utilisateur non connecté");
            req.session.msg = "Utilisateur non connecté";
            res.redirect('/login');
        }
    });
});

module.exports = app;
