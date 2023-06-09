var db = require('./ConnexionBDD.js');

module.exports = {
    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = ?;", [id], function (err, results) {
            if (err) {
                console.log("Fonction : readDescriptionById : Erreur lors de la récupération de la description");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : readDescriptionById : Aucune description trouvée pour l'id " + id);
                callback(null);
            } else {
                callback(results[0]);
            }
        });
    },
    readAllTypeMetier: function (callback) {
        db.query("SELECT * FROM Type_metier; ", function (err, results) {
            if (err) {
                console.log("Fonction : readAllTypeMetier : Erreur lors de la récupération des types de métier");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : readAllTypeMetier : Aucun type de métier trouvé");
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    readAllStatut: function (callback) {
        db.query("SELECT * FROM Statut_poste; ", function (err, results) {
            if (err) {
                console.log("Fonction : readAllStatut : Erreur lors de la récupération des statuts");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : readAllStatut : Aucun statut trouvé");
                callback(null);
            } else {
                callback(results);
            }
        });
    },
    readSIRENUser: function (user, callback) {
        db.query("SELECT siren_orga FROM `Formulaire` WHERE email_utilisateur=?", [user], function (err, results) {
            if (err) {
                console.log("Fonction : readSIRENUser : Erreur lors de la récupération du SIREN");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : readSIRENUser : Aucun SIREN trouvé");
                callback(null);
            } else {
                callback(results[0]);
            }
        });
    },

    create: function (intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier, email, siren, missions, activites, competences, callback) {
        db.query("INSERT INTO Description (missions, activites, competences_attendues) VALUES (?,?,?)", [missions, activites, competences], function (err, results) {
            if (err) {
                console.log("Fonction : create : Erreur lors de la création de la description");
                throw err;
            }

            if (results.length == 0) {
                console.log("Fonction : create : Aucune description trouvée");
                callback(null);
                return;
            }

            // Récupérer l'ID auto-incrémenté
            var descriptionID = results.insertId;
            console.log("ID de la description");
            console.log(descriptionID);

            db.query("INSERT INTO Fiche_poste (intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, email_inscription, id_description, FP_SIREN) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier, email, descriptionID, siren], function (err, results) {
                if (err) {
                    console.log("Fonction : create : Erreur lors de la création de la fiche de poste");
                    throw err;
                } else if (results.length == 0) {
                    console.log("Fonction : create : Aucune fiche de poste trouvée");
                    callback(null);
                } else {
                    console.log("Fonction : create : Fiche de poste créée");
                    callback(results);
                }
            });
        });
    },

    createStatut: function (statut, description, callback) {
        db.query("INSERT INTO Statut VALUES (?,?);", [statut, description], function (err, results) {
            if (err) {
                console.log("Fonction : createStatut : Erreur lors de la création du statut");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : createStatut : Aucun statut trouvé");
                callback(null);
            } else {
                console.log("Fonction : createStatut : Statut créé");
                callback(results);
            }
        });
    },
    createTM: function (type, description, callback) {
        db.query("INSERT INTO Type_metier VALUES (?,?);", [type, description], function (err, results) {
            if (err) {
                console.log("Fonction : createTM : Erreur lors de la création du type de métier");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : createTM : Aucun type de métier trouvé");
                callback(null);
            } else {
                console.log("Fonction : createTM : Type de métier créé");
                callback(results);
            }
        });
    }
}