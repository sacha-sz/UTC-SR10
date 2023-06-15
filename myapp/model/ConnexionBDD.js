var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p045",
    password: "gpO9BP4dhTey",
    database: "sr10p045"
});

module.exports = pool;