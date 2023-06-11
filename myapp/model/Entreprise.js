const e = require('express');
var db = require('./ConnexionBDD.js');

module.exports = {
    /// SELECT
    readTypeOrganisation: function (callback) {
        db.query("SELECT * FROM Type_organisation;", function (err, results) {
            if (err) {
                console.log("Fonction readTypeOrganisation : Erreur lors de la récupération des types d'organisation")
                callback(err, null);
            } else {
                console.log("Fonction readTypeOrganisation : Récupération des types d'organisation avec succès")
                callback(null, results);
            }
        });
    },

    read: function (siren, callback) {
        db.query("SELECT * FROM Organisation WHERE siren = ?;", [siren], function (err, results) {
            if (err) {
                console.log("Fonction read : Erreur lors de la récupération de l'organisation")
                callback(err, null);
            } else {
                console.log("Fonction read : Récupération de l'organisation avec succès")
                callback(null, results);
            }
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Organisation; ", function (err, results) {
            if (err) {
                console.log("Fonction readall : Erreur lors de la récupération des organisations")
                callback(err, null);
            } else {
                console.log("Fonction readall : Récupération des organisations avec succès")
                callback(null, results);
            }
        });
    },


    /// INSERT
    createTypeOrganisation: function (type_organisation, description, callback) {
        db.query("INSERT INTO Type_organisation VALUES (?, ?);", [type_organisation, description], function (err, results) {
            if (err) {
                console.log("Fonction createTypeOrganisation : Erreur lors de l'ajout du type d'organisation")
                callback(err, false);
            } else if (results.affectedRows > 0) {
                console.log("Fonction createTypeOrganisation : Ajout du type d'organisation avec succès")
                callback(null, true);
            } else {
                console.log("Fonction createTypeOrganisation : Erreur lors de l'ajout du type d'organisation")
                callback(new TypeError("Erreur lors de l'ajout du type d'organisation"), false);
            }
        });
    },

    createTypeOrganisation: function (type_organisation, description, callback) {
        db.query("INSERT INTO Type_organisation VALUES (?, ?);", [type_organisation, description], function (err, results) {
            if (err) {
                console.log("Fonction createTypeOrganisation : Erreur lors de l'ajout du type d'organisation")
                callback(err, false);
            } else if (results.affectedRows > 0) {
                console.log("Fonction createTypeOrganisation : Ajout du type d'organisation avec succès")
                callback(null, true);
            } else {
                console.log("Fonction createTypeOrganisation : Erreur lors de l'ajout du type d'organisation")
                callback(new TypeError("Erreur lors de l'ajout du type d'organisation"), false);
            }
        });
    },

    create: function (siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        db.query("INSERT INTO Organisation VALUES (?, ?, ?, ?, ?);", [siren, nom, siege_social_lat, siege_social_long, type_organisation], function (err, results) {
            if (err) {
                console.log("Fonction create : Erreur lors de l'ajout de l'organisation")
                callback(err, false);
            } else if (results.affectedRows > 0) {
                console.log("Fonction create : Ajout de l'organisation avec succès")
                callback(null, true);
            } else {
                console.log("Fonction create : Erreur lors de l'ajout de l'organisation")
                callback(new TypeError("Erreur lors de l'ajout de l'organisation"), false);
            }
        });
    },

    addUser: function (siren, email, callback) {
        var date = new Date();
        var date_creation = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        db.query("INSERT INTO Formulaire (date_creation, email_utilisateur, siren_orga) VALUES (?, ?, ?);", [date_creation, email, siren], function (err, results) {
            if (err) {
                console.log("Fonction addUser : Erreur lors de l'ajout de l'utilisateur")
                callback(err, null);
            } else if (results.affectedRows > 0) {
                console.log("Fonction addUser : Ajout de l'utilisateur avec succès")
                callback(null, true);
            } else {
                console.log("Fonction addUser : Erreur lors de l'ajout de l'utilisateur")
                callback(new TypeError("Erreur lors de l'ajout de l'utilisateur"), false);
            }
        });
    },

    /// DELETE
    deleteTypeOrganisation: function (type_organisation, callback) {
        db.query("DELETE FROM Type_organisation WHERE nom = ?;", [type_organisation], function (err, results) {
            if (err) {
                console.log("Fonction deleteTypeOrganisation : Erreur lors de la suppression du type d'organisation")
                callback(err, null);
            } else if (results.affectedRows > 0) {
                console.log("Fonction deleteTypeOrganisation : Suppression du type d'organisation avec succès")
                callback(null, true);
            } else {
                console.log("Fonction deleteTypeOrganisation : Erreur lors de la suppression du type d'organisation")
                callback(new TypeError("Aucun type d'organisation avec ce nom"), false);
            }
        });
    },

    delete: function (siren, callback) {
        db.query("DELETE FROM Organisation WHERE siren = ?;", [siren], function (err, results) {
            if (err) {
                console.log("Fonction delete : Erreur lors de la suppression de l'organisation")
                callback(err, false);
            } else if (results.affectedRows > 0) {
                console.log("Fonction delete : Suppression de l'organisation avec succès")
                callback(null, true);
            } else {
                console.log("Fonction delete : Erreur lors de la suppression de l'organisation")
                callback(new TypeError("Aucune organisation avec ce SIREN"), false);
            }
        });
    },

    entrepriseRecruteur: function (email, callback) {
        db.query("SELECT * FROM Organisation AS O \
                  INNER JOIN Formulaire AS F \
                  ON F.siren_orga = O.siren \
                  WHERE F.etat_formulaire='ACCEPTEE' AND F.email_utilisateur = ?", [email], function (err, results) {
            if (err) {
                console.log("Fonction entrepriseRecruteur : Erreur lors de la récupération des entreprises recruteurs")
                callback(err, null);
            } else {
                console.log("Fonction entrepriseRecruteur : Erreur lors de la récupération des entreprises recruteurs")
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
                console.log("Fonction getAsking : Erreur lors de la récupération des demandes")
                callback(err, null);
            } else {
                console.log("Fonction getAsking : Erreur lors de la récupération des demandes")
                callback(new TypeError("Aucune demande trouvée"), null);
            }
        });
    },


    /// UPDATE
    formulaire_accept: function (siren, email, callback) {
        db.query("UPDATE Formulaire SET etat_formulaire = 'ACCEPTEE' WHERE siren_orga = ? AND email_utilisateur = ?;", [siren, email], function (err, results) {
            if (err) {
                console.log("Fonction formulaire_accept : Erreur lors de l'acceptation du formulaire")
                callback(err, null);
            } else {
                db.query("UPDATE Utilisateur SET type_utilisateur = 'RECRUTEUR' WHERE email = ?;", [email], function (err, results) {
                    if (err) {
                        console.log("Fonction formulaire_accept : Erreur lors de l'acceptation du formulaire")
                        callback(err, null);
                    } else if (results.affectedRows > 0) {
                        console.log("Fonction formulaire_accept : Acceptation du formulaire avec succès")
                        callback(null, true);
                    } else {
                        console.log("Fonction formulaire_accept : Erreur lors de l'acceptation du formulaire")
                        callback(new TypeError("Erreur lors de l'acceptation du formulaire"), false);
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