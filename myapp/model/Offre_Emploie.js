// Créer un fichier par table de la base de données
var db = require("./ConnexionBDD.js");

module.exports = {
    read: function (numero, callback) {
        var sql_read =
            'SELECT * FROM Fiche_poste WHERE numero = "' +
            mysql.escape(numero) +
            '";';
        db.query(sql_read, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readAllOffers: function (callback) {
        var sql_readAllOffers =
            "SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, \
            FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
            SP.nom AS SP_nom, SP.description AS SP_description, \
            TM.nom AS TM_nom, TM.description AS TM_description, \
            ORG.nom AS ORG_nom, \
            DE.missions, DE.activites, DE.competences_attendues \
            FROM Offre_d_emploi AS OE \
            INNER JOIN Fiche_poste AS FP \
            ON OE.id_poste = FP.numero \
            INNER JOIN Statut_poste AS SP \
            ON FP.statut_poste = SP.nom \
            INNER JOIN Type_metier AS TM \
            ON FP.type_metier = TM.nom \
            INNER JOIN Formulaire AS FO \
            ON FO.email_utilisateur = FP.email_inscription \
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FO.siren_orga \
            WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" \
            ORDER BY OE.date_validite;";

        db.query(sql_readAllOffers, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },

    readAllValidOffers_desc: function (callback) {
        var sql_readAllOffers_desc =
            "SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, \
            FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
            SP.nom AS SP_nom, SP.description AS SP_description, \
            TM.nom AS TM_nom, TM.description AS TM_description, \
            ORG.nom AS ORG_nom, \
            DE.missions, DE.activites, DE.competences_attendues \
            FROM Offre_d_emploi AS OE \
            INNER JOIN Fiche_poste AS FP \
            ON OE.id_poste = FP.numero \
            INNER JOIN Statut_poste AS SP \
            ON FP.statut_poste = SP.nom \
            INNER JOIN Type_metier AS TM \
            ON FP.type_metier = TM.nom \
            INNER JOIN Formulaire AS FO \
            ON FO.email_utilisateur = FP.email_inscription \
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FO.siren_orga \
            WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
            OE.date_validite >= CAST(NOW() AS DATE) \
            ORDER BY OE.date_validite DESC;";

        db.query(sql_readAllOffers_desc, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },
    
    readAllValidOffers_desc_search: function (query, callback) {
        var escapedQuery = '%' + query + '%';
        db.query("SELECT DISTINCT\
        OE.id, OE.date_validite, OE.indication_piece_jointes, \
        FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
        SP.nom AS SP_nom, SP.description AS SP_description, \
        TM.nom AS TM_nom, TM.description AS TM_description, \
        ORG.nom AS ORG_nom, \
        DE.missions, DE.activites, DE.competences_attendues \
        FROM Offre_d_emploi AS OE \
        INNER JOIN Fiche_poste AS FP \
        ON OE.id_poste = FP.numero \
        INNER JOIN Statut_poste AS SP \
        ON FP.statut_poste = SP.nom \
        INNER JOIN Type_metier AS TM \
        ON FP.type_metier = TM.nom \
        INNER JOIN Formulaire AS FO \
        ON FO.email_utilisateur = FP.email_inscription \
        INNER JOIN Description AS DE \
        ON DE.numero = FP.id_description \
        INNER JOIN Organisation as ORG \
        ON ORG.siren = FO.siren_orga \
        WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
        OE.date_validite >= CAST(NOW() AS DATE) AND LOWER(FP.intitule) LIKE LOWER(?) \
        ORDER BY OE.date_validite DESC;", [escapedQuery], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },

    readAllValidOffers_search: function (query, callback) {
        var escapedQuery = '%' + query + '%';
        db.query("SELECT DISTINCT\
        OE.id, OE.date_validite, OE.indication_piece_jointes, \
        FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
        SP.nom AS SP_nom, SP.description AS SP_description, \
        TM.nom AS TM_nom, TM.description AS TM_description, \
        ORG.nom AS ORG_nom, \
        DE.missions, DE.activites, DE.competences_attendues \
        FROM Offre_d_emploi AS OE \
        INNER JOIN Fiche_poste AS FP \
        ON OE.id_poste = FP.numero \
        INNER JOIN Statut_poste AS SP \
        ON FP.statut_poste = SP.nom \
        INNER JOIN Type_metier AS TM \
        ON FP.type_metier = TM.nom \
        INNER JOIN Formulaire AS FO \
        ON FO.email_utilisateur = FP.email_inscription \
        INNER JOIN Description AS DE \
        ON DE.numero = FP.id_description \
        INNER JOIN Organisation as ORG \
        ON ORG.siren = FO.siren_orga \
        WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
        OE.date_validite >= CAST(NOW() AS DATE) AND\
        LOWER(FP.intitule) LIKE LOWER(?)\
        ORDER BY OE.date_validite;", [escapedQuery], function (err, results) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },


    readAllValidOffers_dist: function (username, callback) {
        console.log(username);
        db.query("SELECT adresse_utilisateur_lat, adresse_utilisateur_long FROM Utilisateur WHERE email = ?", [username], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                console.log(results);
                var lat = results[0].adresse_utilisateur_lat;
                var long = results[0].adresse_utilisateur_long;

                db.query("SELECT DISTINCT\
                OE.id, OE.date_validite, OE.indication_piece_jointes, \
                FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
                SP.nom AS SP_nom, SP.description AS SP_description, \
                TM.nom AS TM_nom, TM.description AS TM_description, \
                ORG.nom AS ORG_nom, \
                DE.missions, DE.activites, DE.competences_attendues \
                FROM Offre_d_emploi AS OE \
                INNER JOIN Fiche_poste AS FP \
                ON OE.id_poste = FP.numero \
                INNER JOIN Statut_poste AS SP \
                ON FP.statut_poste = SP.nom \
                INNER JOIN Type_metier AS TM \
                ON FP.type_metier = TM.nom \
                INNER JOIN Formulaire AS FO \
                ON FO.email_utilisateur = FP.email_inscription \
                INNER JOIN Description AS DE \
                ON DE.numero = FP.id_description \
                INNER JOIN Organisation as ORG \
                ON ORG.siren = FO.siren_orga \
                WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
                OE.date_validite >= CAST(NOW() AS DATE) \
                ORDER BY ORDER BY SQRT(POWER(FP.lieu_mission_lat - ?, 2) + POWER(FP.lieu_mission_long - ?, 2)) ASC", [lat, long], function (err, results) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(new TypeError("Aucune offre"), results);
                    }
                });
            }
        });
    },
    
    readAllValidOffers_dist_search: function (username, query, callback) {
        var lat = getLat(username);
        var long = getLong(username);
        var escapedQuery = '%' + query + '%';
        db.query("SELECT DISTINCT\
        OE.id, OE.date_validite, OE.indication_piece_jointes, \
        FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
        SP.nom AS SP_nom, SP.description AS SP_description, \
        TM.nom AS TM_nom, TM.description AS TM_description, \
        ORG.nom AS ORG_nom, \
        DE.missions, DE.activites, DE.competences_attendues \
        FROM Offre_d_emploi AS OE \
        INNER JOIN Fiche_poste AS FP \
        ON OE.id_poste = FP.numero \
        INNER JOIN Statut_poste AS SP \
        ON FP.statut_poste = SP.nom \
        INNER JOIN Type_metier AS TM \
        ON FP.type_metier = TM.nom \
        INNER JOIN Formulaire AS FO \
        ON FO.email_utilisateur = FP.email_inscription \
        INNER JOIN Description AS DE \
        ON DE.numero = FP.id_description \
        INNER JOIN Organisation as ORG \
        ON ORG.siren = FO.siren_orga \
        WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
        OE.date_validite >= CAST(NOW() AS DATE)  AND LOWER(FP.intitule) LIKE LOWER(?) \
        ORDER BY SQRT(POWER(FP.lieu_mission_lat - ?, 2) + POWER(FP.lieu_mission_long - ?, 2)) ASC", [escapedQuery, lat, long], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },

    readAllValidOffers: function (callback) {
        var sql_readAllOffers =
            "SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, \
            FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
            SP.nom AS SP_nom, SP.description AS SP_description, \
            TM.nom AS TM_nom, TM.description AS TM_description, \
            ORG.nom AS ORG_nom, \
            DE.missions, DE.activites, DE.competences_attendues \
            FROM Offre_d_emploi AS OE \
            INNER JOIN Fiche_poste AS FP \
            ON OE.id_poste = FP.numero \
            INNER JOIN Statut_poste AS SP \
            ON FP.statut_poste = SP.nom \
            INNER JOIN Type_metier AS TM \
            ON FP.type_metier = TM.nom \
            INNER JOIN Formulaire AS FO \
            ON FO.email_utilisateur = FP.email_inscription \
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FO.siren_orga \
            WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = \"ACCEPTEE\" AND\
            OE.date_validite >= CAST(NOW() AS DATE) \
            ORDER BY OE.date_validite;";

        db.query(sql_readAllOffers, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(new TypeError("Aucune offre"), results);
            }
        });
    },


    readOffersById: function (id, callback) {
        db.query("SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, \
            FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
            SP.nom AS SP_nom, SP.description AS SP_description, \
            TM.nom AS TM_nom, TM.description AS TM_description, \
            ORG.nom AS ORG_nom, \
            DE.missions, DE.activites, DE.competences_attendues \
            FROM Offre_d_emploi AS OE \
            INNER JOIN Fiche_poste AS FP \
            ON OE.id_poste = FP.numero \
            INNER JOIN Statut_poste AS SP \
            ON FP.statut_poste = SP.nom \
            INNER JOIN Type_metier AS TM \
            ON FP.type_metier = TM.nom \
            INNER JOIN Formulaire AS FO \
            ON FO.email_utilisateur = FP.email_inscription \
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FO.siren_orga \
            WHERE OE.etat = 'PUBLIEE' AND FO.etat_formulaire = 'ACCEPTEE' AND OE.id = ?;", [id], function (err, offre) {
            if (err) {
                callback(err, null);
            } else {
                if (offre.length === 0) {
                    callback(new Error("Aucune offre trouvée"), null);
                } else {
                    callback(null, offre);
                }
            }
        });
    },

    readOffersByIdSansVerif: function (id, callback) {
        db.query("SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, \
            FP.intitule, FP.responsable_hierarchique, FP.lieu_mission_lat, FP.lieu_mission_long, FP.rythme, FP.salaire_min, FP.salaire_max, \
            SP.nom AS SP_nom, SP.description AS SP_description, \
            TM.nom AS TM_nom, TM.description AS TM_description, \
            ORG.nom AS ORG_nom, \
            DE.missions, DE.activites, DE.competences_attendues \
            FROM Offre_d_emploi AS OE \
            INNER JOIN Fiche_poste AS FP \
            ON OE.id_poste = FP.numero \
            INNER JOIN Statut_poste AS SP \
            ON FP.statut_poste = SP.nom \
            INNER JOIN Type_metier AS TM \
            ON FP.type_metier = TM.nom \
            INNER JOIN Formulaire AS FO \
            ON FO.email_utilisateur = FP.email_inscription \
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FO.siren_orga \
            WHERE OE.id = ?;", [id], function (err, offre) {
            if (err) {
                callback(err, null);
            } else {
                if (offre.length === 0) {
                    callback(new Error("Aucune offre trouvée"), null);
                } else {
                    callback(null, offre);
                }
            }
        });
    },

    readall: function (callback) {
        db.query(
            "SELECT intitule, lieu_mission_lat, lieu_mission_long, salaire_min, salaire_max, missions AS missions FROM Fiche_poste JOIN Description ON Fiche_poste.numero = Description.numero ;",
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    },
    getDescription: function (numero, callback) {
        db.query("SELECT * FROM Description WHERE numero =?;", [numero], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    creat: function (
        numero,
        intitule,
        responsable_hierarchique,
        lieu_mission_lat,
        lieu_mission_long,
        rythme,
        salaire_min,
        salaire_max,
        statut_poste,
        type_metier,
        callback
    ) {
        db.query("INSERT INTO Fiche_poste(numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier],
            function (err, results) {
                if (err) throw err;
                callback(results);
            });
    },

    getoffrebyrecruteur: function (email, callback) {
        db.query("SELECT DISTINCT * FROM Fiche_poste INNER JOIN Offre_d_emploi ON Offre_d_emploi.id_poste = Fiche_poste.numero INNER JOIN Formulaire ON Formulaire.email_utilisateur = Fiche_poste.email_inscription INNER JOIN Description ON Description.numero = Fiche_poste.id_description INNER JOIN Organisation ON Organisation.siren = Formulaire.siren_orga WHERE Fiche_poste.email_inscription = ? ", [email], function (err, offre) {
            if (err) {
                callback(err, null);
            } else {
                if (offre.length === 0) {
                    callback(new Error("Aucune offre trouvée"), null);
                } else {
                    callback(null, offre);
                }
            }
        });
    },

    getLat: function (username, callback) {
        db.query("SELECT adresse_utilisateur_lat FROM Utilisateur WHERE email = ?;", [username], function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        }
        );
    },

    getLong: function (username, callback) {
        db.query("SELECT adresse_utilisateur_long FROM Utilisateur WHERE email = ?;", [username], function (err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        }
        );
    },
};
