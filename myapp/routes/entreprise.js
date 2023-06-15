var express = require('express');
var entrepriseModel = require('../model/Entreprise');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('entreprise_rejoindre', {
            title: 'Connexion',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/entreprise_recruteur', function (req, res, next) {
    if (req.session.loggedin) {
        entrepriseModel.entrepriseRecruteur(req.session.username, function (err, result) {
            if (result == null || err) {
                res.render('entreprise_details', {
                    title: 'Entreprises',
                    entreprises: null,
                    username: req.session.username,
                    type_user: req.session.type_user
                });
            } else {
                res.render('entreprise_details', {
                    title: 'Entreprises',
                    entreprises: result,
                    username: req.session.username,
                    type_user: req.session.type_user
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});



app.get('/inscription', function (req, res, next) {
    result = entrepriseModel.readTypeOrganisation(function (err, result) {
        if (req.session.loggedin) {
            if (result == null || err) {
                res.redirect('/entreprise');
            } else {
                res.render('entreprise_inscription', {
                    title: 'Inscription',
                    type_orga: result,
                    username: req.session.username,
                    type_user: req.session.type_user
                });
            }
        } else {
            res.redirect('/login');
        }
    });

});

app.get('/delete_entreprise', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('entreprise_delete', {
            title: 'Suppression',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/delete_entreprise', function (req, res, next) {
    var siren = req.body.SIREN;

    if (siren == null || siren == "") {
        res.redirect('/entreprise');
    } else {
        entrepriseModel.delete(siren, function (err, result) {
            if (result == false) {
                res.redirect('/entreprise');
            } else {
                res.redirect('/entreprise');
            }
        });
    }
});

app.get('/gestion', function (req, res, next) {
    if (req.session.loggedin) {
        entrepriseModel.getAsking(req.session.username, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.render('RecruteurRejoindre', {
                    title: 'Liste des demandes',
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

app.post('/accepte_adhesion', function (req, res, next) {
    entrepriseModel.formulaire_accept(req.body.siren, req.body.user, function (err) {
        if (err) {
            throw err;
        } else {
            res.redirect('/entreprise/gestion');
        }
    });
}),

    app.post('/inscription', function (req, res, next) {
        var name = req.body.name;
        var siren = req.body.SIREN;
        var lat = req.body.lat;
        var long = req.body.long;
        var type_organisation = req.body.type_organisation;

        if (name == null || siren == null || lat == null || long == null || type_organisation == null || name == "" || siren == "" || lat == "" || long == "" || type_organisation == "") {
            return res.redirect('/entreprise/inscription');
        } else {
            entrepriseModel.TEST_LATITUDE(lat, function (result) {
                if (result) {
                    entrepriseModel.TEST_LONGITUDE(long, function (result) {
                        if (result) {
                            entrepriseModel.isValidSIREN(siren, function (result) {
                                if (result) {
                                    if (type_organisation == "Autre") {
                                        var newType = req.body.newOrganisation;
                                        var newDescription = req.body.newDescription;

                                        if (newType == null || newDescription == null || newType == "" || newDescription == "") {
                                            return res.redirect('/entreprise/inscription');
                                        } else {
                                            type_organisation = newType;
                                            entrepriseModel.createTypeOrganisation(newType, newDescription, function (err, result) {
                                                if (result == true) {
                                                    console.log("Organisation créée");
                                                    entrepriseModel.create(siren, name, lat, long, type_organisation, function (err, result) {
                                                        if (result == true) {
                                                            res.redirect('/entreprise');
                                                        } else {
                                                            res.redirect('/entreprise/inscription');
                                                        }
                                                    });
                                                } else {
                                                    console.log("Erreur lors de la création du type d'organisation");
                                                    res.redirect('/entreprise/inscription');
                                                }
                                            });
                                        }
                                    } else {
                                        entrepriseModel.create(siren, name, lat, long, type_organisation, function (err, result) {
                                            if (result == true) {
                                                res.redirect('/entreprise');
                                            } else {
                                                res.redirect('/entreprise/inscription');
                                            }
                                        });
                                    }
                                } else {
                                    res.redirect('/entreprise/inscription');
                                }
                            });
                        } else {
                            res.redirect('/entreprise/inscription');
                        }
                    });
                } else {
                    res.redirect('/entreprise/inscription');
                }
            });
        }
    });

app.post('/rejoindre_entreprise', function (req, res, next) {
    var siren = req.body.SIREN;

    if (siren == null || siren == "") {
        res.redirect('/entreprise');
    } else {
        entrepriseModel.isValidSIREN(siren, function (result) {
            if (result) {
                entrepriseModel.read(siren, function (error, result) {
                    if (result.length == 0) {
                        res.redirect('/entreprise');
                    } else {
                        entrepriseModel.addUser(siren, req.session.username, function (error, result) {
                            if (result) {
                                res.redirect('/entreprise');
                            } else {
                                res.redirect('/entreprise');
                            }
                        });
                    }
                });
            } else {
                res.redirect('/entreprise');
            }
        });
    }
});

module.exports = app;