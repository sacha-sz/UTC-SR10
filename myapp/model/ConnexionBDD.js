// importe le module mysql dans le fichier JavaScript.
var mysql = require("mysql");

// L'objet pool est utilisé pour gérer les connexions à la base de données. 
var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p045",
    password: "gpO9BP4dhTey",
    database: "sr10p045"
});


// Enfin, le code exporte l 'objet pool en utilisant module.exports = pool;. 
// Cela permet à d'autres fichiers JavaScript de se connecter à la base de 
// données en important ce fichier et en utilisant la variable pool.
module.exports = pool;