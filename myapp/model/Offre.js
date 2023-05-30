var db = require('./ConnexionBDD.js');

module.exports = {
    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = \"" + mysql.escape(id) + "\";", function (err, results) {
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
        db.query("SELECT * FROM Statut; ", function (err, results) {
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
            sql_test_id = "SELECT * FROM Offre WHERE id = " + id;
            db.query(sql_test_id, function (err, results) {
                if (err) throw err;
                if (results.length == 0) {
                    test_id = false;
                }
            });
        }
        // Une fois l'id créé, on peut créer les requêtes SQL
        sqlStatut = "INSERT INTO Statut VALUES (\"" + mysql.escape(statut) + "\", \"" + mysql.escape(description) + "\");";
        sqlDesciption = "INSERT INTO Description VALUES (" + mysql.escape(id) + ", \"" + mysql.escape(missions) + "\", \"" + mysql.escape(activites) + "\", \"" + mysql.escape(competences) + "\");";
        sqlFP = "INSERT INTO Fiche_poste VALUES (" + mysql.escape(id) + ", \"" + mysql.escape(intitule) + "\", \"" + mysql.escape(responsable) + "\", " + mysql.escape(lat) + ", " + mysql.escape(long) + " , " + mysql.escape(rythme) + ", " + mysql.escape(salaire) + " , \"" + mysql.escape(statut) + "\", \"" + mysql.escape(typemetier) + "\");";
        // Vérif si les requêtes sont correctes
        console.log(sqlStatut);
        console.log(sqlDesciption);
        console.log(sqlFP);
        // On exécute les requêtes
        db.query(sqlStatut, function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
        db.query(sqlFP, function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
        db.query(sqlDesciption, function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    }
}