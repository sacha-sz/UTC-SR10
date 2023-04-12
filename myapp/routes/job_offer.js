var express = require('express');
var router = express.Router();
var OffreModel = require('../model/Offre_Emploie');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;

router.get('/offre_emploi', function(req, res, next) {
    result = OffreModel.readall(function(result) {
        res.render('offre_emploi', {
            title: 'JobHub',
            offre: result,
        })
    });
});