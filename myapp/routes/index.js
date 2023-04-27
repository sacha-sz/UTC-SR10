var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});

/* GET A propos */
router.get('/a_propos', function(req, res, next) {
  res.render('a_propos', { title : 'A propos'})
});

module.exports = router;
