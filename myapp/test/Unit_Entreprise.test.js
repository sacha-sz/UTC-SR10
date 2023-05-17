const DB = require("../model/ConnexionBDD.js");
const ModelEntreprise = require("../model/Entreprise.js");

beforeAll(() => {
  // des instructions à exécuter avant le lancement de cette suite de tests
  ModelEntreprise.createTypeOrganisation("TestDelete", "DescriptionTestDelete", function (resultat) {});
});

afterAll((done) => {
  ModelEntreprise.delete("095797458", function (resultat) {});
  function callback(err) {
    
    if (err) done(err);
    else done();
  }
  DB.end(callback); // Ferme la connexion à la base de données après les tests
});

describe("ModelEntreprise Tests", () => {
  test("Read Type Organisation2", (done) => {
    ModelEntreprise.readTypeOrganisation(function (resultat) {
      expect(resultat.length).toBeGreaterThan(0);
      done();
    });
  });

    test("Read Type Organisation", (done) => {
        ModelEntreprise.readTypeOrganisation(function (resultat) {
          expect(resultat.length).toBeGreaterThan(25);
          done();
        });
      });


      // test("Create Type Organisation", (done) => {
      //   const type_organisation = "Test";
      //   const description = "DescriptionTest";
      //   ModelEntreprise.createTypeOrganisation(type_organisation, description, function (resultat) {
      //   });
      //   ModelEntreprise.readTypeOrganisation(function(result){
      //     for(var i = 0; i < result.length; i++) {
      //       if(result[i].nom == type_organisation){
      //         expect(result[i].description).toBe(description);
      //         done();
      //       }
      //   }})
      // });

      test("DELETE Type Organisation",(done) => {
        const type_organisation = "TestDelete";
        ModelEntreprise.deleteTypeOrganisation(type_organisation, function (resultat) {
          expect(resultat).toBeDefined();
          done();
        });
      });


      
      test("Read Organisation", (done) => {
        const siren = "1111111111";
        ModelEntreprise.read(siren, function (resultat) {
          expect(resultat[0].nom).toBe("Entreprise 20");
          expect(resultat[0].siege_social_lat).toBe(37.7749);
          expect(resultat[0].siege_social_long).toBe(-122.419);
          expect(resultat[0].type_organisation).toBe("SAS");
          done();
        });
      });

      
      test("Read All Organisations", (done) => {
        ModelEntreprise.readall(function (resultat) {
          for(var i = 0; i < resultat.length; i++) {
            if(resultat[i].nom == "Entreprise 20"){
              expect(resultat[i].siege_social_lat).toBe(37.7749);
              expect(resultat[i].siege_social_long).toBe(-122.419);
              expect(resultat[i].type_organisation).toBe("SAS");
            }
        }
        done();
        });
      });

      
      test("Create Organisation", (done) => {
        const siren = "095797458";
        const nom = "Entreprise1";
        const siege_social_lat = 123.456;
        const siege_social_long = 789.012;
        const type_organisation = "Type1";
        ModelEntreprise.create(siren, nom, siege_social_lat, siege_social_long, type_organisation, function (resultat) {
          expect(resultat).toBeDefined();
          done();
        });
      });

      // test("Add User", (done) => {
      //   const siren = "123456789";
      //   const email = "test@example.com";
      //   ModelEntreprise.addUser(siren, email, function (resultat) {
      //     expect(resultat).toBeDefined();
      //     done();
      //   });
      // });

      

});