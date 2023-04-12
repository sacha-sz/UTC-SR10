var express = require('express');
var router = express.Router();
var Offre_Emploie = require('../model/Offre_Emploie');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;

router.get('/offre_emploie', function(req, res, next) {
    // A voir
    result = Offre_Emploie.readall(function(result) {
        res.render('offre_emploi', {
            title: 'JobHub',
            offre: result,
        })
    });
});