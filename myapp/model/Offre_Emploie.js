// Créer un fichier par table de la base de données
var db = require("./ConnexionBDD.js");

module.exports = {
    read: function (numero, callback) {
        db.query("SELECT * FROM Fiche_poste WHERE numero = ?", [numero], function (err, results) {
            if (err) {
                console.log("Fonction : read erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : read succès");
                callback(null, results);
            }
        });
    },

    readAllOffers: function (callback) {
        var sql_readAllOffers = "SELECT DISTINCT\
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
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.etat = 'PUBLIEE' \
            ORDER BY OE.date_validite;";

        db.query(sql_readAllOffers, function (err, results) {
            if (err) {
                console.log("Fonction : readAllOffers erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllOffers succès");
                callback(null, results);
            }
        });
    },

    readAllValidOffers_desc: function (callback) {
        var sql_readAllOffers_desc = "SELECT DISTINCT\
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
            INNER JOIN Description AS DE \
            ON DE.numero = FP.id_description \
            INNER JOIN Organisation as ORG \
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.etat = 'PUBLIEE' AND\
            OE.date_validite >= CAST(NOW() AS DATE) \
            ORDER BY OE.date_validite DESC;";

        db.query(sql_readAllOffers_desc, function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers_desc erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers_desc succès");
                callback(null, results);
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
        ON ORG.siren = FP.FP_SIREN \
        WHERE OE.etat = 'PUBLIEE' AND\
        OE.date_validite >= CAST(NOW() AS DATE) AND LOWER(FP.intitule) LIKE LOWER(?) \
        ORDER BY OE.date_validite DESC;", [escapedQuery], function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers_desc_search erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers_desc_search succès");
                callback(null, results);
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
        ON ORG.siren = FP.FP_SIREN \
        WHERE OE.etat = 'PUBLIEE' AND \
        OE.date_validite >= CAST(NOW() AS DATE) AND \
        LOWER(FP.intitule) LIKE LOWER(?)\
        ORDER BY OE.date_validite;", [escapedQuery], function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers_search erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers_search succès");
                callback(null, results);
            }
        });
    },


    readAllValidOffers_dist: function (latitude, longitude, callback) {
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
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.etat = 'PUBLIEE' AND \
            OE.date_validite >= CAST(NOW() AS DATE) \
            ORDER BY SQRT(POWER(FP.lieu_mission_lat - ?, 2) + POWER(FP.lieu_mission_long - ?, 2)) ASC", [latitude, longitude], function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers_dist erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers_dist succès");
                callback(null, results);
            }
        });
    },


    readAllValidOffers_dist_search: function (latitude, longitude, query, callback) {
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
        ON ORG.siren = FP.FP_SIREN \
        WHERE OE.etat = 'PUBLIEE' AND \
        OE.date_validite >= CAST(NOW() AS DATE)  AND LOWER(FP.intitule) LIKE LOWER(?) \
        ORDER BY SQRT(POWER(FP.lieu_mission_lat - ?, 2) + POWER(FP.lieu_mission_long - ?, 2)) ASC", [escapedQuery, latitude, longitude], function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers_dist_search erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers_dist_search succès");
                callback(null, results);
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
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.etat = 'PUBLIEE' AND \
            OE.date_validite >= CAST(NOW() AS DATE) \
            ORDER BY OE.date_validite;";

        db.query(sql_readAllOffers, function (err, results) {
            if (err) {
                console.log("Fonction : readAllValidOffers erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readAllValidOffers succès");
                callback(null, results);
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
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.id = ?;", [id], function (err, offre) {
            if (err) {
                console.log("Fonction : readOffersById erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readOffersById succès");
                callback(null, offre);
            }
        });
    },

    readOffersByIdSansVerif: function (id, callback) {
        db.query("SELECT DISTINCT\
            OE.id, OE.date_validite, OE.indication_piece_jointes, OE.id_poste, \
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
            ON ORG.siren = FP.FP_SIREN \
            WHERE OE.id = ?;", [id], function (err, offre) {
            if (err) {
                console.log("Fonction : readOffersByIdSansVerif erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : readOffersByIdSansVerif succès");
                callback(null, offre);
            }
        });
    },

    readall: function (callback) {
        db.query(
            "SELECT intitule, lieu_mission_lat, lieu_mission_long, salaire_min, salaire_max, missions AS missions FROM Fiche_poste JOIN Description ON Fiche_poste.numero = Description.numero ;",
            function (err, results) {
                if (err) {
                    console.log("Fonction : readall erreur : " + err);
                    callback(err, null);
                } else {
                    console.log("Fonction : readall succès");
                    callback(null, results);
                }
            }
        );
    },
    getDescription: function (numero, callback) {
        db.query("SELECT * FROM Description WHERE numero =?;", [numero], function (err, results) {
            if (err) {
                console.log("Fonction : getDescription erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : getDescription succès");
                callback(null, results);
            }
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
                if (err) {
                    console.log("Fonction : creat erreur : " + err);
                    callback(err, null);
                } else if (results.affectedRows === 0) {
                    console.log("Fonction : creat erreur : Aucun résultat");
                    callback(new TypeError("Aucune offre"), null);
                } else {
                    console.log("Fonction : creat succès");
                    callback(null, results);
                }
            });
    },

    getoffrebyrecruteur: function (email, callback) {
        db.query("SELECT DISTINCT intitule, Description.numero as D_numero,responsable_hierarchique ,lieu_mission_lat , lieu_mission_long, rythme , salaire_min , salaire_max , statut_poste , type_metier, email_inscription , id_description , FP_SIREN , nombre_de_piece ,Offre_d_emploi.id as id , etat , date_validite ,indication_piece_jointes , id_poste , Formulaire.id as idF , etat_formulaire , date_creation , email_utilisateur , siren_orga , Fiche_poste.numero as FP_numero , missions , activites , competences_attendues, siren, nom , siege_social_lat ,siege_social_long ,type_organisation FROM Fiche_poste INNER JOIN Offre_d_emploi ON Offre_d_emploi.id_poste = Fiche_poste.numero INNER JOIN Formulaire ON Formulaire.email_utilisateur = Fiche_poste.email_inscription INNER JOIN Description ON Description.numero = Fiche_poste.id_description INNER JOIN Organisation ON Organisation.siren = Formulaire.siren_orga WHERE Fiche_poste.email_inscription = ?", [email], function (err, offre) {
            if (err) {
                console.log("Fonction : getoffrebyrecruteur erreur : " + err);
                callback(err, null);
            } else {
                console.log("Fonction : getoffrebyrecruteur succès");
                callback(null, offre);
            }
        });
    },
    
    createOffreEmploi : function (nb_pieces, etat, date_validite, indication_piece_jointes,id_poste, callback) {
        db.query("INSERT INTO Offre_d_emploi(nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste) VALUES (?, ?, ?, ?, ?);",
            [nb_pieces, etat, date_validite, indication_piece_jointes, id_poste],
            function (err, results) {
                if (err) {
                    console.log("Fonction : createOffreEmploi erreur : " + err);
                    callback(err, null);
                } else if (results.affectedRows === 0) {
                    console.log("Fonction : createOffreEmploi erreur : Aucun résultat");
                    callback(new TypeError("Aucune offre"), null);
                } else {
                    console.log("Fonction : createOffreEmploi succès");
                    callback(null, results);
                }
            });
    }
};
