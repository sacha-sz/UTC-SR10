var express = require('express');
var userModel = require('../model/Utilisateur');
var adminModel = require('../model/Admin');
var entrepriseModel = require('../model/Entreprise');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

function checkAdmin(req, res, next) {
    if (req.session.type_user == "ADMINISTRATEUR") {
        next();
    } else {
        res.redirect('/');
    }
}


app.get('/gestion_utilisateur', checkAdmin, function (req, res, next) {
    if (req.session.loggedin) {
        userModel.readall(function (err, result) {
            if (err) {
                throw err;
            } else {
                res.render('AdminGestionUsers', {
                    title: 'Liste des utilisateurs',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    users: result
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/gestion_entreprise', checkAdmin, function (req, res, next) {
    if (req.session.loggedin) {
        entrepriseModel.readall(function (err, result) {
            if (err) {
                throw err;
            } else {
                res.render('AdminGestionEntreprise', {
                    title: 'Liste des Entreprises',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    entreprises: result
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/gestion_new_entreprise', checkAdmin, function (req, res, next) {
    if (req.session.loggedin) {
        adminModel.getAllOrganisationCreation(function (err, result) {
            res.render('AdminCreationEntreprise', {
                title: 'Liste des Entreprises',
                username: req.session.username,
                type_user: req.session.type_user,
                entreprises: result
            });
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/passer_admin', checkAdmin, function (req, res, next) {
    adminModel.updateTypeUtilisateur(req.body.email, "ADMINISTRATEUR", function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/admin/gestion_utilisateur');
        }
    });
});


app.post('/delete_entreprise', checkAdmin, function (req, res, next) {
    entrepriseModel.delete(req.body.siren, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/admin/gestion_entreprise');
        }
    });
});

app.post('/accept_entreprise', checkAdmin, function (req, res, next) {
    entrepriseModel.formulaire_accept(req.body.siren, req.body.user, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/admin/gestion_new_entreprise');
        }
    });
});


module.exports = app;