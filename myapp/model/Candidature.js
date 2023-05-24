// Créer un fichier par table de la base de données

var db = require('./ConnexionBDD.js');

module.exports = {
    readCandidatureByUser: function(email, callback) {
      db.query("SELECT * FROM Candidature \
        INNER JOIN Offre_d_emploi\
        ON Offre_d_emploi.id = Candidature.id_offre\
        INNER JOIN Fiche_poste\
        ON Offre_d_emploi.id_poste = Fiche_poste.numero\
        WHERE Candidature.email_utilisateur = \"" + email + "\";", function(err, results) {
        if (err) {
          callback(err, null);
        } else if (results.length == 0) {
          callback(new TypeError("Aucune candidature"), results);
        } else {
          callback(null, results);
        }
      }
    )},
}