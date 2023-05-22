var express = require('express');
var router = express.Router();

// on va utliser Multer comme middleware de gestion d'upload de fichier (faire au préalable : npm install multer)
var multer = require('multer');  

// définition du répertoire de stockage des fichiers chargés (dans le répertoire du projet pour la démo, mais sur un espace dédié en prod !)
// et du nom sous lequel entregistrer le fichier
var my_storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'mesfichiers')},
  filename: function (req, file, cb) {
    let my_extension = file.originalname.slice(file.originalname.lastIndexOf(".")); // on extrait l'extension du nom d'origine du fichier
    cb(null, req.body.myUsername + '-' + req.body.myFileType+my_extension); // exemple de format de nommage : login-typedoc.ext
  }
})

var upload = multer({ storage: my_storage }) 

/* GET */
router.get('/', function(req, res, next) {
  if (req.session.connected_user == undefined) {
    console.log('Init connected user');
    req.session.connected_user = {prenom : 'Mohamed', login : 'makheraz'};
  }
  if (req.session.uploaded_files == undefined) {
    console.log('Init uploaded files array');
    req.session.uploaded_files = [];
  }

  res.render('file_upload',{connected_user : req.session.connected_user, files_array : req.session.uploaded_files});
});

/* POST : ajoute à l'objet request une propriété 'file', ayant une valeur unoiquement si le formulaire' contient un champ de type 'file' qui a pour nom 'myFileInput' */
router.post('/', upload.single('myFileInput') ,function(req, res, next) {
  const uploaded_file = req.file

  if (!uploaded_file) {
    res.render('file_upload',{connected_user : req.session.connected_user, files_array : req.session.uploaded_files, upload_error : 'Merci de sélectionner le fichier à charger !'});
  } else {
    console.log(uploaded_file.originalname,' => ',uploaded_file.filename);
    req.session.uploaded_files.push(uploaded_file.filename);
    res.render('file_upload',{connected_user : req.session.connected_user, files_array : req.session.uploaded_files, uploaded_filename : uploaded_file.filename, uploaded_original:uploaded_file.originalname});
  }

});

/* GET download */
router.get('/getfile', function(req, res, next) {
  try {
    res.download('./mesfichiers/'+req.query.fichier_cible);
  } catch (error) {
    res.send('Une erreur est survenue lors du téléchargement de '+req.query.fichier_cible+' : '+error);
  }
});

module.exports = router;
