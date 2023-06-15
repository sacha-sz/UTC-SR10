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
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  CompteNombreCandidature: function (email,id_offre,  callback) {
    db.query("SELECT COUNT(*) AS nbCandidature FROM `Candidature` WHERE email_utilisateur = ? AND id_offre = ?", [email,id_offre], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
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
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  NeedPJOffre: function (id, callback) {
    db.query("SELECT indication_piece_jointes FROM Offre_d_emploi WHERE id = ?;", [id], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  candidater: function (email, id_offre, callback) {
    db.query("INSERT INTO Candidature (email_utilisateur, id_offre) VALUES (?, ?);", [email, id_offre], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  uploadPJ: function (nom, type_pieces, lien, id_candidature, callback) {
    db.query("INSERT INTO Pieces_jointes (nom, type_pieces, lien, id_candidature) VALUES (?, ?, ?, ?);", [nom, type_pieces, lien, id_candidature], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
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
        callback(err, null);
      } else {
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
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  accepterCandidature: function (id_candidature, email_utilisateur, callback) {
    db.query("UPDATE Candidature SET etat_candidature = 'ACCEPTEE' WHERE id = ? AND email_utilisateur = ?;", [id_candidature, email_utilisateur], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  refuserCandidature: function (id_candidature, email_utilisateur, callback) {
    db.query("UPDATE Candidature SET etat_candidature = 'REFUSEE' WHERE id = ? AND email_utilisateur = ?;", [id_candidature, email_utilisateur], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  refuserAutresCandidatures: function (id_offre, email_utilisateur, callback) { 
    db.query("UPDATE Candidature SET etat_candidature = 'REFUSEE' WHERE id_offre = ? AND email_utilisateur != ?;", [id_offre, email_utilisateur], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },


  expireeOffre: function (id_offre_emploie, callback) {
    db.query("UPDATE Offre_d_emploi SET etat = 'EXPIREE' WHERE id = ?;", [id_offre_emploie], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  },

  getAllPJ: function(id, email, callback) {
    db.query("SELECT * FROM Pieces_jointes WHERE id_candidature = ? AND \
    nom LIKE ?;", [id, email+"-%"], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  )},

  getIdCandidature: function(id_offre, email, callback) {
    db.query("SELECT id FROM Candidature WHERE id_offre = ? AND email_utilisateur = ?;", [id_offre, email], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  )},
}
