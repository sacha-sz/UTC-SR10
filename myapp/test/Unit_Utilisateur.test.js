const db = require("../model/ConnexionBDD.js");
const ModelUtilisateur = require("../model/Utilisateur.js");

beforeAll((done) => {
  const email = "test_delete@example.com";
  const password = "Password123!";
  const nom = "Nom_delete";
  const prenom = "Prenom_delete";
  const tel = "0616745678";
  const sexe = "FEMME";
  const ddn = "1995-01-01";
  const latitude = 48.8934;
  const longitude = 2.2778;

  ModelUtilisateur.create(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (result) {
    done();
  });
});

afterAll((done) => {
  function callback(err) {
    ModelUtilisateur.delete("test_delete@example.com", function (resultat) {
      done();
    });
  }
  db.end(callback);
});

describe("ModelUtilisateur Tests", () => {
  test("read user", (done) => {
    ModelUtilisateur.read("test_delete@example.com", function (err, resultat) {
      expect(resultat[0].prenom).toBe("Prenom_delete");
      expect(resultat[0].nom).toBe("Nom_delete");
      expect(resultat[0].statut).toBe(1);
      expect(resultat[0].telephone).toBe("0616745678");
      expect(resultat[0].adresse_utilisateur_lat).toBeCloseTo(48.8934);
      expect(resultat[0].adresse_utilisateur_long).toBeCloseTo(2.2778);
      expect(resultat[0].sexe).toBe("FEMME");
      expect(resultat[0].type_utilisateur).toBe("CANDIDAT");
      console.log("read user OK");
      done();
    });
  });

  test("read user with error", (done) => {
    const email = "test_error@example.com";

    function cbRead(err, resultat) {
      expect(err).toBeTruthy();
      expect(resultat).toBeNull();
      done();
    }

    jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
      const error = new Error("Erreur de la requête read");
      callback(error, null);
    });

    ModelUtilisateur.read(email, cbRead);
    db.query.mockRestore();
  });

  test("getNomPrenomTelSexe with error", (done) => {
    const email = "test_error@example.com";

    function cbGet(err, resultat) {
      expect(err).toBeTruthy();
      expect(resultat).toBeNull();
      done();
    }

    jest.spyOn(db, "query").mockImplementationOnce((query, values, callback) => {
      const error = new Error("Erreur de la requête getNomPrenomTelSexe");
      callback(error, null);
    });

    ModelUtilisateur.getNomPrenomTelSexe(email, cbGet);
    db.query.mockRestore();
  });

  test("readall user with error", (done) => {
    function cbRead(err, resultat) {
      expect(err).toBeTruthy();
      expect(resultat).toBeNull();
      done();
    }

    jest.spyOn(db, "query").mockImplementationOnce((query, callback) => {
      const error = new Error("Erreur de la requête readall");
      callback(error, null);
    });

    ModelUtilisateur.readall(cbRead);
    db.query.mockRestore();
  });

  test("readall with empty table", () => {

    function testCallback(err, results) {
      expect(err).toBeNull();
      expect(results).toEqual([]);
    }

    jest.spyOn(db, 'query').mockImplementationOnce((query, callback) => {
      callback(null, []);
    });

    ModelUtilisateur.readall(testCallback);
    db.query.mockRestore();
  });

  test("getNomPrenomTelSexe", (done) => {
    ModelUtilisateur.getNomPrenomTelSexe("test_delete@example.com", function (err, resultat) {
      expect(resultat[0].prenom).toBe("Prenom_delete");
      expect(resultat[0].nom).toBe("Nom_delete");
      expect(resultat[0].telephone).toBe("0616745678");
      expect(resultat[0].sexe).toBe("FEMME");
      done();
    });
  });

  test("getInfos - success", (done) => {
    const email = "test_delete@example.com";
  
    ModelUtilisateur.getInfos(email, function (err, results) {
      expect(err).toBeNull();
      expect(results).not.toBeNull();
      expect(results.length).toBeGreaterThan(0);
      
      const userInfo = results[0];
      expect(userInfo.nom).toBe("Nom_delete");
      expect(userInfo.prenom).toBe("Prenom_delete");
      expect(userInfo.telephone).toBe("0616745678");
      expect(userInfo.type_utilisateur).toBe("CANDIDAT");
  
      done();
    });
  });

  test("readall", (done) => {
    ModelUtilisateur.readall(function (err, resultat) {
      for (var i = 0; i < resultat.length; i++) {
        if (resultat[i].email == "test_delete@example.com") {
          expect(resultat[i].prenom).toBe("Prenom_delete");
          expect(resultat[i].nom).toBe("Nom_delete");
          expect(resultat[i].statut).toBe(1);
          expect(resultat[i].telephone).toBe("0616745678");
          expect(resultat[i].adresse_utilisateur_lat).toBe(48.8934);
          expect(resultat[i].adresse_utilisateur_long).toBe(2.2778);
          expect(resultat[i].sexe).toBe("FEMME");
          expect(resultat[i].type_utilisateur).toBe("CANDIDAT");
        }
      }
      done();
    });
  });

  test("create user - success", (done) => {
    const email = "test_create_user@example.com";
    const password = "Password123!";
    const nom = "Nom_test_create_user";
    const prenom = "Prenom_test_create_user";
    const tel = "0612345678";
    const sexe = "HOMME";
    const ddn = "1990-01-01";
    const latitude = 48.1234;
    const longitude = 2.5678;

    ModelUtilisateur.create(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (err, result) {
    });
    ModelUtilisateur.read("test_create_user@example.com", function (err, resultat) {
      expect(resultat[0].prenom).toBe("Prenom_test_create_user");
      expect(resultat[0].nom).toBe("Nom_test_create_user");
      expect(resultat[0].telephone).toBe("0612345678");
      expect(resultat[0].adresse_utilisateur_lat).toBe(48.1234);
      expect(resultat[0].adresse_utilisateur_long).toBe(2.5678);
      expect(resultat[0].sexe).toBe("HOMME");
      done();
    });
  });


  test("DELETE_USER with error", (done) => {
    const email = "test_error@example.com";
  
    function cbDelete(err, resultat) {
      expect(err).toBeTruthy();
      expect(resultat).toBeNull();
      done();
    }
  
    jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
      const error = new Error("Erreur de la requête delete");
      callback(error, null);
    });
  
    ModelUtilisateur.delete(email, cbDelete);
    db.query.mockRestore();
  });
  
  
  test("updateNom - success", (done) => {
    const email = "test_delete@example.com";
    const newNom = "updateNom_test_delete";
    ModelUtilisateur.updateNom(email, newNom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updatePrenom - success", (done) => {
    const email = "test_delete@example.com";
    const newPrenom = "updatePrenom_test_delete";
    ModelUtilisateur.updatePrenom(email, newPrenom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updateSexe - success", (done) => {
    const email = "test_delete@example.com";
    const newSexe = "HOMME";
    ModelUtilisateur.updateSexe(email, newSexe, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updateNom - success and error", (done) => {
    const email = "test_delete@example.com";
    const newNom = "updateNom_test_delete";
  
    // Test success case
    ModelUtilisateur.updateNom(email, newNom, function (err, result) {
      expect(err).toBeNull();
      expect(result).toBe(true);
  
      // Test error case
      jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
        const error = new Error("Erreur de la requête updateNom");
        callback(error, null);
      });
  
      ModelUtilisateur.updateNom(email, newNom, function (err, result) {
        expect(err).toBeTruthy();
        expect(result).toBe(false);
        db.query.mockRestore();
        done();
      });
    });
  });
  
  test("updatePrenom - success and error", (done) => {
    const email = "test_delete@example.com";
    const newPrenom = "updatePrenom_test_delete";
  
    // Test success case
    ModelUtilisateur.updatePrenom(email, newPrenom, function (err, result) {
      expect(err).toBeNull();
      expect(result).toBe(true);
  
      // Test error case
      jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
        const error = new Error("Erreur de la requête updatePrenom");
        callback(error, null);
      });
  
      ModelUtilisateur.updatePrenom(email, newPrenom, function (err, result) {
        expect(err).toBeTruthy();
        expect(result).toBe(false);
        db.query.mockRestore();
        done();
      });
    });
  });

  test("updateSexe - success and error", (done) => {
    const email = "test_delete@example.com";
    const newSexe = "HOMME";
  
    // Test success case
    ModelUtilisateur.updateSexe(email, newSexe, function (err, result) {
      expect(err).toBeNull();
      expect(result).toBe(true);
  
      // Test error case
      jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
        const error = new Error("Erreur de la requête updateSexe");
        callback(error, null);
      });
  
      ModelUtilisateur.updateSexe(email, newSexe, function (err, result) {
        expect(err).toBeTruthy();
        expect(result).toBe(false);
        db.query.mockRestore();
        done();
      });
    });
  });

  
  test("getInfos - success and error", (done) => {
    const email = "test_delete@example.com";
  
    // Test success case
    ModelUtilisateur.getInfos(email, function (err, results) {
      expect(err).toBeNull();
      expect(results).not.toBeNull();
      // Add your assertions for the successful result here
  
      // Test error case
      jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
        const error = new Error("Erreur de la requête getInfos");
        callback(error, null);
      });
  
      ModelUtilisateur.getInfos(email, function (err, results) {
        expect(err).toBeTruthy();
        expect(results).toBeNull();
        db.query.mockRestore();
        done();
      });
    });
  });

  
  
  
  test("getLatLong - success", (done) => {
    const email = "test@example.com";
  
    function cbGetLatLong(err, resultat) {
      expect(err).toBeNull();
      expect(resultat).toEqual([{ adresse_utilisateur_lat: 48.8934,  adresse_utilisateur_long: 2.2778 }]);
      done();
    }
  
    jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
      const results = [{ adresse_utilisateur_lat: 48.8934, adresse_utilisateur_long: 2.2778 }];
      callback(null, results);
    });
  
    ModelUtilisateur.getLatLong(email, cbGetLatLong);
    db.query.mockRestore();
  });
  
  test("getLatLong - error", (done) => {
    const email = "test@example.com";
  
    function cbGetLatLong(err, resultat) {
      expect(err).toBeTruthy();
      expect(resultat).toBeNull();
      done();
    }
  
    jest.spyOn(db, "query").mockImplementation((query, values, callback) => {
      const error = new Error("Erreur de la requête getLatLong");
      callback(error, null);
    });
  
    ModelUtilisateur.getLatLong(email, cbGetLatLong);
    db.query.mockRestore();
  });

  test("TEST_COORDONNEES - OK", (done) => {
    const longitude = 2.5678;
    const latitude = 48.1234;
    ModelUtilisateur.TEST_COORDONNEES(latitude, longitude, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("DELETE_USER", (done) => {
    ModelUtilisateur.delete("test_delete@example.com", function (err, resultat) {
      ModelUtilisateur.read("test_delete@example.com", function (err, resultat) {
        expect(resultat).toEqual([]);
        done();
      });
    });
  });

  test("TEST_MDP - valid password", (done) => {
    const password = "ValidPassword123!";
    ModelUtilisateur.TEST_MDP(password, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_MDP - invalid password", (done) => {
    const password = "invalidpassword";

    ModelUtilisateur.TEST_MDP(password, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_TEL - valid phone number +33", (done) => {
    const phoneNumber = "+33612345678";
    ModelUtilisateur.TEST_TEL(phoneNumber, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_TEL - valid phone number 07", (done) => {
    const phoneNumber = "0712345678";
    ModelUtilisateur.TEST_TEL(phoneNumber, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_TEL - invalid phone number", (done) => {
    const phoneNumber = "invalidPhoneNumber";

    ModelUtilisateur.TEST_TEL(phoneNumber, function (result) {
      expect(result).toBe(false);
      done();
    });
  });
  test("TEST_TEL - invalid phone number 2", (done) => {
    const phoneNumber = "123456";

    ModelUtilisateur.TEST_TEL(phoneNumber, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_TEL - invalid phone number 3", (done) => {
    const phoneNumber = "5365123456";

    ModelUtilisateur.TEST_TEL(phoneNumber, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_LATITUDE - valid coordinates", (done) => {
    const latitude = 48.1234;
    ModelUtilisateur.TEST_LATITUDE(latitude, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_LATITUDE - invalid coordinates", (done) => {
    const latitude = "invalidLatitude";
    ModelUtilisateur.TEST_LATITUDE(latitude, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_LONGITUDE - valid coordinates", (done) => {
    const longitude = 2.5678;

    ModelUtilisateur.TEST_LONGITUDE(longitude, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_LONGITUDE - invalid coordinates", (done) => {
    const longitude = "invalidLongitude";

    ModelUtilisateur.TEST_LONGITUDE(longitude, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_DATE_NAISSANCE - valid date", (done) => {
    const dateNaissance = "1990-01-01";
    ModelUtilisateur.TEST_DATE_NAISSANCE(dateNaissance, function (result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("TEST_DATE_NAISSANCE - invalid date 1800", (done) => {
    const dateNaissance = "1800-01-01";
    ModelUtilisateur.TEST_DATE_NAISSANCE(dateNaissance, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_DATE_NAISSANCE - invalid date 2025", (done) => {
    const dateNaissance = "2025-01-01";
    ModelUtilisateur.TEST_DATE_NAISSANCE(dateNaissance, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_DATE_NAISSANCE - invalid date", (done) => {
    const dateNaissance = "invalidDate";

    ModelUtilisateur.TEST_DATE_NAISSANCE(dateNaissance, function (result) {
      expect(result).toBe(false);
      done();
    });
  });

  test("TEST_MAIL_TRUE", (done) => {
    ModelUtilisateur.TEST_MAIL("test_delete@example.com", function (resultat) {
      expect(resultat).toBe(true);
      done();
    });
  });

  test("TEST_MAIL_FALSE", (done) => {
    ModelUtilisateur.TEST_MAIL("test_delete--example.com", function (resultat) {
      expect(resultat).toBe(false);
      done();
    });
  });
});
