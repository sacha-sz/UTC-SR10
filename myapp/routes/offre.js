var express = require('express');
// var session = require('express-session');
var router = express.Router();
var entrepriseModel = require('../model/Offre');
var app = express();
var path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

router.get('/', function(req, res, next) {
    res.render('ajout_offre', { title: 'Ajout d\'une offre' });
});

router.get('/ajout_offre', function(req, res, next) {
    console.log('Ajout d\'une offre');
    var intitule = req.body.intitule;
});


module.exports = app;
module.exports = router;