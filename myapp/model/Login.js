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
                        callback(true, results[0].type_utilisateur);
                    } else {
                        callback(false, null);
                    }
                });
            } else {
                callback(false, null);
            }
        });
    },
}