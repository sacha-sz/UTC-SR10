var express = require('express');
var router = express.Router();
var userModel = require('../model/Utilisateur');
var app = express();
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;

router.get('/userslist', function(req, res, next) {
    result = userModel.readall(function(result) {
        res.render('userList', {
            title: 'List des utilisateurs',
            users: result
        })
    });
});

router.get('/inscription_email', function(req, res, next) {
    res.render('inscription_mail')
});

/* POST users */
router.post('/login', function(req, res, next) {
    console.log("Connexion d'un utilisateur");
    var email = req.body.email;
    var password = req.body.password;
    userModel.areValid_login(email, password, function(result) {
        if (result) {
            console.log("Utilisateur connecté");
        } else {
            res.redirect('/users/login');
        }
    });
});



//initialisation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/nvUser', function(req, res, next) {
    res.render('inscription_mail')
        /*récupérer les données passées via le body de la requête post :
        Exemple :
        const user_fname = req.body.fname;
        const user_lname = req.body.lname;
        */
        //utiliser le model pour enregistrer les données récupérées dans la BD
    result = userModel.create(req.body.email, req.body.password, function(result) {
            if (result) {
                console.log("Utilisateur créé");
                res.redirect('/users/login');
            } else {
                console.log("Utilisateur non créé");
            }
        }

    )
});