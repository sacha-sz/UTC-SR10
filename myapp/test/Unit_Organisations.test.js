const DB = require("../model/ConnexionBDD.js");
const ModelOrganisations = require("../model/Organisations.js");

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

describe("ModelOrganisations Tests", () => {
    // test("read user", (done) => {
    //     ModelOrganisations.read("julie@gmail.com", function (resultat) {
    //       expect(resultat[0].type_utilisateur).toBe("RECRUTEUR");
    //       done();
    //     });
    //   });
});