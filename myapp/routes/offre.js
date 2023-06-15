var express = require('express');
var router = express.Router();
var offreModel = require('../model/Offre');
var offreEmploiModel = require('../model/Offre_Emploie');
var userModel = require('../model/Utilisateur');
var app = express();
var path = require('path');
const { stat } = require('fs');

function checkRecruteur(req, res, next) {
    if (req.session.type_user == "RECRUTEUR") {
        next();
    } else {
        res.redirect('/');
    }
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

router.get('/ajout_offre', checkRecruteur, function (req, res, next) {
    if (req.session.loggedin) {
        offreModel.readAllStatut(function (result) {
            offreModel.readSIRENUser(req.session.username, function (siren) {
                offreModel.readAllTypeMetier(function (TM) {
                    res.render('ajout_offre', {
                        title: 'Ajout d\'une offre',
                        username: req.session.username,
                        type_user: req.session.type_user,
                        statuts: result,
                        sirens: siren,
                        type_metiers: TM
                    });
                });
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/offre_recruteur', checkRecruteur, function (req, res, next) {
    if (req.session.loggedin) {
        offreEmploiModel.getoffrebyrecruteur(req.session.username, function (err, result) {
            if (result) {
                const page = parseInt(req.query.page) || 1;
                const perPage = 5;
                const totalItems = result.length;
                const totalPages = Math.ceil(totalItems / perPage);
                const startIndex = (page - 1) * perPage;
                const endIndex = startIndex + perPage;
                const paginatedData = result.slice(startIndex, endIndex);
                res.render('offre_recruteur', {
                    title: 'Offre',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    offres: paginatedData,
                    totalPages: totalPages
                });
            }
            if (err) {
                res.render('offre_recruteur', {
                    title: 'Offre',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    offres: null,
                    totalPages: 0
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/', async function (req, res, next) {
    if (req.session.loggedin) {
        try {
            var response;
            if (req.query.search != undefined && req.query.sort != undefined) {
                if (req.query.lat != undefined && req.query.long != undefined && req.query.sort == "distance_nearest") {
                    response = await fetch('http://localhost:3000/api/Offre_Emploie?search=' + req.query.search + '&sort=' + req.query.sort + '&lat=' + req.query.lat + '&long=' + req.query.long);
                } else {
                    response = await fetch('http://localhost:3000/api/Offre_Emploie?search=' + req.query.search + '&sort=' + req.query.sort);
                }
            } else if (req.query.search != undefined) {
                response = await fetch('http://localhost:3000/api/Offre_Emploie?search=' + req.query.search);
            } else if (req.query.sort != undefined) {
                if (req.query.lat != undefined && req.query.long != undefined && req.query.sort == "distance_nearest") {
                    response = await fetch('http://localhost:3000/api/Offre_Emploie?sort=' + req.query.sort + '&lat=' + req.query.lat + '&long=' + req.query.long);
                } else {
                    response = await fetch('http://localhost:3000/api/Offre_Emploie?sort=' + req.query.sort);
                }
            } else {
                response = await fetch('http://localhost:3000/api/Offre_Emploie');
            }
            const data = await response.json();

            const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / perPage);
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = data.slice(startIndex, endIndex);
            userModel.getLatLong(req.session.username, function (err, result) {
                if (result) {
                    var latitude = result[0].adresse_utilisateur_lat;
                    var longitude = result[0].adresse_utilisateur_long;

                    res.render('offre_emploi', {
                        title: 'Offre',
                        username: req.session.username,
                        type_user: req.session.type_user,
                        lat: latitude,
                        long: longitude,
                        offres: paginatedData,
                        totalPages: totalPages
                    });
                }
                if (err) {
                }
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des offres:', error);
            res.status(500).send('Une erreur s\'est produite lors de la récupération des offres');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/:id', function (req, res, next) {
    const offreId = req.params.id;
    offreEmploiModel.readOffersById(offreId, function (err, result) {
        if (result) {
            res.render('offre', {
                title: 'Offre',
                username: req.session.username,
                type_user: req.session.type_user,
                offre: result[0]
            });
        } else {
            res.redirect('/offre');
        }
    });
});

router.get('/recherche', async function (req, res, next) {
    if (req.session.loggedin) {
        try {
            const searchQuery = req.query.search;
            const response = await fetch('http://localhost:3000/api/Offre_Emploie');
            const data = await response.json();
            const filteredData = data.filter((offre) => {
                return offre.intitule.toLowerCase().includes(searchQuery.toLowerCase());
            });

            const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const totalItems = filteredData.length;
            const totalPages = Math.ceil(totalItems / perPage);
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = filteredData.slice(startIndex, endIndex);


            res.render('offre_emploi', {
                title: 'Offre',
                username: req.session.username,
                type_user: req.session.type_user,
                offres: paginatedData,
                totalPages: totalPages
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des offres:', error);
            res.status(500).send('Une erreur s\'est produite lors de la récupération des offres');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/editer_offre/:id', checkRecruteur, function (req, res, next) {
    if (req.session.loggedin) {
        const offreId = req.params.id;
        offreEmploiModel.readOffersByIdSansVerif(offreId, function (err, result) {
            if (result) {
                offreModel.readAllStatut(function (statut) {
                    offreModel.readAllTypeMetier(function (TM) {
                        res.render('editer_offre', {
                            title: 'Offre',
                            username: req.session.username,
                            type_user: req.session.type_user,
                            offre: result[0],
                            statuts: statut,
                            type_metiers: TM,

                        });
                    });
                });
            } else {
                res.redirect('/offre');
            }
        });
    } else {
        res.redirect('/login');
    }
});






router.post('/ajout', checkRecruteur, function (req, res, next) {
    const intitule = req.body.intitule;
    const responsable = req.body.responsable;
    const lat = req.body.lat;
    const long = req.body.long;
    const rythme = req.body.rythme;
    var salaire_min = req.body.salaire_min;
    var salaire_max = req.body.salaire_max;
    const missions = req.body.missions;
    const activites = req.body.activites;
    const competences = req.body.competences;
    var statut = req.body.statut;
    var type_metier = req.body.type_metier;
    const siren = req.body.siren;
    const nb_pieces = req.body.nb_pieces;
    const etat = req.body.etat;
    const date_validite = req.body.date_validite;
    const indication_piece_jointes = req.body.indication_piece_jointes;
    if (intitule == null || intitule == "" ||
        responsable == null || responsable == "" || lat == null || lat == ""
        || long == null || long == "" || rythme == null || rythme == "" ||
        missions == null || missions == "" ||
        activites == null || activites == "" ||
        competences == null || competences == "" ||
        statut == null || statut == "" ||
        type_metier == null || type_metier == "" ||
        siren == null || siren == "" ||
        salaire_min == null || salaire_min == "" ||
        nb_pieces == null || nb_pieces == "" ||
        etat == null || etat == "" ||
        date_validite == null || date_validite == "" ||
        indication_piece_jointes == null || indication_piece_jointes == "" ||
        salaire_max == null || salaire_max == "") {
        return res.redirect('/offre/ajout_offre');
    }
    if (salaire_min > salaire_max) {
        var tmp = salaire_min;
        salaire_min = salaire_max;
        salaire_max = tmp;
    }
    if (statut == "Autre") {
        const newStatut = req.body.newNom;
        const newStatutDescription = req.body.newDescription;
        if (newStatut == null || newStatut == "" || newStatutDescription == null || newStatutDescription == "") {
            return res.redirect('/offre/ajout_offre');
        }
        offreModel.createStatut(newStatut, newStatutDescription, function (result) {
            if (result) {
            } else {
                res.redirect('/offre/ajout_offre');
            }
        }
        );
        statut = newStatut;
    }
    if (type_metier == "Autre") {
        const newTM = req.body.newNomTM;
        const newTMDescription = req.body.newDescriptionTM;
        if (newTM == null || newTM == "" || newTMDescription == null || newTMDescription == "") {
            return res.redirect('/offre/ajout_offre');
        }
        offreModel.createTM(newTM, newTMDescription, function (result) {
            if (result) {
            } else {
                res.redirect('/offre/ajout_offre');
            }
        }
        );
        type_metier = newTM;
    }
    offreModel.create(intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, type_metier, req.session.username, siren, missions, activites, competences, function (result) {
        if (result) {
        } else {
            res.redirect('/offre/ajout_offre');
        }
        var id_poste = result.insertId;
        offreEmploiModel.createOffreEmploi(nb_pieces, etat, date_validite, indication_piece_jointes, id_poste, function (result) {
            if (result) {
                res.redirect('/');
            } else {
                res.redirect('/offre/ajout_offre');
            }
        });
    });

});



router.post('/editer_offre/:id', checkRecruteur, function (req, res, next) {
    var intitule = req.body.intitule;
    var responsable = req.body.responsable;
    var lat = req.body.lat;
    var long = req.body.long;
    var rythme = req.body.rythme;
    var salaire_min = req.body.salaire_min;
    var salaire_max = req.body.salaire_max;
    var missions = req.body.missions;
    var activites = req.body.activites;
    var competences = req.body.competences;
    var date_validite = req.body.date_validite;
    var indication_piece_jointes = req.body.indication_piece_jointes;
    var type_metier = req.body.type_metier;
    var statut = req.body.statut;
    var id_offre = req.params.id;
    var Etat = req.body.etat;

    var URL = '/offre/editer_offre/' + id_offre;
    if ((intitule == null || intitule == "") && (responsable == null || responsable == "") && (lat == null || lat == "")
        && (long == null || long == "") && (rythme == null || rythme == "") && (salaire_min == null || salaire_min == "")
        && (salaire_max == null || salaire_max == "") && (missions == null || missions == "") && (activites == null || activites == "")
        && (competences == null || competences == "") && (date_validite == null || date_validite == "") && (indication_piece_jointes == null || indication_piece_jointes == "")
        && (type_metier == null || type_metier == "") && (statut == null || statut == "")
        && (Etat == null || Etat == "")) {
        return res.redirect(URL);
    }
    var promises = [];
    offreEmploiModel.readOffersByIdSansVerif(id_offre, function (err, offre) {
        if (offre.length == 0) {
            return res.redirect(URL);
        }
        var id_poste = offre[0].id_poste;

        if (intitule != null && intitule != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateIntitule(id_poste, intitule, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (Etat != null && Etat != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateEtat(id_offre, Etat, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (responsable != null && responsable != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateResponsable(id_poste, responsable, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (lat != null && lat != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateLatitude(id_poste, lat, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (long != null && long != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateLongitude(id_poste, long, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (rythme != null && rythme != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateRythme(id_poste, rythme, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (salaire_min != null && salaire_min != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateSalaireMin(id_poste, salaire_min, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (salaire_max != null && salaire_max != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateSalaireMax(id_poste, salaire_max, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (missions != null && missions != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateMission(id_poste, missions, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (activites != null && activites != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateActivite(id_poste, activites, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (competences != null && competences != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateCompetence(id_poste, competences, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (date_validite != null && date_validite != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateDate(id_offre, date_validite, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (indication_piece_jointes != null && indication_piece_jointes != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updatePJ(id_offre, indication_piece_jointes, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (type_metier != null && type_metier != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateTypeMetier(id_poste, type_metier, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        if (statut != null && statut != "") {
            promises.push(
                new Promise(function (resolve) {
                    offreModel.updateStatut(id_poste, statut, function (result) {
                        if (!result) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                })
            );
        }

        Promise.all(promises).then(function (values) {
            if (values.includes(false)) {
                res.redirect(URL);
            } else {
                res.redirect(URL);
            }
        });
    });
});

router.post('/delete/:id', checkRecruteur, function (req, res, next) {
    let confirmation = req.body.confirmation;

    confirmation = confirmation.toUpperCase();
    var id_offre = req.params.id;
    offreEmploiModel.readOffersByIdSansVerif(id_offre, function (err, offre) {
        if (offre.length == 0) {
            return res.redirect(URL);
        }
        var id_poste = offre[0].id_poste;
        var URL = '/offre/editer_offre/' + id_offre;
        if (confirmation == "CONFIRMER") {
            offreModel.deleteOffre(id_offre, id_poste, function (result) {
                if (result) {
                    res.redirect('/');
                } else {
                    res.redirect(URL);
                }
            });
        } else {
            res.redirect(URL);
        }
    });
});


module.exports = app;
module.exports = router;