var db = require('./ConnexionBDD.js');

module.exports = {
  readCandidatureByUser: function (email, callback) {
    db.query("SELECT * FROM Candidature AS C\
              INNER JOIN Offre_d_emploi AS OE\
              ON OE.id = C.id_offre\
              INNER JOIN Fiche_poste AS FP\
              ON OE.id_poste = FP.numero\
              WHERE C.email_utilisateur = ?;", [email], function (err, results) {
      if (err) {
        console.log("Fonction readCandidatureByUser : " + err)
        callback(err, null);
      } else if (results.length == 0) {
        console.log("Fonction readCandidatureByUser : Aucune candidature trouvée")
        callback(new TypeError("Aucune candidature"), results);
      } else {
        console.log("Fonction readCandidatureByUser : Succès")
        callback(null, results);
      }
    }
    )
  },

  PieceJointeUser: function (email, callback) {
    db.query("SELECT * FROM Candidature AS C \
              INNER JOIN Pieces_jointes AS PJ \
              ON PJ.id_candidature = C.id \
              WHERE C.email_utilisateur = ?;", [email], function (err, results) {
      if (err) {
        console.log("Fonction PieceJointeUser : " + err)
        callback(err, null);
      } else if (results.length == 0) {
        console.log("Fonction PieceJointeUser : Aucune candidature trouvée")
        callback(new TypeError("Aucune candidature"), results);
      } else {
        console.log("Fonction PieceJointeUser : Succès")
        callback(null, results);
      }
    }
    )
  }
}
