var db = require('./ConnexionBDD.js');

module.exports = {
    read: function (siren, callback) {
        db.query(" SELECT * FROM Organisation WHERE siren= ?", [siren], function (err, results) {
            if (err) {
                console.log("Fonction : read : " + err.message);
                throw err;
            } else {
                console.log("Fonction : read : Succès");
                callback(results);
            }
        });
    },
    readall: function (callback) {
        db.query("SELECT * FROM Organisation", function (err, results) {
            if (err) {
                console.log("Fonction : readall : " + err.message);
                throw err;
            } else {
                console.log("Fonction : readall : Succès");
                callback(results);
            }
        });
    },
    creat: function (siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        db.query("INSERT INTO Organisation VALUES (?,?,?,?,?)",[siren, nom, siege_social_lat, siege_social_long,type_organisation] ,function (err, results) {
            if (err) {
                console.log("Fonction : creat : " + err.message);
                throw err;
            } else {
                console.log("Fonction : creat : Succès");
                callback(results);
            }
        });
    }
}