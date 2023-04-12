// Créer un fichier par table de la base de données

var db = require('./ConnexionBDD.js');

module.exports = {
    read: function(numero, callback) {
        db.query(" SELECT * FROM Fiche_poste WHERE numero= ?", numero, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function(callback) {
        db.query("SELECT intitule, lieu_mission_lat, lieu_mission_long, salaire_min, salaire_max, missions AS missions FROM Fiche_poste JOIN Description ON Fiche_poste.numero = Description.numero ", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    // areValid: function(email, password, callback) {
    //     sql = "SELECT pwd FROM Utilisateur WHERE email = ?";
    //     rows = db.query(sql, email, function(err, results) {
    //         if (err) throw err;
    //         if (rows.length == 1 && rows[0].pwd === password) {
    //             callback(true)
    //         } else {
    //             callback(false);
    //         }
    //     });
    // },
    creat: function(numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, callback) {
        db.query("INSERT INTO Fiche_poste(numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    }

    // areValid_login: function(email, password, callback) {
    //     sql = "SELECT * FROM Utilisateur WHERE email = ? AND password = ?";
    //     rows = db.query(sql, [email, password], function(err, results) {
    //         if (err) throw err;
    //         if (rows.length == 1) {
    //             callback(true)
    //         } else {
    //             callback(false);
    //         }
    //     });
    // }
}