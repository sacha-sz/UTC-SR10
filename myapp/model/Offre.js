var db = require('./ConnexionBDD.js');

module.exports = {
    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = ?;", [id], function (err, results) {
            if (err) {
                console.log("Fonction : readDescriptionById : Erreur lors de la récupération de la description");
                throw err;
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
    },
    updateIntitule : function (id, intitule, callback) {
        db.query("UPDATE Fiche_poste SET intitule = ? WHERE numero = ?;", [intitule, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateIntitule : Erreur lors de la mise à jour de l'intitulé");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateIntitule : Aucun intitulé trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateIntitule : Intitulé mis à jour");
                callback(results);
            }
        });
    },

    updateResponsable : function (id, responsable, callback) {
        db.query("UPDATE Fiche_poste SET responsable_hierarchique = ? WHERE numero = ?;", [responsable, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateResponsable : Erreur lors de la mise à jour du responsable");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateResponsable : Aucun responsable trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateResponsable : Responsable mis à jour");
                callback(results);
            }
        });
    },
    updateLatitude : function (id, latitude, callback) {
        db.query("UPDATE Fiche_poste SET lieu_mission_lat = ? WHERE numero = ?;", [latitude, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateLatitude : Erreur lors de la mise à jour de la latitude");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateLatitude : Aucune latitude trouvée");
                callback(null);
            } else {
                console.log("Fonction : updateLatitude : Latitude mise à jour");
                callback(results);
            }
        });
    },

    updateLongitude : function (id, longitude, callback) {
        db.query("UPDATE Fiche_poste SET lieu_mission_long = ? WHERE numero = ?;", [longitude, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateLongitude : Erreur lors de la mise à jour de la longitude");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateLongitude : Aucune longitude trouvée");
                callback(null);
            } else {
                console.log("Fonction : updateLongitude : Longitude mise à jour");
                callback(results);
            }
        });
    },

    updateRythme : function (id, rythme, callback) {
        db.query("UPDATE Fiche_poste SET rythme = ? WHERE numero = ?;", [rythme, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateRythme : Erreur lors de la mise à jour du rythme");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateRythme : Aucun rythme trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateRythme : Rythme mis à jour");
                callback(results);
            }
        });
    },

    updateSalaireMax : function (id, salaire_max, callback) {
        db.query("UPDATE Fiche_poste SET salaire_max = ? WHERE numero = ?;", [salaire_max, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateSalaireMax : Erreur lors de la mise à jour du salaire max");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateSalaireMax : Aucun salaire max trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateSalaireMax : Salaire max mis à jour");
                callback(results);
            }
        });
    },

    updateSalaireMin : function (id, salaire_min, callback) {
        db.query("UPDATE Fiche_poste SET salaire_min = ? WHERE numero = ?;", [salaire_min, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateSalaireMin : Erreur lors de la mise à jour du salaire min");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateSalaireMin : Aucun salaire min trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateSalaireMin : Salaire min mis à jour");
                callback(results);
            }
        });
    },
    updateStatut : function (id, statut, callback) {
        db.query("UPDATE Fiche_poste SET statut_poste = ? WHERE numero = ?;", [statut, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateStatut : Erreur lors de la mise à jour du statut");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateStatut : Aucun statut trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateStatut : Statut mis à jour");
                callback(results);
            }
        });
    },

    updateTypeMetier : function (id, type_metier, callback) {
        db.query("UPDATE Fiche_poste SET type_metier = ? WHERE numero = ?;", [type_metier, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateTypeMetier : Erreur lors de la mise à jour du type de métier");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateTypeMetier : Aucun type de métier trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateTypeMetier : Type de métier mis à jour");
                callback(results);
            }
        });
    },

    // la mise à jour de la description se fait en 3 étapes :
    // 1) on récupère l'id de la description associée à la fiche de poste
    // 2) on met à jour la description
    // 3) on met à jour la fiche de poste
    // on souhaite mettre à jour les missions
    updateMission : function (id_poste, missions,  callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                console.log("Fonction : updateMission : Erreur lors de la récupération de l'id de la description");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateMission : Aucun id de description trouvé");
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET missions = ? WHERE numero   = ?;", [missions, id_description], function (err, results) {
                    if (err) {
                        console.log("Fonction : updateMission : Erreur lors de la mise à jour de la description");
                        throw err;
                    } else if (results.length == 0) {
                        console.log("Fonction : updateMission : Aucune description trouvée");
                        callback(null);
                    } else {
                        console.log("Fonction : updateMission : Description mise à jour");
                        callback(results);
                    }
                });
            }
        });
    },
    // on souhaite mettre à jour les activités
    updateActivite : function (id_poste, activites,  callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                console.log("Fonction : updateActivite : Erreur lors de la récupération de l'id de la description");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateActivite : Aucun id de description trouvé");
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET activites = ? WHERE numero = ?;", [activites, id_description], function (err, results) {
                    if (err) {
                        console.log("Fonction : updateActivite : Erreur lors de la mise à jour de la description");
                        throw err;
                    } else if (results.length == 0) {
                        console.log("Fonction : updateActivite : Aucune description trouvée");
                        callback(null);
                    } else {
                        console.log("Fonction : updateActivite : Description mise à jour");
                        callback(results);
                    }
                });
            }
        });
    },
    // on souhaite mettre à jour les compétences
    updateCompetence : function(id_poste, competences, callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                console.log("Fonction : updateCompetence : Erreur lors de la récupération de l'id de la description");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateCompetence : Aucun id de description trouvé");
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET competences_attendues = ? WHERE numero = ?;", [competences, id_description], function (err, results) {
                    if (err) {
                        console.log("Fonction : updateCompetence : Erreur lors de la mise à jour de la description");
                        throw err;
                    } else if (results.length == 0) {
                        console.log("Fonction : updateCompetence : Aucune description trouvée");
                        callback(null);
                    } else {
                        console.log("Fonction : updateCompetence : Description mise à jour");
                        callback(results);
                    }
                });
            }
        });
    },
    updateEtat : function (id, etat, callback) {
        db.query("UPDATE Offre_d_emploi SET etat = ? WHERE id = ?;", [etat, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateEtat : Erreur lors de la mise à jour de l'état");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateEtat : Aucun état trouvé");
                callback(null);
            } else {
                console.log("Fonction : updateEtat : Etat mis à jour");
                callback(results);
            }
        });
    },
    updateDate : function (id, date, callback) {
        db.query("UPDATE Offre_d_emploi SET date_validite = ? WHERE id = ?;", [date, id], function (err, results) {
            if (err) {
                console.log("Fonction : updateDate : Erreur lors de la mise à jour de la date");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updateDate : Aucune date trouvée");
                callback(null);
            } else {
                console.log("Fonction : updateDate : Date mise à jour");
                callback(results);
            }
        });
    },
    updatePJ : function (id, pj, callback) {
        db.query("UPDATE Offre_d_emploi SET indication_piece_jointes = ? WHERE id = ?;", [pj, id], function (err, results) {
            if (err) {
                console.log("Fonction : updatePJ : Erreur lors de la mise à jour des pièces jointes");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updatePJ : Aucune pièce jointe trouvée");
                callback(null);
            } else {
                console.log("Fonction : updatePJ : Pièces jointes mises à jour");
                callback(results);
            }
        });
    }, 
    updateEtat : function (id, poste, callback) {
        db.query("UPDATE Offre_d_emploi SET etat = ? WHERE id = ?;", [poste, id], function (err, results) {
            if (err) {
                console.log("Fonction : updatePublie : Erreur lors de la mise à jour de la publication");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : updatePublie : Aucune publication trouvée");
                callback(null);
            } else {
                console.log("Fonction : updatePublie : Publication mise à jour");
                callback(results);
            }
        });
    },

    deleteOffre : function (id_offre,id_poste, callback) {
        // Il faut d'abord faire une select pour récupérer l'id de la description.
        // Ensuite on supprime la description, puis le poste, puis l'offre.
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                console.log("Fonction : deleteOffre : Erreur lors de la récupération de l'id de la description");
                throw err;
            } else if (results.length == 0) {
                console.log("Fonction : deleteOffre : Aucun id de description trouvé");
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("DELETE FROM Description WHERE numero = ?;", [id_description], function (err, results) {
                    if (err) {
                        console.log("Fonction : deleteOffre : Erreur lors de la suppression de la description");
                        throw err;
                    } else if (results.length == 0) {
                        console.log("Fonction : deleteOffre : Aucune description trouvée");
                        callback(null);
                    } else {
                        db.query("DELETE FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
                            if (err) {
                                console.log("Fonction : deleteOffre : Erreur lors de la suppression du poste");
                                throw err;
                            } else if (results.length == 0) {
                                console.log("Fonction : deleteOffre : Aucun poste trouvé");
                                callback(null);
                            } else {
                                db.query("DELETE FROM Offre_d_emploi WHERE id = ?;", [id_offre], function (err, results) {
                                    if (err) {
                                        console.log("Fonction : deleteOffre : Erreur lors de la suppression de l'offre");
                                        throw err;
                                    } else if (results.length == 0) {
                                        console.log("Fonction : deleteOffre : Aucune offre trouvée");
                                        callback(null);
                                    } else {
                                        console.log("Fonction : deleteOffre : Offre supprimée");
                                        callback(results);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}