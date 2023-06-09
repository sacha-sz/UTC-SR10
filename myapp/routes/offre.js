var express = require('express');
// var session = require('express-session');
var router = express.Router();
var offreModel = require('../model/Offre');
var offreEmploiModel = require('../model/Offre_Emploie');
var userModel = require('../model/Utilisateur');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

router.get('/ajout_offre', function (req, res, next) {
    if (req.session.loggedin) {
        offreModel.readAllStatut(function (result) {
            console.log(result);
        res.render('ajout_offre', {
            title: 'Ajout d\'une offre',
            username: req.session.username,
            type_user: req.session.type_user,
            statuts: result
        });
    });
    } else {
        res.redirect('/login');
    }
});

router.get('/offre_recruteur', function (req, res, next) {
    if (req.session.loggedin) {
        offreEmploiModel.getoffrebyrecruteur(req.session.username, function (err, result) {
            console.log(result);
            if (result) {
                // Pagination
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
            if(err){
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

            // Pagination
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
                        lat : latitude,
                        long : longitude,
                        offres: paginatedData,
                        totalPages: totalPages
                    });
                }
                if (err) {
                    console.log(err);
                }
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des offres:', error);
            // Gérer l'erreur et renvoyer une réponse appropriée
            res.status(500).send('Une erreur s\'est produite lors de la récupération des offres');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/:id', function (req, res, next) {
    const offreId = req.params.id;
    console.log(offreId);
    offreEmploiModel.readOffersById(offreId, function (err, result) {
        if (result) {
            console.log(result);
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
    // Récupérer les détails de l'offre à partir de la base de données ou d'une autre source de données
});

router.get('/recherche', async function (req, res, next) {
    if (req.session.loggedin) {
        try {
            console.log("Recherche d'une offre");
            const searchQuery = req.query.search;
            const response = await fetch('http://localhost:3000/api/Offre_Emploie');
            const data = await response.json();
            console.log("data : ");
            console.log(data);
            // Fin de la recherche
            const filteredData = data.filter((offre) => {
                return offre.intitule.toLowerCase().includes(searchQuery.toLowerCase());
            });
            console.log("filteredData : ");
            console.log(filteredData);

            // Pagination
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
            // Gérer l'erreur et renvoyer une réponse appropriée
            res.status(500).send('Une erreur s\'est produite lors de la récupération des offres');
        }
    } else {
        res.redirect('/login');
    }
});



router.post('/ajout', function (req, res, next) {
    console.log('Ajout d\'une offre');
    var intitule = req.body.intitule;
    var description = req.body.description;
    var responsable = req.session.username;
    var lat = req.body.lat;
    var long = req.body.long;
    var rythme = req.body.rythme;
    var salaire = req.body.salaire;
    var missions = req.body.missions;
    var activites = req.body.activites;
    var competences = req.body.competences;
    var statut = req.body.statut;
    var type_metier = req.body.type_metier;
    console.log(intitule);
    console.log(description);
    console.log(responsable);
    console.log(lat);
    console.log(long);
    console.log(rythme);
    console.log(salaire);
    console.log(missions);
    console.log(activites);
    console.log(competences);
    console.log(statut);
    if (intitule == null || intitule == "" || description == null || description == "" || responsable == null || responsable == "" || lat == null || lat == "" || long == null || long == "" || rythme == null || rythme == "" || salaire == null || salaire == "" || missions == null || missions == "" || activites == null || activites == "" || competences == null || competences == "" || statut == null || statut == "" || type_metier == null || type_metier == "") {
        console.log("Elements manquants manquant");
        return res.redirect('/offre/ajout_offre');
    }
    if(statut == "Autre"){
        const newStatut = req.body.newNom;
        const newStatutDescription = req.body.newDescription;
        if(newStatut == null || newStatut == "" || newStatutDescription == null || newStatutDescription == ""){
            console.log("Elements manquants manquant");
            return res.redirect('/offre/ajout_offre');
        }
        offreModel.createStatut(newStatut, newStatutDescription, function (result) {
            if (result) {
                console.log("Statut créé");
            } else {
                res.redirect('/offre/ajout_offre');
            }
        }
        );    
        // A compléter 
    }
    offreModel.create(intitule, description, responsable, lat, long, rythme, salaire, missions, activites, competences, statut, type_metier, function (result) {
        if (result) {
            console.log("Offre créée");
            res.redirect('/');
        } else {
            res.redirect('/offre/ajout_offre');
        }
    });
});


module.exports = app;
module.exports = router;