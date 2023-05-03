// Créer un fichier par table de la base de données

var db = require('./ConnexionBDD.js');

function getLatLngFromAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            callback(lat, lng);
        } else {
            console.log('Erreur : ' + status);
        }
    });
}

module.exports = {
    read: function(email, callback) {
        db.query("SELECT * FROM Utilisateur WHERE email= ?", email, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function(callback) {
        db.query("SELECT * FROM Utilisateur", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, callback) {
        var ladate = new Date();
        var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
        var lat = latitude;
        var lng = longitude;
        sql = "INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur) VALUES (";
        sql += "\"" + email + "\", ";
        sql += "\"" + password + "\", ";
        sql += "\"" + nom + "\", ";
        sql += "\"" + prenom + "\", ";
        sql += "\"" + ddn + "\", ";
        sql += "\"" + date_creation + "\", ";
        sql += "true, ";
        sql += "\"" + tel + "\", ";
        sql += lat + ", ";
        sql += lng + ", ";
        sql += "\"" + sexe + "\", ";
        sql += "\"CANDIDAT\");";
    
        rows = db.query(sql, function(err, results) {
            if (err) {
                console.log("Erreur : " + err.message);
                callback(false);
            } else {
                console.log("Utilisateur créé avec succès.");
                callback(true);
            }
        });
    },

    
    /// Liste des fonctions utilisées dans le code ci-dessus

    // Test que le mail soit valide
    TEST_MAIL : function(email_a_tester, callback) {
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

    // Test que le mot de passe soit valide
    TEST_MDP: function(mdp1, callback) {
        // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
        var correct_password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
        callback(correct_password_test.test(mdp1));
    },

    // Test que le numéro de téléphone soit valide
    TEST_TEL : function(num_tel, callback) {
        // Vérification du numéro de téléphone 
        // Format : 
        // - Commence par un + (optionnel) suivi de 1 à 3 chiffres (indicatif pays)
        // - 0 ou 1 espace (optionnel)
        // - 9 chiffres
        var correct_tel_test = /^(\+\d{1,3})? ?\d{9}$/;
        callback(correct_tel_test.test(num_tel));
    },

    // Test que la latitude et la longitude soient valides
    TEST_LATITUDE : function(latitude, callback) {
        // Vérification de la latitude
        // Format : 
        // - Un nombre décimal compris entre -90 et 90
        var correct_latitude_test = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        callback(correct_latitude_test.test(latitude));
    },

    TEST_LONGITUDE : function(longitude, callback) {
        // Vérification de la longitude
        // Format : 
        // - Un nombre décimal compris entre -180 et 180
        var correct_longitude_test = /^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
        callback(correct_longitude_test.test(longitude));
    },

    TEST_COORDONNEES : function(latitude, longitude, callback) {
        callback(this.TEST_LATITUDE(latitude) && this.TEST_LONGITUDE(longitude));
    },

    // Test que la date de naissance soit valide
    TEST_DATE_NAISSANCE : function(date_naissance, callback) {
        // Vérification de la date de naissance 
        // Format : 
        // - AAAA-MM-JJ où AAAA est l'année (4 chiffres), MM est le mois (de 01 à 12) et JJ est le jour (de 01 à 31)
        var correct_date_test = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/;

        // Vérification de la date passée et d'au plus de 1900 ans
        var current_year = new Date().getFullYear();
        var date_naissance_year = parseInt(date_naissance.substring(0, 4));
        if (date_naissance_year >= current_year - 1900) {
            callback(false); // La date de naissance est supérieure à 1900 ans.
        }

        var date_naissance_match = date_naissance.match(correct_date_test);
        if (date_naissance_match == null) {
            callback(false); // Le format de la date est incorrect.
        }

        var date_naissance_object = new Date(date_naissance_match[0]);
        if (date_naissance_object >= new Date()) {
            callback(false); // La date de naissance est dans le futur.
        }

        callback(true);
    },
}