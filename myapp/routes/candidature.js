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
        if (!req.session.username) {
            cb(new Error('Vous devez être connecté pour déposer un fichier'));
            return;
        }
        const extension = path.extname(file.originalname);
        
        
        const type = file.fieldname.replace('myFileInput', '');
        const allowed_extensions = ['CV', 'LM', 'Autre'];
        if (!allowed_extensions.includes(type)) {
            cb(new Error('Type de fichier non autorisé'));
            return;
        }
        
        const filename = req.session.username + '-' + type + "-" + req.params.id + extension;
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

router.get('/formulaire_candidatures/:id', function (req, res, next) {
    if (req.session.loggedin) {
        candidatureModel.NeedPJOffre(req.params.id, function (err, result) {
            if (result) {
                console.log(result);
                // On split par rapport aux virgules
                var tab = result[0].indication_piece_jointes.split(',');
                console.log(tab);

                // On regarde pour les valeurs Autre, LM, CV si elles sont présentes
                var autre = false;
                var lm = false;
                var cv = false;

                for (var i = 0; i < tab.length; i++) {
                    tab[i] = tab[i].trim();
                    if (tab[i] == "Autre") {
                        autre = true;
                    } else if (tab[i] == "LM") {
                        lm = true;
                    } else if (tab[i] == "CV") {
                        cv = true;
                    }
                }

                res.render('formulaire_candidature', {
                    title: 'Candidatures',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    id: req.params.id,
                    autre: autre,
                    lm: lm,
                    cv: cv
                });
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des candidatures');
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/validation_candidature/:id', upload.fields([
    { name: 'myFileInputCV', maxCount: 1, type: 'CV' },
    { name: 'myFileInputLM', maxCount: 1, type: 'LM' },
    { name: 'myFileInputAutre', maxCount: 1, type: 'Autre' }
]), function (req, res, next) {
    req.session.uploaded_files = [];

    if (!req.files) {
        res.redirect('/candidate/formulaire_candidatures');
    } else {
        for (const file of Object.values(req.files)) {
            if (file && file.length > 0) {
                console.log(file[0].originalname, ' => ', file[0].filename);
                req.session.uploaded_files.push(file[0].filename);
            }
        }
        
        candidatureModel.candidater(req.session.username, req.params.id, function (err, result) {
            if (result) {
                for (var i = 0; i < req.session.uploaded_files.length; i++) {
                    var nom_fichier = req.session.uploaded_files[i];
                    var type_fichier = nom_fichier.split('-')[1];
                    type_fichier = type_fichier.split('.')[0];
                    var lien = "./mesfichiers/" + nom_fichier;
                    var id_candidature = result.insertId;

                    candidatureModel.uploadPJ(nom_fichier, type_fichier, lien, id_candidature, function (err, result) {
                        if (result) {
                            console.log("Upload PJ : " + nom_fichier + " réussi");
                        } else {
                            console.log("Upload PJ : " + nom_fichier + " échoué");
                        }
                    });
                }
            }
        });
        res.redirect('/');
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