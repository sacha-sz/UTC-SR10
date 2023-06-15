var express = require('express');
var userModel = require('../model/Utilisateur');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res, next) {
    res.send('respond with a resource');
});



app.get('/userslist', function (req, res, next) {
    result = userModel.readall(function (err, result) {
        if (err) throw err;
        res.render('userList', {
            title: 'Liste des utilisateurs',
            users: result
        })
    });
});

app.get('/inscription', function (req, res, next) {
    var ladate = new Date();
    var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();

    res.render('inscription', {
        title: "Inscription",
        date: date_creation,
    })
});



app.get('/change_profile', function (req, res, next) {
    if (req.session.loggedin) {
        result = userModel.getNomPrenomTelSexe(req.session.username, function (err, result) {
            var son_nom = result[0].nom;
            var son_prenom = result[0].prenom;
            var son_tel = result[0].telephone;
            var son_sexe = result[0].sexe;

            res.render('modif_profil', {
                title: "CP",
                username: req.session.username,
                type_user: req.session.type_user,
                nom: son_nom,
                prenom: son_prenom,
                tel: son_tel,
                sexe: son_sexe,
                message: "Après modifications, enregistrez en cliquant sur Appliquer"
            })
        })
    } else {
        res.redirect('/login');
    }
});



app.post('/inscription', function (req, res, next) {
    const mail = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.tel;
    const sexe = req.body.sexe;
    const ddn = req.body.ddn;
    const latitude = req.body.lat;
    const longitude = req.body.long;

    if (mail == null || password == null || password2 == null || nom == null || prenom == null || tel == null || sexe == null || ddn == null || latitude == null || longitude == null ||
        mail == "" || password == "" || password2 == "" || nom == "" || prenom == "" || tel == "" || sexe == "" || ddn == "" || latitude == "" || longitude == "") {
        req.session.msg = "Données manquantes";
        res.redirect('/users/inscription');
    } else {
        userModel.TEST_MAIL(mail, function (result) {
            if (!result) {
                req.session.msg = "Mail au mauvais format";
                res.redirect('/users/inscription');
            } else {
                if (password != password2) {
                    console.error("Les mots de passe ne correspondent pas");
                    res.redirect('/users/inscription');
                } else {
                    userModel.TEST_MDP(password, function (result) {
                        if (!result) {
                            res.redirect('/users/inscription');
                        } else {
                            userModel.TEST_TEL(tel, function (result) {
                                if (!result) {
                                    res.redirect('/users/inscription');
                                } else {
                                    userModel.TEST_COORDONNEES(latitude, longitude, function (result) {
                                        if (!result) {
                                            res.redirect('/users/inscription');
                                        } else {

                                            userModel.TEST_DATE_NAISSANCE(ddn, function (result) {
                                                if (!result) {
                                                    res.redirect('/users/inscription');
                                                } else {
                                                    result = userModel.create(mail, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (err, result) {
                                                        if (result == true) {
                                                            res.redirect('/');
                                                        } else {
                                                            res.redirect('/users/inscription');
                                                        }
                                                    }
                                                    )
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }

                    });
                }
            }
        });
    }
});

app.post('/changed_infos', function (req, res, next) {
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var tel = req.body.tel;
    var sexe = req.body.sexe;

    if ((nom == null || nom == "") && (prenom == null || prenom == "") && (tel == null || tel == "") && (sexe == null || sexe == "")) {
        return res.redirect('/users/change_profile');
    }

    var promises = [];

    if (tel != null && tel != "") {
        promises.push(
            new Promise(function (resolve) {
                userModel.TEST_TEL(tel, function (result) {
                    if (!result) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            })
        );
    }

    if (nom != null && nom != "") {
        promises.push(
            new Promise(function (resolve) {
                userModel.updateNom(req.session.username, nom, function (err, result) {
                    if (result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            })
        );
    }

    if (prenom != null && prenom != "") {
        promises.push(
            new Promise(function (resolve) {
                userModel.updatePrenom(req.session.username, prenom, function (err, result) {
                    if (result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            })
        );
    }

    if (sexe != null && sexe != "") {
        promises.push(
            new Promise(function (resolve) {
                userModel.updateSexe(req.session.username, sexe, function (err, result) {
                    if (result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            })
        );
    }

    Promise.all(promises).then(function (values) {
        if (values.includes(false)) {
            res.redirect('/users/change_profile');
        } else {
            res.redirect('/users/change_profile');
        }
    });
});

app.post('/delete_user', function (req, res, next) {
    let confirmation = req.body.confirmation;
    confirmation = confirmation.toUpperCase();

    if (confirmation == "CONFIRMER") {
        userModel.delete(req.session.username, function (err, result) {
            if (result) {
                req.session.destroy();
                res.redirect('/');
            } else {
                res.redirect('/users/change_profile');
            }
        });
    } else {
        res.redirect('/users/change_profile');
    }
});


app.get('/my_profile', function (req, res, next) {
    if (req.session.loggedin) {
        userModel.getInfos(req.session.username, function (err, result) {
            if (result != null) {
                res.render('show_profile', {
                    title: 'Mon profil',
                    username: req.session.username,
                    nom: result[0].nom,
                    prenom: result[0].prenom,
                    tel: result[0].telephone,
                    sexe: result[0].sexe,
                    ddn: result[0].date_naissance,
                    lat: result[0].adresse_utilisateur_lat,
                    long: result[0].adresse_utilisateur_long,
                    type_user: req.session.type_user
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
});


module.exports = app;