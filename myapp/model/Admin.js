var db = require('./ConnexionBDD.js');

module.exports = {
    readall: function (callback) {
        db.query("SELECT * FROM Utilisateur WHERE type_utilisateur = 'ADMINISTRATEUR';", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    updateTypeUtilisateur: function (email, new_type, callback) {
        db.query("UPDATE Utilisateur SET type_utilisateur = ? WHERE email = ?;", [new_type, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    getAllOrganisationCreation: function (callback) {
        db.query("SELECT O.nom AS ORG_nom, O.type_organisation AS OT, O.siren, U.nom, U.prenom, U.email FROM Formulaire  AS F \
            INNER JOIN Utilisateur AS U ON F.email_utilisateur = U.email \
            INNER JOIN Organisation AS O ON F.siren_orga = O.siren \
            WHERE siren_orga IN ( \
                SELECT siren_orga \
                FROM Formulaire \
                GROUP BY siren_orga \
                HAVING COUNT(*) = 1 \
            ) AND etat_formulaire = 'EN COURS';", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

}