const e = require('express');
var db = require('./ConnexionBDD.js');

module.exports = {
    readTypeOrganisation: function (callback) {
        db.query("SELECT * FROM Type_organisation ", function (err, results) {
            if (err) {
                callback(err, null)
            } else if (results.length == 0) {
                callback(new TypeError("Aucun type d'organisation"), results);
            } else {
            callback(null,results);
            }
        });
    },

    createTypeOrganisation: function (type_organisation, description, callback) {
        sql = "INSERT INTO Type_organisation VALUES (\"" + type_organisation + "\", \"" + description + "\")"
        db.query(sql, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    deleteTypeOrganisation: function (type_organisation, callback) {
        db.query("DELETE FROM Type_organisation WHERE nom = " + "\"" + type_organisation + "\"", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    read: function (siren, callback) {
        db.query(" SELECT * FROM Organisation WHERE siren= ?", siren, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Organisation; ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    createTypeOrganisation: function (type_organisation, description, callback) {
        sql = "INSERT INTO Type_organisation VALUES (\"" + type_organisation + "\", \"" + description + "\")"
        db.query(sql, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        sql = "INSERT INTO Organisation VALUES (" + siren + ", \"" + nom + "\", " + siege_social_lat + ", " + siege_social_long + ", \"" + type_organisation + "\" )"
        db.query(sql, function (err, results) {
            if (err) throw err;
            // TODO : Add comment to know if the entreprise is created or not
            callback(results);
        });
    },

    delete: function (siren, callback) {
        db.query("DELETE FROM Organisation WHERE siren = " + "\"" + siren + "\"", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    addUser: function (siren, email, callback) {
        var date = new Date();
        var date_creation = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        sql = "INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga) VALUES (\"EN COURS\", \"" + date_creation + "\" , \"REJOINDRE\", \"" + email + "\", \"" + siren + "\")"
        db.query(sql, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    // Test que la latitude et la longitude soient valides
    TEST_LATITUDE: function (latitude) {
        // Vérification de la latitude
        // Format : 
        // - Un nombre décimal compris entre -90 et 90
        var correct_latitude_test = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        return correct_latitude_test.test(latitude);
    },

    TEST_LONGITUDE: function (longitude) {
        // Vérification de la longitude
        // Format : 
        // - Un nombre décimal compris entre -180 et 180
        var correct_longitude_test = /^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
        return correct_longitude_test.test(longitude);
    },
    isValidSIREN: function (siren) {
        var pattern = /^[0-9]{9}$/;
        if (!pattern.test(siren)) {
            return false;
        } else {
            return true;
        }
    }
}