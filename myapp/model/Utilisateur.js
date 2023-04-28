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
        db.query("SELECT * FROM Utilisateur", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    
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
    create: function(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, callback) {
        var ladate = new Date();
        var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
        var lat = latitude;
        var lng = longitude;
        sql = "INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur) VALUES (";
        sql += "\"" + email + "\", ";
        sql += "\"" + password + "\", ";
        sql += "\"" + nom + "\", ";
        sql += "\"" + prenom + "\", ";
        sql += "\"" + ddn + "\", ";
        sql += "\"" + date_creation + "\", ";
        sql += "true, ";
        sql += "\"" + tel + "\", ";
        sql += lat + ", ";
        sql += lng + ", ";
        sql += "\"" + sexe + "\", ";
        sql += "\"CANDIDAT\");";
    
        rows = db.query(sql, function(err, results) {
            if (err) {
                console.log("Erreur : " + err.message);
                callback(false);
            } else {
                console.log("Utilisateur créé avec succès.");
                callback(true);
            }
        });
    },



}