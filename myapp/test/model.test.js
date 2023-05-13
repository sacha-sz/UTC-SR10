const DB = require("../model/ConnexionBDD.js");
const model = require("../model/Utilisateur.js");
describe("Model Tests", () => {
    test("read user", (done) => {
        model.read("test@test.fr", function (resultat) {
            nom = resultat[0].nom;
            expect(nom).toBe("test");
        })
        function callback(err) {
            if (err) done(err);
            else done();
        }
        DB.end(callback);
    }
    );
})