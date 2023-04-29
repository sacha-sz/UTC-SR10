var db = require('./ConnexionBDD.js');

module.exports = {
    areValid_login: function(email, password, callback) {
        sql = "SELECT password FROM Utilisateur WHERE email = \"" + email + "\"";
        db.query(sql, function(err, results) {
            if (err) throw err;
            if (results.length == 1 && results[0].password === password) {
                callback(true);
                console.log("Utilisateur connecté avec succès.");
            } else {
                callback(false);
                console.log("Erreur de connexion.");
            }
        });
    },
}