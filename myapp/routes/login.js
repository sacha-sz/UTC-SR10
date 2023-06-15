var express = require('express');
var router = express.Router();
var loginModel = require('../model/Login');
var app = express();
var path = require('path');
const { promises } = require('dns');
const { fail } = require('assert');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('index', {
            title: 'Accueil',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        if (req.session.tempsRestant === undefined) {
            res.render('connexion', {
                title: 'Connexion',
                msg: req.session.msg
            });
        } else {
            res.render('connexion', {
                title: 'Connexion',
                msg: `Trop de tentatives de connexion. Veuillez réessayer dans ${req.session.tempsRestant} minute(s).`
            });
        }
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.post('/auth', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || email == "") {
        req.session.msg = "Email Invalide";
        return res.redirect('/login');
    } else if (password == null || password == "") {
        req.session.msg = "Mot de passe Invalide";
        return res.redirect('/login');
    }
    if (req.session.failedAttempts > 2) {
        if (req.session.connexion_possible !== undefined && req.session.connexion_possible > new Date().getTime()) {
            req.session.tempsRestant = req.session.failedAttempts;
            return res.redirect('/login');
        }
    }

    loginModel.areValid_login(email, password, function (result, type) {
        if (result == true && type != null) {
            req.session.loggedin = true;
            req.session.username = email;
            req.session.failedAttempts = 0;
            req.session.connexion_possible = undefined;
            req.session.type_user = type;
            return res.redirect('/');
        } else {
            if (req.session.failedAttempts === undefined) {
                req.session.failedAttempts = 0;
            }
            req.session.failedAttempts++;
            req.session.lastAttemptTime = new Date().getTime();
            if (req.session.connexion_possible === undefined) {
                req.session.connexion_possible = req.session.lastAttemptTime;
            }
            req.session.connexion_possible = req.session.lastAttemptTime + (req.session.failedAttempts * 1000 * 60);
            if (req.session.failedAttempts > 2) {
                req.session.tempsRestant = req.session.failedAttempts;
            }
            return res.redirect('/login');
        }
    });
});


module.exports = app;
