const express = require('express');
const candidatureModel = require('../model/Candidature');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'mesfichiers');
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = req.body.myUsername + '-' + req.body.myFileType + extension;
        cb(null, filename);
    }
});

// Create the multer upload object
const upload = multer({ storage: storage });

router.get('/afficher_candidatures_user', function (req, res, next) {
    if (req.session.loggedin) {
        candidatureModel.readCandidatureByUser(req.session.username, function (err, result) {
            if (result) {
                res.render('ListeCandidatures', {
                    title: 'Candidatures',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    candidatures: result
                });
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des candidatures');
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/formulaire_candidatures', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('formulaire_candidature', {
            title: 'Candidatures',
            username: req.session.username,
            type_user: req.session.type_user
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/formulaire_candidatures', upload.single('myFileInput'), function (req, res, next) {
    if (!req.file) {
        res.render('formulaire_candidature', {
            title: 'Candidatures',
            username: req.session.username,
            type_user: req.session.type_user,
            files_array: req.session.uploaded_files,
            upload_error: 'Merci de sélectionner le fichier à charger !'
        });
    } else {
        console.log(req.file.originalname, ' => ', req.file.filename);
        req.session.uploaded_files.push(req.file.filename);
        res.render('formulaire_candidature', {
            title: 'Candidatures',
            username: req.session.username,
            type_user: req.session.type_user,
            files_array: req.session.uploaded_files,
            uploaded_filename: req.file.filename,
            uploaded_original: req.file.originalname
        });
    }
});

router.get('/mesdocuments', function (req, res, next) {
    console.log("mes documents");  
    if (req.session.loggedin) {
        candidatureModel.PieceJointeUser(req.session.username, function (err, result) {
            console.log(result);
            if (result) {
                console.log(result);
                res.render('mesdocuments', {
                    title: 'Mes documents',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    documents: result
                });
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des documents');
            }
        });
    } else {
        res.redirect('/login');
    }
});


router.get('/getfile', function (req, res, next) {
    console.log("getfile");
    console.log(req.query.fichier_cible);
    try {
        res.download('./mesfichiers/' + req.query.fichier_cible);
    } catch (error) {
        res.send('Une erreur est survenue lors du téléchargement de ' + req.query.fichier_cible + ' : ' + error);
    }
});

module.exports = router;