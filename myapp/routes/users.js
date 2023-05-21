var express = require('express');
var userModel = require('../model/Utilisateur');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/// GET
/* GET users listing. */
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


/// POST

app.post('/inscription', function (req, res, next) {
    /*récupérer les données passées via le body de la requête post :
    Exemple :*/
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

    // Test que toutes les données soient correctement renseignées
    if (mail == null || password == null || password2 == null ||nom == null || prenom == null || tel == null || sexe == null || ddn == null || latitude == null || longitude == null ||
        mail == "" || password == "" || password2 == "" || nom == "" || prenom == "" || tel == "" || sexe == "" || ddn == "" || latitude == "" || longitude == "") {
        console.log("Données manquantes");
        req.session.msg = "Données manquantes";
        res.redirect('/users/inscription');
    } else {
        // Test que le mail soit valide
        userModel.TEST_MAIL(mail, function (result) {
            if (!result) {
                console.log("Mail au mauvais format");
                req.session.msg = "Mail au mauvais format";
                res.redirect('/users/inscription');
            } else {
                if(password != password2){
                    console.error("Les mots de passe ne correspondent pas");
                    res.redirect('/users/inscription');
                } else {
                // Test que le mot de passe soit valide
                userModel.TEST_MDP(password, function (result) {
                    if (!result) {
                        console.log("Mot de passe invalide");
                        res.redirect('/users/inscription');
                    } else {
                        // Test que le numéro de téléphone soit valide
                        userModel.TEST_TEL(tel, function (result) {
                            if (!result) {
                                console.log("Numéro de téléphone invalide");
                                res.redirect('/users/inscription');
                            } else {
                                // Test que la latitude et la longitude soient valides
                                userModel.TEST_COORDONNEES(latitude, longitude, function (result) {
                                    if (!result) {
                                        console.log("Coordonnées GPS invalides");
                                        res.redirect('/users/inscription');
                                    } else {

                                        // Test que la date de naissance soit valide
                                        userModel.TEST_DATE_NAISSANCE(ddn, function (result) {
                                            if (!result) {
                                                console.log("Date de naissance invalide");
                                                res.redirect('/users/inscription');
                                            } else {
                                                // utiliser le model pour enregistrer les données récupérées dans la BD
                                                result = userModel.create(mail, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (err, result) {
                                                    if (result == true) {
                                                        console.log("Utilisateur créé");
                                                        res.redirect('/');
                                                    } else {
                                                        console.log("Utilisateur non créé");
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

    // Vérifie si toutes les valeurs sont nulles ou vides
    if ((nom == null || nom == "") && (prenom == null || prenom == "") && (tel == null || tel == "") && (sexe == null || sexe == "")) {
        console.log("Aucune modification");
        return res.redirect('/users/change_profile');
    }

    var promises = [];

    if (tel != null && tel != "") {
        promises.push(
            new Promise(function (resolve) {
                userModel.TEST_TEL(tel, function (result) {
                    if (!result) {
                        console.log("Numéro de téléphone invalide");
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
                        console.log("Nom modifié");
                        resolve(true);
                    } else {
                        console.log("Nom non modifié");
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
                        console.log("Prénom modifié");
                        resolve(true);
                    } else {
                        console.log("Prénom non modifié");
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
                        console.log("Sexe modifié");
                        resolve(true);
                    } else {
                        console.log("Sexe non modifié");
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
            res.redirect('/');
        }
    });
});

app.post('/delete_user', function (req, res, next) {
    let confirmation = req.body.confirmation;
    confirmation = confirmation.toUpperCase();
    console.log(confirmation);
    console.log("dans delete_user POST");

    if (confirmation == "CONFIRMER") {
        console.log("Suppression de l'utilisateur");
        userModel.delete(req.session.username, function (err, result) {
            if (result) {
                console.log("Utilisateur supprimé");
                req.session.destroy();
                res.redirect('/');
            } else {
                console.log("Utilisateur non supprimé");
                res.redirect('/users/change_profile');
            }
        });
    } else {
        console.log("Utilisateur non supprimé");
        res.redirect('/users/change_profile');
    }
});



module.exports = app;