var db = require('./ConnexionBDD.js');

module.exports = {

    /// SELECT ///

    readDescriptionById: function (id, callback) {
        db.query("SELECT * FROM Description WHERE id = ?;", [id], function (err, results) {
            if (err) {
                throw err;
            } else {
                callback(results[0]);
            }
        });
    },
    readAllTypeMetier: function (callback) {
        db.query("SELECT * FROM Type_metier; ", function (err, results) {
            if (err) {
                throw err;
            } else {
                callback(results);
            }
        });
    },

    readAllStatut: function (callback) {
        db.query("SELECT * FROM Statut_poste; ", function (err, results) {
            if (err) {
                throw err;
            } else {
                callback(results);
            }
        });
    },
    readSIRENUser: function (user, callback) {
        db.query("SELECT siren_orga FROM `Formulaire` WHERE email_utilisateur=?", [user], function (err, results) {
            if (err) {
                throw err;
            } else {
                callback(results[0]);
            }
        });
    },

    /// INSERT ///

    create: function (intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier, email, siren, missions, activites, competences, callback) {
        db.query("INSERT INTO Description (missions, activites, competences_attendues) VALUES (?,?,?)", [missions, activites, competences], function (err, results) {
            if (err) {
                throw err;
            }

            if (results.length == 0) {
                callback(null);
                return;
            }

            // Récupérer l'ID auto-incrémenté
            var descriptionID = results.insertId;

            db.query("INSERT INTO Fiche_poste (intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier, email_inscription, id_description, FP_SIREN) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [intitule, responsable, lat, long, rythme, salaire_min, salaire_max, statut, typemetier, email, descriptionID, siren], function (err, results) {
                if (err) {
                    throw err;
                } else if (results.length == 0) {
                    callback(null);
                } else {
                    callback(results);
                }
            });
        });
    },

    createStatut: function (statut, description, callback) {
        db.query("INSERT INTO Statut VALUES (?,?);", [statut, description], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },
    createTM: function (type, description, callback) {
        db.query("INSERT INTO Type_metier VALUES (?,?);", [type, description], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    /// UPDATE ///

    updateIntitule : function (id, intitule, callback) {
        db.query("UPDATE Fiche_poste SET intitule = ? WHERE numero = ?;", [intitule, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateResponsable : function (id, responsable, callback) {
        db.query("UPDATE Fiche_poste SET responsable_hierarchique = ? WHERE numero = ?;", [responsable, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },
    updateLatitude : function (id, latitude, callback) {
        db.query("UPDATE Fiche_poste SET lieu_mission_lat = ? WHERE numero = ?;", [latitude, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateLongitude : function (id, longitude, callback) {
        db.query("UPDATE Fiche_poste SET lieu_mission_long = ? WHERE numero = ?;", [longitude, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateRythme : function (id, rythme, callback) {
        db.query("UPDATE Fiche_poste SET rythme = ? WHERE numero = ?;", [rythme, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateSalaireMax : function (id, salaire_max, callback) {
        db.query("UPDATE Fiche_poste SET salaire_max = ? WHERE numero = ?;", [salaire_max, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateSalaireMin : function (id, salaire_min, callback) {
        db.query("UPDATE Fiche_poste SET salaire_min = ? WHERE numero = ?;", [salaire_min, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },
    updateStatut : function (id, statut, callback) {
        db.query("UPDATE Fiche_poste SET statut_poste = ? WHERE numero = ?;", [statut, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateTypeMetier : function (id, type_metier, callback) {
        db.query("UPDATE Fiche_poste SET type_metier = ? WHERE numero = ?;", [type_metier, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateMission : function (id_poste, missions,  callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET missions = ? WHERE numero   = ?;", [missions, id_description], function (err, results) {
                    if (err) {
                        throw err;
                    } else if (results.length == 0) {
                        callback(null);
                    } else {
                        callback(results);
                    }
                });
            }
        });
    },

    updateActivite : function (id_poste, activites,  callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET activites = ? WHERE numero = ?;", [activites, id_description], function (err, results) {
                    if (err) {
                        throw err;
                    } else if (results.length == 0) {
                        callback(null);
                    } else {
                        callback(results);
                    }
                });
            }
        });
    },
    
    updateCompetence : function(id_poste, competences, callback){
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("UPDATE Description SET competences_attendues = ? WHERE numero = ?;", [competences, id_description], function (err, results) {
                    if (err) {
                        throw err;
                    } else if (results.length == 0) {
                        callback(null);
                    } else {
                        callback(results);
                    }
                });
            }
        });
    },

    updateEtat : function (id, etat, callback) {
        db.query("UPDATE Offre_d_emploi SET etat = ? WHERE id = ?;", [etat, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updateDate : function (id, date, callback) {
        db.query("UPDATE Offre_d_emploi SET date_validite = ? WHERE id = ?;", [date, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    updatePJ : function (id, pj, callback) {
        db.query("UPDATE Offre_d_emploi SET indication_piece_jointes = ? WHERE id = ?;", [pj, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    }, 

    updateEtat : function (id, poste, callback) {
        db.query("UPDATE Offre_d_emploi SET etat = ? WHERE id = ?;", [poste, id], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                callback(results);
            }
        });
    },

    /// DELETE ///

    deleteOffre : function (id_offre,id_poste, callback) {
        // Il faut d'abord faire une select pour récupérer l'id de la description.
        // Ensuite on supprime la description, puis le poste, puis l'offre.
        db.query("SELECT id_description FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
            if (err) {
                throw err;
            } else if (results.length == 0) {
                callback(null);
            } else {
                var id_description = results[0].id_description;
                db.query("DELETE FROM Description WHERE numero = ?;", [id_description], function (err, results) {
                    if (err) {
                        throw err;
                    } else if (results.length == 0) {
                        callback(null);
                    } else {
                        db.query("DELETE FROM Fiche_poste WHERE numero = ?;", [id_poste], function (err, results) {
                            if (err) {
                                throw err;
                            } else if (results.length == 0) {
                                callback(null);
                            } else {
                                db.query("DELETE FROM Offre_d_emploi WHERE id = ?;", [id_offre], function (err, results) {
                                    if (err) {
                                        throw err;
                                    } else if (results.length == 0) {
                                        callback(null);
                                    } else {
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