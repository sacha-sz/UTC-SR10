var db = require('./ConnexionBDD.js');

module.exports = {
    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = ?;", [id] , function (err, results) {
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

    create: function (intitule, description, responsable, lat, long, rythme, salaire, missions, activites, competences, statut, typemetier, callback) {
        // Crée un id et vérifie qu'il n'existe pas déjà dans la BDD
        var test_id = new Boolean(true);
        var id = -1;
        while (test_id) {
            console.log("test_id Dans wile");
            id = Math.floor(Math.random() * 10000) + 1
            db.query("SELECT * FROM Offre WHERE id = ?;", [id] , function (err, results) {
                if (err) throw err;
                if (results.length == 0) {
                    test_id = false;
                }
            });
        }
        // Une fois l'id créé, on peut créer les requêtes SQL
        // On exécute les requêtes
        db.query("INSERT INTO Statut VALUES (?,?);", [statut, description] , function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
        db.query("INSERT INTO Description VALUES (?,?,?,?)",[id, missions, activites, competences] ,  function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
        db.query("INSERT INTO Fiche_poste VALUES (?,?,?,?,?,?,?,?,?)", [id,intitule, responsable, lat, long, rythme, salaire, statut, typemetier] , function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    },
    createStatut : function (statut, description, callback) {
        db.query("INSERT INTO Statut VALUES (?,?);", [statut, description] , function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    }
}