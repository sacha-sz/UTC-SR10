var db = require('./ConnexionBDD.js');
var pass = require('./Pass.js');

module.exports = {
    areValid_login: function (email, password, callback) {
        db.query("SELECT password, type_utilisateur FROM Utilisateur WHERE email = ?;", [email], function (err, results) {
            if (err) throw err;
            var hash = results[0].password;

            if (results.length == 1) {
                pass.comparePassword(password, hash, function (result) {
                    if (result == true) {
                        console.log("Connexion réussie");
                        callback(true, results[0].type_utilisateur);
                    } else {
                        console.log("Mot de passe incorrect");
                        callback(false, null);
                    }
                });
            } else {
                console.log(email);
                console.log(results);
                callback(false, null);
                console.log("Erreur de connexion.");
            }
        });
    },
}