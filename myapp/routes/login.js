var express = require('express');
var router = express.Router();
var loginModel = require('../model/Login');
var app = express();
var path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

/* GET Connexion page. */
app.get('/', function (req, res, next) {
    res.render('connexion', { title: 'Connexion' });
});

/* GET home page */
app.get('/home', function (req, res) {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
        res.render('logged_index', { 
            title: 'Accueil',
            username: req.session.username });
	} else {
		// Not logged in
        // TODO : page d'erreur
		res.send('Tu n\'es pas connecté !');
	}
	res.end();
});

/* GET Logout */
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


/* POST users Connexion */
app.post('/auth', function (req, res, next) {
    console.log("Connexion d'un utilisateur");
    var email = req.body.email;
    var password = req.body.password;

    // Test que toutes les données soient correctement renseignées
    if (email == null || password == null || email == "" || password == "") {
        console.log("Données manquantes");
        return res.redirect('/login');
    }

    loginModel.areValid_login(email, password, function (result) {
        if (result) {
            console.log("Utilisateur connecté");
            req.session.loggedin = true;
            req.session.username = email;
            res.redirect('/login/home'); // TODO : ajout message de confirmation et redirection vers la page d'accueil
        } else {
            res.redirect('/login'); // TODO : ajout message d'erreur et redirection vers la page de connexion
        }
    });
});

module.exports = app;
