const e = require('express');
var db = require('./ConnexionBDD.js');

module.exports = {
    /// SELECT
    readTypeOrganisation: function (callback) {
        db.query("SELECT * FROM Type_organisation ;", function (err, results) {
            if (err) {
                callback(err, null);
            } else if (results.length == 0) {
                callback(new TypeError("Aucun type d'organisation"), results);
            } else {
                callback(null, results);
            }
        });
    },

    read: function (siren, callback) {
        var sql_read = "SELECT * FROM Organisation WHERE siren = \"" + mysql.escape(siren) + "\";";
        db.query(sql_read, function (err, results) {
            if (err) {
                callback(err, null);
            } else if (results.length == 0) {
                callback(new TypeError("Aucune organisation avec ce siren"), results);
            } else {
                callback(null, results);
            }
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Organisation; ", function (err, results) {
            if (err) {
                callback(err, null);
            } else if (results.length == 0) {
                callback(new TypeError("Aucune organisation"), results);
            } else {
                callback(null, results);
            }
        });
    },


    /// INSERT
    createTypeOrganisation: function (type_organisation, description, callback) {
        var sql_createTypeOrganisation = "INSERT INTO Type_organisation VALUES (\"" + mysql.escape(type_organisation) + "\", \"" + mysql.escape(description) + "\");";
        db.query(sql_createTypeOrganisation, function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                if (results.affectedRows > 0) {
                    console.log("Type d'organisation ajouté avec succès");
                    callback(null, true);
                } else {
                    callback(new TypeError("Erreur lors de l'ajout du type d'organisation"), false);
                }
            }
        });
    },

    createTypeOrganisation: function (type_organisation, description, callback) {
        var sql_createTypeOrganisation = "INSERT INTO Type_organisation VALUES (\"" + mysql.escape(type_organisation) + "\", \"" + mysql.escape(description) + "\");";
        db.query(sql_createTypeOrganisation, function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    create: function (siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        var sql_create = "INSERT INTO Organisation VALUES (" + mysql.escape(siren) + ", \"" + mysql.escape(nom) + "\", " + mysql.escape(siege_social_lat) + ", " + mysql.escape(siege_social_long) + ", \"" + mysql.escape(type_organisation) + "\" );";
        db.query(sql_create, function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    addUser: function (siren, email, callback) {
        var date = new Date();
        var date_creation = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var sql_addUser = "INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga) VALUES (\"EN COURS\", \"" + mysql.escape(date_creation) + "\" , \"REJOINDRE\", \"" + mysql.escape(email) + "\", \"" + mysql.escape(siren) + "\");";
        db.query(sql_addUser, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }

        });
    },

    /// DELETE

    deleteTypeOrganisation: function (type_organisation, callback) {
        db.query("DELETE FROM Type_organisation WHERE nom = \"" + mysql.escape(type_organisation) + "\";", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                if (results.affectedRows > 0) {
                    console.log("Type d'organisation supprimé avec succès");
                    callback(null, true);
                } else {
                    console.log("Aucun type d'organisation avec ce nom");
                    callback(new TypeError("Aucun type d'organisation avec ce nom"), false);
                }
            }
        });
    },

    delete: function (siren, callback) {
        const sql_delete = "DELETE FROM Organisation WHERE siren = \"" + mysql.escape(siren) + "\";";
        db.query(sql_delete, function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                if (results.affectedRows > 0) {
                    console.log("Organisation supprimée avec succès");
                    callback(null, true);
                } else {
                    console.log("Aucune organisation avec ce SIREN");
                    callback(new Error("Aucune organisation avec ce SIREN"), false);
                }
            }
        });
    },


    /// UPDATE



    /// TEST


    // Test que la latitude et la longitude soient valides
    TEST_LATITUDE: function (latitude, callback) {
        // Vérification de la latitude
        // Format : 
        // - Un nombre décimal compris entre -90 et 90
        var correct_latitude_test = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        callback(correct_latitude_test.test(latitude));
    },

    TEST_LONGITUDE: function (longitude, callback) {
        // Vérification de la longitude
        // Format : 
        // - Un nombre décimal compris entre -180 et 180
        var correct_longitude_test = /^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
        callback(correct_longitude_test.test(longitude));
    },

    isValidSIREN: function (siren, callback) {
        var pattern = /^[0-9]{9}$/;
        if (!pattern.test(siren)) {
            callback(false);
        } else {
            callback(true);
        }
    }
}