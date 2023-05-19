// Créer un fichier par table de la base de données

var db = require('./ConnexionBDD.js');

module.exports = {
    read: function(numero, callback) {
        db.query(" SELECT * FROM Fiche_poste WHERE numero= ?", numero, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    
    readAllOffers: function(callback) {
        sql = "SELECT  \
        OE.id, OE.nombre_de_piece, OE.date_validite, OE.indication_piece_jointes, \
        FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
        SP.nom AS SP_nom, SP.description AS SP_description, \
        TM.nom AS TM_nom, TM.description AS TM_description \
        FROM Offre_d_emploi AS OE \
        INNER JOIN Fiche_poste AS FP \
        ON OE.id_poste = FP.numero \
        INNER JOIN Statut_poste AS SP \
        ON FP.statut_poste = SP.nom \
        INNER JOIN Type_metier AS TM \
        ON FP.type_metier = TM.nom \
        WHERE OE.etat='PUBLIEE' \
        ORDER BY OE.date_validite;";
        db.query(sql, function(err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucun utilisateur"), results);
            }
        });
    },

    readall: function(callback) {
        db.query("SELECT intitule, lieu_mission_lat, lieu_mission_long, salaire_min, salaire_max, missions AS missions FROM Fiche_poste JOIN Description ON Fiche_poste.numero = Description.numero ", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    getDescription: function(numero, callback) {
        db.query("SELECT * FROM Description WHERE numero= ?", numero, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    creat: function(numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, callback) {
        db.query("INSERT INTO Fiche_poste(numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    }

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