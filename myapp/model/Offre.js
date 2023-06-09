var db = require('./ConnexionBDD.js');

module.exports = {
    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = ?;", [id], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllTypeMetier: function (callback) {
        db.query("SELECT * FROM Type_metier; ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readAllStatut: function (callback) {
        db.query("SELECT * FROM Statut_poste; ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readSIRENUser: function (user, callback) {
        db.query("SELECT siren_orga FROM `Formulaire` WHERE email_utilisateur=?", [user], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (intitule,responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier,email ,missions, activites, competences,   callback) {
        // Crée un id et vérifie qu'il n'existe pas déjà dans la BDD
        // var test_id = new Boolean(true);
        // var id = -1;
        // while (test_id) {
        //     console.log("test_id Dans wile");
        //     id = Math.floor(Math.random() * 10000) + 1
        //     db.query("SELECT * FROM Offre WHERE id = ?;", [id] , function (err, results) {
        //         if (err) throw err;
        //         if (results.length == 0) {
        //             test_id = false;
        //         }
        //     });
        // }
        // Une fois l'id créé, on peut créer les requêtes SQL
        // On exécute les requêtes
        // db.query("INSERT INTO Statut VALUES (?,?);", [statut, description] , function (err, results) {
        //     if (err) throw err;
        //     console.log(results);
        //     callback(results);
        // });
        db.query("INSERT INTO Description (missions,activites,competences_attendues) VALUES (?,?,?)", [missions, activites, competences], function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
        db.query("SELECT numero FROM Description WHERE missions = ? ", [missions], function (err, recupID) {
            if (err) throw err;
            console.log(recupID);

            db.query("INSERT INTO Fiche_poste (intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, email_inscription, id_description, FP_SIREN) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier, responsable], function (err, results) {
                if (err) throw err;
                console.log(results);
                callback(results);
            });
        });
    },
    createStatut: function (statut, description, callback) {
        db.query("INSERT INTO Statut VALUES (?,?);", [statut, description], function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    }
}