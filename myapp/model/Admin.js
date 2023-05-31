var db = require('./ConnexionBDD.js');

module.exports = {
    readall: function (callback) {
        db.query("SELECT * FROM Utilisateur WHERE type_utilisateur = 'ADMINISTRATEUR';", function (err, results) {
            // console.log(results);
            if (err) {
                callback(err, null);
            } else if (results.length == 0) {
                callback(new TypeError("Aucun utilisateur"), results);
            } else {
                callback(null, results);
            }
        });
    },

    updateTypeUtilisateur: function (email, new_type, callback) {
        rows = db.query("UPDATE Utilisateur SET type_utilisateur = ? WHERE email = ?;", [new_type, email], function (err, results) {
            if (err) {
                console.log("Erreur : " + err.message);
                callback(err, false);
            } else {
                console.log("type utilisateur modifié avec succès.");
                callback(err, true);
            }
        }
        )
    },

}