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
      } else {
        console.log("Fonction readCandidatureByUser : Succès")
        callback(null, results);
      }
    })
  },

  PieceJointeUser: function (email, callback) {
    db.query("SELECT * FROM Candidature AS C \
              INNER JOIN Pieces_jointes AS PJ \
              ON PJ.id_candidature = C.id \
              WHERE C.email_utilisateur = ?;", [email], function (err, results) {
      if (err) {
        console.log("Fonction PieceJointeUser : " + err)
        callback(err, null);
      } else {
        console.log("Fonction PieceJointeUser : Succès")
        callback(null, results);
      }
    })
  },

  NeedPJOffre: function (id, callback) {
    db.query("SELECT indication_piece_jointes FROM Offre_d_emploi WHERE id = ?;", [id], function (err, results) {
      if (err) {
        console.log("Fonction NeedPJOffre : " + err)
        callback(err, null);
      } else {
        console.log("Fonction NeedPJOffre : Succès")
        callback(null, results);
      }
    })
  },

  candidater: function (email, id_offre, callback) {
    db.query("INSERT INTO Candidature (email_utilisateur, id_offre) VALUES (?, ?);", [email, id_offre], function (err, results) {
      if (err) {
        console.log("Fonction candidater : " + err)
        callback(err, null);
      } else {
        console.log("Fonction candidater : Succès")
        callback(null, results);
      }
    })
  },

  uploadPJ: function (nom, type_pieces, lien, id_candidature, callback) {
    db.query("INSERT INTO Pieces_jointes (nom, type_pieces, lien, id_candidature) VALUES (?, ?, ?, ?);", [nom, type_pieces, lien, id_candidature], function (err, results) {
      if (err) {
        console.log("Fonction uploadPJ : " + err)
        callback(err, null);
      } else {
        console.log("Fonction uploadPJ : Succès")
        callback(null, results);
      }
    })
  },
}
