var express = require('express');
// var session = require('express-session');
var router = express.Router();
var offreModel = require('../model/Offre');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

router.get('/ajout_offre', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('ajout_offre', {
            title: 'Ajout d\'une offre',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/', async function (req, res, next) {
    if (req.session.loggedin) {
        try {
            const response = await fetch('http://localhost:3000/api/Offre_Emploie');
            const data = await response.json();

            // Pagination
            const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / perPage);
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = data.slice(startIndex, endIndex);

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
    var responsable = req.body.responsable;
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
    offreModel.create(intitule, description, responsable, lat, long, rythme, salaire, missions, activites, competences, statut, type_metier, function (result) {
        if (result) {
            console.log("Offre créée");
            res.redirect('/');
        } else {
            res.redirect('/offre/ajout_offre');
        }

    });
});



// Exemple de pagination

// // get paginated results
// app.get("/users/paginate", paginatedResults(users), (req, res) => {
//     res.json(res.paginatedResults);
// });

// function paginatedResults(model) {
//     // middleware function
//     return (req, res, next) => {
//         const page = parseInt(req.query.page);
//         const limit = parseInt(req.query.limit);

//         // calculating the starting and ending index
//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;

//         const results = {};
//         if (endIndex < model.length) {
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             };
//         }

//         if (startIndex > 0) {
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             };
//         }

//         results.results = model.slice(startIndex, endIndex);

//         res.paginatedResults = results;
//         next();
//     };
// }

// const port = 3006;
// const url = "http://localhost:" + port;
// app.listen(port, () => {
//     console.log("Service endpoint= %s", url);
// });


module.exports = app;
module.exports = router;