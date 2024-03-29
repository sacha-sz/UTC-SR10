const e = require('express');
var db = require('./ConnexionBDD.js');

module.exports = {
    /// SELECT
    readTypeOrganisation: function (callback) {
        db.query("SELECT * FROM Type_organisation;", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    read: function (siren, callback) {
        db.query("SELECT * FROM Organisation WHERE siren = ?;", [siren], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Organisation; ", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },


    /// INSERT
    createTypeOrganisation: function (type_organisation, description, callback) {
        db.query("INSERT INTO Type_organisation VALUES (?, ?);", [type_organisation, description], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    createTypeOrganisation: function (type_organisation, description, callback) {
        db.query("INSERT INTO Type_organisation VALUES (?, ?);", [type_organisation, description], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    create: function (siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        db.query("INSERT INTO Organisation VALUES (?, ?, ?, ?, ?);", [siren, nom, siege_social_lat, siege_social_long, type_organisation], function (err, results) {
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
        db.query("INSERT INTO Formulaire (date_creation, email_utilisateur, siren_orga) VALUES (?, ?, ?);", [date_creation, email, siren], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    /// DELETE
    deleteTypeOrganisation: function (type_organisation, callback) {
        db.query("DELETE FROM Type_organisation WHERE nom = ?;", [type_organisation], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    delete: function (siren, callback) {
        db.query("DELETE FROM Organisation WHERE siren = ?;", [siren], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    entrepriseRecruteur: function (email, callback) {
        db.query("SELECT * FROM Organisation AS O \
                  INNER JOIN Formulaire AS F \
                  ON F.siren_orga = O.siren \
                  WHERE F.etat_formulaire='ACCEPTEE' AND F.email_utilisateur = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else if (results.length > 0) {
                callback(null, results);
            } else {
                callback(new TypeError("Aucune entreprise trouvée"), null);
            }
        });
    },

    getAsking: function (email, callback) {
        db.query("SELECT O.nom AS ORG_nom, O.type_organisation AS OT, O.siren, U.nom, U.prenom, U.email \
                  FROM Formulaire  AS F\
                  INNER JOIN Utilisateur AS U ON F.email_utilisateur = U.email \
                  INNER JOIN Organisation AS O ON F.siren_orga = O.siren \
                  WHERE siren_orga IN ( \
                    SELECT siren_orga \
                    FROM Formulaire \
                    GROUP BY siren_orga \
                    HAVING COUNT(*) > 1 \
                  ) AND Siren_orga IN ( \
                    SELECT siren_orga \
                    FROM Formulaire \
                    wHERE email_utilisateur = ? \
                  ) AND etat_formulaire = 'EN COURS';", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else if (results) {
                callback(null, results);
            } else {
                callback(new TypeError("Aucune demande trouvée"), null);
            }
        });
    },


    /// UPDATE
    formulaire_accept: function (siren, email, callback) {
        db.query("UPDATE Formulaire SET etat_formulaire = 'ACCEPTEE' WHERE siren_orga = ? AND email_utilisateur = ?;", [siren, email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                db.query("UPDATE Utilisateur SET type_utilisateur = 'RECRUTEUR' WHERE email = ?;", [email], function (err, results) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    },

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