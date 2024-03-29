var express = require('express');
var router = express.Router();
var OffreModel = require('../model/Offre_Emploie');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;

router.get('/all_offers', function (req, res, next) {
    if (req.session.loggedin) {
        result = OffreModel.readAllOffers(function (result) {
            res.render('offre_emploi', {
                title: 'JobHub',
                offers: result,
                username: req.session.username,
            })
        });
    } else {
        res.redirect('/login');
    }
});


router.get('/offer', function (req, res, next) {
    if (req.session.loggedin) {
        result = OffreModel.read(function (result) {
            res.render('offre', {
                title: 'JobHub',
                offre: result,
                username: req.session.username,
                type_user: req.session.type_user
            })
        });
    } else {
        res.redirect('/login');
    }
});