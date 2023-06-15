var express = require('express');
var router = express.Router();
var userModel = require('../model/Utilisateur');
var offerModel = require('../model/Offre_Emploie');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));


router.get('/users', function (req, res, next) {
    result = userModel.readall(function (err, result) {
        res.status(200).send(result);
    });
});


router.get('/Offre_Emploie', function (req, res, next) {

    if (req.query.sort != undefined && req.query.search != undefined) {
        if (req.query.sort == "date_decroissante") {
            result = offerModel.readAllValidOffers_desc_search(req.query.search, function (err, result) {
                res.status(200).send(result);
            });
        } else if (req.query.sort == "distance_nearest") {
            result = offerModel.readAllValidOffers_dist_search(req.query.lat, req.query.long, req.query.search, function (err, result) {
                res.status(200).send(result);
            });
        } else {
            result = offerModel.readAllValidOffers_search(req.query.search, function (err, result) {
                res.status(200).send(result);
            });
        }
    } else if (req.query.sort != undefined) {
        if (req.query.sort == "date_decroissante") {
            result = offerModel.readAllValidOffers_desc(function (err, result) {
                res.status(200).send(result);
            });
        } else if (req.query.sort == "distance_nearest") {
            result = offerModel.readAllValidOffers_dist(req.query.lat, req.query.long, function (err, result) {
                res.status(200).send(result);
            });
        } else {
            result = offerModel.readAllValidOffers(function (err, result) {
                res.status(200).send(result);
            });
        }
    } else if (req.query.search != undefined) {
        result = offerModel.readAllValidOffers_search(req.query.search, function (err, result) {
            res.status(200).send(result);
        });
    } else {
        result = offerModel.readAllValidOffers(function (err, result) {
            res.status(200).send(result);
        });
    }
});

module.exports = router;