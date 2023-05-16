const DB = require("../model/ConnexionBDD.js");
const ModelLogin = require("../model/Login.js");

beforeAll(() => {
    // des instructions à exécuter avant le lancement de cette suite de tests
    });

afterAll((done) => {
  function callback(err) {
    if (err) done(err);
    else done();
  }
  DB.end(callback); // Ferme la connexion à la base de données après les tests
});

describe("ModelLogin Tests", () => {
    // test("read user", (done) => {
    //     ModelLogin.read("julie@gmail.com", function (resultat) {
    //       expect(resultat[0].type_utilisateur).toBe("RECRUTEUR");
    //       done();
    //     });
    //   });
});