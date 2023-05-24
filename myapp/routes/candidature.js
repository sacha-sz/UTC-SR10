var express = require('express');
var candidatureModel = require('../model/Candidature');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/afficher_candidatures_user', function (req, res, next) {
    if (req.session.loggedin) {
        candidatureModel.readCandidatureByUser(req.session.username, function (err, result) {
            if (result) {
                res.render('ListeCandidatures', {
                    title: 'Candidatures',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    candidatures: result
                });
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des candidatures');
            }
        });
    } else {
        res.redirect('/login');
    }
});



module.exports = app;