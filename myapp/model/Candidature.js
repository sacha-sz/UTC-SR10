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

  getInfoCandidature: function (id_candidature, callback) {
    db.query("SELECT U.nom, U.prenom, C.date_candidature, C.email_utilisateur, C.id, C.id_offre \
              FROM Candidature AS C \
              INNER JOIN Utilisateur AS U \
              ON U.email = C.email_utilisateur \
              INNER JOIN Offre_d_emploi AS OE \
              ON OE.id = C.id_offre \
              WHERE OE.id = ?;", [id_candidature], function (err, results) {
      if (err) {  
        console.log("Fonction getInfoCandidature : " + err)
        callback(err, null);
      } else {
        console.log("Fonction getInfoCandidature : Succès")
        callback(null, results);
      }
    })
  },

  accepterCandidature: function (id_candidature, email_utilisateur, callback) {
    db.query("UPDATE Candidature SET etat_candidature = 'ACCEPTEE' WHERE id = ? AND email_utilisateur = ?;", [id_candidature, email_utilisateur], function (err, results) {
      if (err) {
        console.log("Fonction accepterCandidature : " + err)
        callback(err, null);
      } else {
        console.log("Fonction accepterCandidature : Succès")
        callback(null, results);
      }
    })
  },

  refuserCandidature: function (id_candidature, email_utilisateur, callback) {
    db.query("UPDATE Candidature SET etat_candidature = 'REFUSEE' WHERE id = ? AND email_utilisateur = ?;", [id_candidature, email_utilisateur], function (err, results) {
      if (err) {
        console.log("Fonction refuserCandidature : " + err)
        callback(err, null);
      } else {
        console.log("Fonction refuserCandidature : Succès")
        callback(null, results);
      }
    })
  },

  refuserAutresCandidatures: function (id_offre, email_utilisateur, callback) { 
    db.query("UPDATE Candidature SET etat_candidature = 'REFUSEE' WHERE id_offre = ? AND email_utilisateur != ?;", [id_offre, email_utilisateur], function (err, results) {
      if (err) {
        console.log("Fonction refuserAutresCandidatures : " + err)
        callback(err, null);
      } else {
        console.log("Fonction refuserAutresCandidatures : Succès")
        callback(null, results);
      }
    })
  },


  expireeOffre: function (id_offre_emploie, callback) {
    db.query("UPDATE Offre_d_emploi SET etat = 'EXPIREE' WHERE id = ?;", [id_offre_emploie], function (err, results) {
      if (err) {
        console.log("Fonction expireeOffre : " + err)
        callback(err, null);
      } else {
        console.log("Fonction expireeOffre : Succès")
        callback(null, results);
      }
    })
  },

  getAllPJ: function(id, email, callback) {
    db.query("SELECT * FROM Pieces_jointes WHERE id_candidature = ? AND \
    nom LIKE ?;", [id, email+"-%"], function (err, results) {
      if (err) {
        console.log("Fonction getAllPJ : " + err)
        callback(err, null);
      } else {
        console.log("Fonction getAllPJ : Succès")
        callback(null, results);
      }
    }
  )},
}
