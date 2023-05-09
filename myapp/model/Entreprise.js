var db = require('./ConnexionBDD.js');

module.exports = {
    readTypeOrganisation: function( callback) {
        db.query("SELECT * FROM Type_organisation ", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    
    createTypeOrganisation: function(type_organisation,description, callback) {
        sql = "INSERT INTO Type_organisation VALUES (\"" + type_organisation + "\", \"" + description + "\")"
        console.log(sql);
        db.query(sql, function(err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    },

    read: function(siren, callback) {
        db.query(" SELECT * FROM Organisation WHERE siren= ?", siren, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function(callback) {
        db.query("SELECT * FROM Organisation; ", function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    createTypeOrganisation: function(type_organisation,description, callback) {
        sql = "INSERT INTO Type_organisation VALUES (\"" + type_organisation + "\", \"" + description + "\")"
        console.log(sql);
        db.query(sql, function(err, results) {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    },

    create: function(siren, nom, siege_social_lat, siege_social_long, type_organisation, callback) {
        sql = "INSERT INTO Organisation VALUES (" + siren + ", \"" + nom + "\", " + siege_social_lat + ", " + siege_social_long + ", \"" + type_organisation + "\" )"
        console.log(sql);
        db.query(sql, function(err, results) {
            if (err) throw err;
            console.log(results);
            // TODO : Add comment to know if the entreprise is created or not
            callback(results);
        });
    },

    addUser : function (siren,email, callback){
        var date = new Date();
        var date_creation = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        sql = "INSERT INTO Formulaire VALUES (\"EN COURS\", \"" + date_creation + "\" , \"REJOINDRE\", \"" + email + "\", \"" + siren + "\")"
        console.log(sql);
        db.query(sql, function(err, results) {
            if(err) throw err;
            console.log(results);
            callback(results);
        });
    }
}