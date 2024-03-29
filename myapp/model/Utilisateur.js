var db = require('./ConnexionBDD.js');
var pass = require('./Pass.js');

module.exports = {

    /// SELECT

    read: function (email, callback) {
        db.query("SELECT * FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    readall: function (callback) {
        db.query("SELECT * FROM Utilisateur;", function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getNomPrenomTelSexe: function (email, callback) {
        db.query("SELECT nom, prenom, telephone, sexe FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getInfos: function (email, callback) {
        db.query("SELECT nom, prenom, telephone, type_utilisateur  FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getLatLong: function (email, callback) {
        db.query("SELECT adresse_utilisateur_lat, adresse_utilisateur_long FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },



    /// INSERT

    create: function (email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, callback) {
        var ladate = new Date();
        var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
        var lat = latitude;
        var lng = longitude;
        pass.generateHash(password, function (hash) {
            rows = db.query("INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur) \
            VALUES(?, ?, ?, ?, ?, ?, true, ?, ?, ?, ?, 'CANDIDAT');", [email, hash, nom, prenom, ddn, date_creation, tel, lat, lng, sexe], function (err, results) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(err, true);
                }
            });
        });
    },

    
    /// UPDATE

    updateNom: function (email, new_nom, callback) {
        rows = db.query("UPDATE Utilisateur SET nom = ? WHERE email =?", [new_nom, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    updatePrenom: function (email, new_prenom, callback) {
        rows = db.query("UPDATE Utilisateur SET prenom = ? WHERE email = ?", [new_prenom, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    updateSexe: function (email, new_sexe, callback) {
        rows = db.query("UPDATE Utilisateur SET sexe = ?  WHERE email = ?", [new_sexe, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        }
        )
    },


    /// DELETE

    delete: function (email, callback) {
        db.query("DELETE FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Utilisateur supprimé avec succès");
            } 
        });
    },


    /// TESTS

    TEST_MAIL: function (email_a_tester, callback) {
        // Vérification de l'adresse e-mail 
        // Format :
        //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
        //  - @
        //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
        //  - .
        //  - 2 ou 3 caractères alphanumériques

        var correct_email_test = /^([a-zA-Z0-9_\.\-+]+)@([a-zA-Z0-9_\.\-+]+)\.([a-zA-Z]{2,3})$/;
        callback(correct_email_test.test(email_a_tester));
    },

    TEST_MDP: function (mdp1, callback) {
        // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
        var correct_password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
        callback(correct_password_test.test(mdp1));
    },

    TEST_TEL: function (num_tel, callback) {
        // Vérification du numéro de téléphone 
        // Format : 
        // - Commence par un + (optionnel) suivi de 1 à 3 chiffres (indicatif pays)
        // - 0 ou 1 espace (optionnel)
        // - 9 chiffres
        var correct_tel_test = /(0|\+33)[1-9]( *[0-9]{2}){4}/;
        callback(correct_tel_test.test(num_tel));
    },

    TEST_LATITUDE: function (latitude, callback) {
        // Vérification de la latitude
        // Format : 
        // - Un nombre décimal compris entre -90 et 90
        var correct_latitude_test = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        callback(correct_latitude_test.test(latitude));
    },

    TEST_LONGITUDE: function (longitude, callback) {
        // Vérification de la longitude
        // Format : 
        // - Un nombre décimal compris entre -180 et 180
        var correct_longitude_test = /^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
        callback(correct_longitude_test.test(longitude));
    },

    TEST_COORDONNEES: function (latitude, longitude, callback) {
        var self = this;
        this.TEST_LATITUDE(latitude, function (latitudeResult) {
            self.TEST_LONGITUDE(longitude, function (longitudeResult) {
                callback(latitudeResult && longitudeResult);
            });
        });
    },

    TEST_DATE_NAISSANCE: function (date_naissance, callback) {
        // Vérification du format de la date de naissance
        var correct_date_test = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/;

        var date_naissance_match = date_naissance.match(correct_date_test);
        if (date_naissance_match === null) {
            callback(false); // Le format de la date est incorrect.
            return;
        }

        // Vérification de la date de naissance
        var date_naissance_year = parseInt(date_naissance_match[1]);
        var current_year = (new Date()).getFullYear();
        var min_year = current_year - 100;

        if (date_naissance_year < min_year) {
            callback(false); // La date de naissance est supérieure à 1900 ans.
            return;
        }

        // Vérification de la date de naissance dans le futur
        var date_naissance_object = new Date(date_naissance_match[0]);
        if (date_naissance_object > new Date()) {
            callback(false); // La date de naissance est dans le futur.
            return;
        }

        callback(true); // La date de naissance est valide.
    },
}

