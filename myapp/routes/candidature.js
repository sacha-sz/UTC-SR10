const express = require('express');
const candidatureModel = require('../model/Candidature');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const request = require('request');
const AdmZip = require('adm-zip');

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

const upload = multer({ storage: storage });

function checkRecruteur(req, res, next) {
    if (req.session.type_user == "RECRUTEUR") {
        next();
    } else {
        res.redirect('/');
    }
}

function checkCandidat(req, res, next) {
    if (req.session.type_user == "CANDIDAT") {
        next();
    } else {
        res.redirect('/');
    }
}

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
                // On split par rapport aux virgules
                var tab = result[0].indication_piece_jointes.split(',');

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


router.get('/liste_candidat/:id', checkRecruteur, function (req, res, next) {
    if (req.session.loggedin) {
        candidatureModel.getInfoCandidature(req.params.id, function (err, result) {
            if (result) {
                res.render('liste_candidat', {
                    title: 'Candidatures',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    id: req.params.id,
                    candidats: result
                });
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des candidatures');
            }
        });
    } else {
        res.redirect('/login');
    }
});


router.post('/validation_candidature/:id', checkCandidat, upload.fields([
    { name: 'myFileInputCV', maxCount: 1, type: 'CV' },
    { name: 'myFileInputLM', maxCount: 1, type: 'LM' },
    { name: 'myFileInputAutre', maxCount: 1, type: 'Autre' }
]), function (req, res, next) {
    req.session.uploaded_files = [];

    candidatureModel.CompteNombreCandidature(req.session.username, req.params.id, function (err, result) {
        console.log(result);
        if (result) {
            console.log(`Nombre de candidatures : ${result[0].nbCandidature}`);
            if (result[0].nbCandidature != 0) {
                return res.redirect('/');
            } else {
                if (!req.files) {
                    return res.redirect('/candidate/formulaire_candidatures');
                } else {
                    for (const file of Object.values(req.files)) {
                        if (file && file.length > 0) {
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
                    return res.redirect('/');
                }
            }
        }
    });
});


router.get('/mesdocuments', function (req, res, next) {
    if (req.session.loggedin) {
        candidatureModel.PieceJointeUser(req.session.username, function (err, result) {
            if (result) {
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
    try {
        res.download('./mesfichiers/' + req.query.fichier_cible);
    } catch (error) {
        res.send('Une erreur est survenue lors du téléchargement de ' + req.query.fichier_cible + ' : ' + error);
    }
});


router.get('/accepter/:id/:email/:id_offre', checkRecruteur, function (req, res, next) {
    var id_candidature = req.params.id;
    var email_candidat = req.params.email;
    var id_offre = req.params.id_offre;

    candidatureModel.accepterCandidature(id_candidature, email_candidat, function (err, result) {
        if (result) {
            candidatureModel.refuserAutresCandidatures(id_offre, email_candidat, function (err, result) {
                if (result) {
                    candidatureModel.expireeOffre(id_offre, function (err, result) {
                        if (result) {
                            console.log("Offre expirée");
                        } else {
                            console.log("Erreur lors de l'expiration de l'offre");
                        }
                    });
                } else {
                    console.log("Erreur lors du refus des autres candidatures");
                }
            });
            res.redirect('/offre/offre_recruteur');
            return;
        } else {
            res.redirect('/candidature/liste_candidat/' + id_offre);
            return;
        }
    });
});

router.get('/refuser/:id/:email/:id_offre', checkRecruteur, function (req, res, next) {
    var id_candidature = req.params.id;
    var email_candidat = req.params.email;
    var id_offre = req.params.id_offre;

    candidatureModel.refuserCandidature(id_candidature, email_candidat, function (err, result) {
        if (result) {
            res.redirect('/offre/offre_recruteur');
            return;
        } else {
            res.redirect('/candidature/liste_candidat/' + id_offre);
            return;
        }
    });
});


router.get('/telecharger/:id/:email', function (req, res, next) {
    candidatureModel.getAllPJ(req.params.id, req.params.email, function (err, result) {
        if (result) {
            var liste_name = [];
            for (var i = 0; i < result.length; i++) {
                liste_name.push(result[i].nom);
            }

            var zip = new AdmZip();

            var filesProcessed = 0;
            for (var i = 0; i < liste_name.length; i++) {
                zip.addLocalFile("./mesfichiers/" + liste_name[i]);
                filesProcessed++;
                if (filesProcessed === liste_name.length) {
                    var willSendthis = zip.toBuffer();
                    res.writeHead(200, {
                        'Content-Type': 'application/zip',
                        'Content-disposition': 'attachment; \
                        filename=candidature_' + req.params.id + '_candidat_' + req.params.email + '.zip',
                    });
                    res.end(willSendthis);
                }
            }
        } else {
            res.send('Une erreur est survenue lors de la récupération des documents');
        }
    });
});


router.get('/modifier/:id/', function (req, res, next) {
    var id_offre = req.params.id;
    var email_candidat = req.session.username;

    candidatureModel.getIdCandidature(id_offre, email_candidat, function (err, result) {
        if (result) {
            var id_candidature = result[0].id;

            candidatureModel.getAllPJ(id_candidature, email_candidat, function (err, result) {
                if (result) {
                    res.render('modifier_candidature', {
                        title: 'Modifier candidature',
                        username: req.session.username,
                        type_user: req.session.type_user,
                        id: id_candidature,
                        id_offre: id_offre,
                        documents: result
                    });
                } else {
                    res.status(500).send('Une erreur s\'est produite lors de la récupération des documents');
                }
            });
        } else {
            res.redirect('/candidature/afficher_candidatures_user');
            return;
        }
    });
});

router.post('/change-files/:id', upload.fields([
    { name: 'myFileInputCV', maxCount: 1 },
    { name: 'myFileInputLM', maxCount: 1 },
    { name: 'myFileInputAutre', maxCount: 1 }
]), function (req, res, next) {
    req.session.uploaded_files = [];

    if (!req.files) {
        res.redirect('/candidature/afficher_candidatures_user');
    } else {
        for (const file of Object.values(req.files)) {
            if (file && file.length > 0) {
                req.session.uploaded_files.push(file[0].filename);
            }
        }

        res.redirect('/candidature/afficher_candidatures_user');
    }
});
module.exports = router;