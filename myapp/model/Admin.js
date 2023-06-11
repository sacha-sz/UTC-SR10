var db = require('./ConnexionBDD.js');

module.exports = {
    readall: function (callback) {
        db.query("SELECT * FROM Utilisateur WHERE type_utilisateur = 'ADMINISTRATEUR';", function (err, results) {
            // console.log(results);
            if (err) {
                console.log("Fonction : readall : " + err.message);
                callback(err, null);
            } else {
                console.log("Fonction : readall : Succès");
                callback(null, results);
            }
        });
    },

    updateTypeUtilisateur: function (email, new_type, callback) {
        db.query("UPDATE Utilisateur SET type_utilisateur = ? WHERE email = ?;", [new_type, email], function (err, results) {
            if (err) {
                console.log("Fonction : updateTypeUtilisateur : " + err.message);
                callback(err, false);
            } else {
                console.log("Fonction : updateTypeUtilisateur : Succès")
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
                console.log("Fonction : getAllOrganisationCreation : " + err.message);
                callback(err, null);
            } else {
                console.log("Fonction : getAllOrganisationCreation : Succès");
                callback(null, results);
            }
        });
    }

}