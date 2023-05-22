var express = require('express');
var userModel = require('../model/Utilisateur');
var adminModel = require('../model/Admin');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));


app.get('/gestion_utilisateur', function (req, res, next) {
    if (req.session.loggedin) {
        userModel.readall(function (err, result) {
            if (err) {
                // Gérer l'erreur si nécessaire
                console.log(err);
                res.status(500).send("Une erreur s'est produite");
            } else {
                res.render('AdminGestionUsers', {
                    title: 'Ajout d\'une offre',
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

app.post('/passer_admin', function (req, res, next) {
    adminModel.updateTypeUtilisateur(req.body.email, "ADMINISTRATEUR", function (err, result) {
        if (err) {
            // Gérer l'erreur si nécessaire
            console.log(err);
            throw err;
        } else {
            res.redirect('/admin/gestion_utilisateur');
        }
    });
});

app.post('/passer_recruteur', function (req, res, next) {
    // TODO : passer le type de l'utilisateur à "RECRUTEUR"
    // Demander le siren de l'entreprise
    // Peut être faire une branchement vers entreprise ?
});

module.exports = app;