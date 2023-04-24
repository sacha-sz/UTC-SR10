// Créer un fichier par table de la base de données

var db = require('./ConnexionBDD.js');

function getLatLngFromAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            callback(lat, lng);
        } else {
            console.log('Erreur : ' + status);
        }
    });
}

module.exports = {
    read: function(email, callback) {
        db.query("SELECT * FROM Utilisateur WHERE email= ?", email, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function(callback) {
        db.query("select * from Utilisateur", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    areValid: function(email, password, callback) {
        sql = "SELECT pwd FROM Utilisateur WHERE email = ?";
        rows = db.query(sql, email, function(err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },
    // create: function(email, password, nom, prenom, tel, sexe, ddn, adresse, ville, pays) {
    //     var ladate = new Date()
    //     var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
    //     sql = "INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur)VALUES('?', '?', '?', '?', '?', '?', ?, '?', ?, ?, '?', ?);";
    //     rows = db.query(sql,
    //         email,
    //         password,
    //         nom,
    //         prenom,
    //         ddn,
    //         date_creation,
    //         true,
    //         tel,
    //         getLatLngFromAddress(adresse + ', ' + ville + ', ' + pays, function(lat, lng) {
    //             lat,
    //         }),
    //         getLatLngFromAddress(adresse + ', ' + ville + ', ' + pays, function(lat, lng) {
    //             lng,
    //         }),
    //         sexe,
    //         'CANDIDAT',
    //         function(err, results) {
    //             if (err) throw err;
    //             callback(true);
    //         });
    // },

    create: function(email, password, nom, prenom, tel, sexe, ddn, adresse, ville, pays, callback) {
        var ladate = new Date();
        var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
        var lat = null;
        var lng = null;
        getLatLngFromAddress(adresse + ', ' + ville + ', ' + pays, function(result) {
            lat = result.lat;
            lng = result.lng;
            sql = "INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            rows = db.query(sql, [email, password, nom, prenom, ddn, date_creation, true, tel, lat, lng, sexe, 'CANDIDAT'], function(err, results) {
                if (err) {
                    console.log("Erreur : " + err.message);
                    callback(false);
                } else {
                    console.log("Utilisateur créé avec succès.");
                    callback(true);
                }
            });
        });
    },


    areValid_login: function(email, password, callback) {
        sql = "SELECT * FROM Utilisateur WHERE email = ? AND password = ?";
        rows = db.query(sql, [email, password], function(err, results) {
            if (err) throw err;
            if (rows.length == 1) {
                callback(true)
            } else {
                callback(false);
            }
        });
    }
}