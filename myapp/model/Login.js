var db = require('./ConnexionBDD.js');

module.exports = {
    areValid_login: function (email, password, callback) {
        db.query("SELECT password, type_utilisateur FROM Utilisateur WHERE email = ?;", [email], function (err, results) {
            if (err) throw err;
            if (results.length == 1 && results[0].password === password && results[0].type_utilisateur != null) {
                callback(true, results[0].type_utilisateur);
                console.log("Utilisateur connecté avec succès.");
            } else {
                console.log(email);
                console.log(results);
                callback(false, null);
                console.log("Erreur de connexion.");
            }
        });
    },
}