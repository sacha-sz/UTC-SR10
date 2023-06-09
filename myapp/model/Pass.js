const bcrypt = require("bcrypt")

module.exports = {
    generateHash: function (plaintextPassword, callback) {
        bcrypt.hash(plaintextPassword, 10, function (err, hash) {
            // call the function that Store hash in the database
            callback(hash);
        });
    },

    comparePassword: function (plaintextPassword, hash, callback) {
        bcrypt.compare(plaintextPassword, hash, function (err, result) {
            if (result)
                // password is valid
                callback(true);
            else callback(false);
        });
    },
};
