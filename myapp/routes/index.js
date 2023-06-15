var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	if (req.session.loggedin) {
		res.render('index', {
			title: 'Accueil',
			username: req.session.username,
			type_user: req.session.type_user
		});
	} else {
		res.render('index', {
			title: 'Accueil'
		})
	}
});

router.get('/home', function (req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get('/a_propos', function (req, res, next) {
	if (req.session.loggedin) {
		res.render('a_propos', {
			title: 'A propos',
			username: req.session.username,
			type_user: req.session.type_user
		});
	} else {
		res.render('a_propos', {
			title: 'A propos'
		})
	}
});

module.exports = router;
