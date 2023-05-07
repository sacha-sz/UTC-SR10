var db = require('./ConnexionBDD.js');

module.exports = {
    read: function(siren, callback) {
        db.query(" SELECT * FROM Organisation WHERE siren= ?", siren, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function(callback) {
        db.query("SELECT * FROM Organisation; ", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function(siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        sql = "INSERT INTO Organisation VALUES (\"" + siren + "\", \"" + nom + "\", \"" + siege_social_lat + "\", \"" + siege_social_long + "\", \"" + type_organisation + "\" )"
        console.log(sql);
        db.query(sql, function(err, results) {
            if (err) throw err;
            console.log(results);
            // TODO : Add comment to know if the entreprise is created or not
            callback(results);
        });
    }
}