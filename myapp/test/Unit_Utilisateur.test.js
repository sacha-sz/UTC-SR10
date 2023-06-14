const DB = require("../model/ConnexionBDD.js");
const ModelUtilisateur = require("../model/Utilisateur.js");
const express = require("express");

beforeAll(() => {
  const email = "test_delete@example.com";
  const password = "Password123!";
  const nom = "Nom_delete";
  const prenom = "Prenom_delete";
  const tel = "0616745678";
  const sexe = "FEMME";
  const ddn = "1995-01-01";
  const latitude = 48.8934;
  const longitude = 2;

  ModelUtilisateur.create(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, function (result) {
  });
});

afterAll((done) => {
  function callback(err) {
    ModelUtilisateur.delete("test_delete@example.com", function (resultat) {
    });
    if (err) done(err);
    else done();
  }
  DB.end(callback);
});



describe("ModelUtilisateur Tests", () => {
  test("read user", (done) => {
    ModelUtilisateur.read("test_delete@example.com", function (err, resultat) {
      expect(resultat[0].prenom).toBe("Prenom_delete");
      expect(resultat[0].nom).toBe("Nom_delete");
      expect(resultat[0].statut).toBe(1);
      expect(resultat[0].telephone).toBe("0616745678");
      expect(resultat[0].adresse_utilisateur_lat).toBe(48.8934);
      expect(resultat[0].adresse_utilisateur_long).toBe(2.2778);
      expect(resultat[0].sexe).toBe("FEMME");
      expect(resultat[0].type_utilisateur).toBe("CANDIDAT");
      done();
    });
  });

  test("read user if erreur", () => {
    function cbRead(err, resultat) {
      expect(() => {
        if (err) throw err;
      }).toThrow("Aucun utilisateur avec cet email");
    }
    ModelUtilisateur.read("test_delete@example.com", cbRead);
  });

  test("read user with error", () => {
    const fakeError = new Error("Erreur de requête");

    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }


    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.read("test_delete@example.com", testCallback);

    expect(DB.query).toHaveBeenCalledWith('SELECT * FROM Utilisateur WHERE email = "test_delete@example.com"', expect.any(Function));

    DB.query.mockRestore();
  });


  test("readall user with error", () => {
    const fakeError = new Error("Erreur de requête");

    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }

    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.readall(testCallback);

    expect(DB.query).toHaveBeenCalledWith('SELECT * FROM Utilisateur', expect.any(Function));

    DB.query.mockRestore();
  });

  test("getNomPrenomTelSexe with error", () => {
    const fakeError = new Error("Erreur de requête");

    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }

    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.getNomPrenomTelSexe("test_delete@example.com", testCallback);

    expect(DB.query).toHaveBeenCalledWith('SELECT nom, prenom, telephone, sexe FROM Utilisateur WHERE email = "test_delete@example.com"', expect.any(Function));

    DB.query.mockRestore();
  });

  test("readall with empty table", () => {
    const emptyTable = [];

    function testCallback(err, results) {
      expect(err).toBeInstanceOf(TypeError); // Vérifier si err est une instance de TypeError
      expect(err.message).toBe("Aucun utilisateur"); // Vérifier le message d'erreur
      expect(results).toEqual(emptyTable); // Vérifier si results correspond au tableau vide
    }

    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(null, emptyTable);
    });

    ModelUtilisateur.readall(testCallback);

    expect(DB.query).toHaveBeenCalledWith('SELECT * FROM Utilisateur', expect.any(Function));

    DB.query.mockRestore();
  });

  test("getNomPrenomTelSexe if erreur", () => {
    function testIf(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.getNomPrenomTelSexe("test_delete@example.com", testIf);
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

  test("read if erreur", () => {
    function testIf(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.read("test_delete@example.com", testIf);
  });


  test("delete if erreur", () => {
    function testIf(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.delete("test_delete@example.com", testIf);
  });

  test("readall", (done) => {
    ModelUtilisateur.readall(function (err, resultat) {
      for (var i = 0; i < resultat.length; i++) {
        if (resultat[i].email == "test_delete@example.com") {
          expect(resultat[0].prenom).toBe("Prenom_delete");
          expect(resultat[0].nom).toBe("Nom_delete");
          expect(resultat[0].statut).toBe(1);
          expect(resultat[0].telephone).toBe("0616745678");
          expect(resultat[0].adresse_utilisateur_lat).toBe(48.8934);
          expect(resultat[0].adresse_utilisateur_long).toBe(2.2778);
          expect(resultat[0].sexe).toBe("FEMME");
          expect(resultat[0].type_utilisateur).toBe("CANDIDAT");
        }
      }
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
      expect(resultat[0].password).toBe("Password123!");
      expect(resultat[0].telephone).toBe("0612345678");
      expect(resultat[0].adresse_utilisateur_lat).toBe(48.1234);
      expect(resultat[0].adresse_utilisateur_long).toBe(2.5678);
      expect(resultat[0].sexe).toBe("HOMME");
      done();
    });
  });

  test("create user with no user added error", () => {
    const email = "test@example.com";
    const password = "password123";
    const nom = "Doe";
    const prenom = "John";
    const tel = "0123456789";
    const sexe = "M";
    const ddn = "1990-01-01";
    const latitude = 0.0;
    const longitude = 0.0;

    function testCallback(err, success) {
      expect(err).toBeNull(); // Vérifier si err est null
      expect(success).toBe(false); // Vérifier si success est false
    }

    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(null, { affectedRows: 0 });
    });

    ModelUtilisateur.create(email, password, nom, prenom, tel, sexe, ddn, latitude, longitude, testCallback);

    expect(DB.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Utilisateur"), expect.any(Function));

    DB.query.mockRestore();
  });

  test("DELETE_USER", (done) => {
    ModelUtilisateur.delete("test_delete@example.com", function (err, resultat) {
      ModelUtilisateur.read("test_delete@example.com", function (err, resultat) {
        expect(resultat.length).toBe(0);
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

  test("updateNom - success", (done) => {
    const email = "julie@gmail.com";
    const newNom = "NomTest";
    ModelUtilisateur.updateNom(email, newNom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updateNom - success", (done) => {
    const email = "julie@gmail.com";
    const newNom = "Bonnet";
    ModelUtilisateur.updateNom(email, newNom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updateNom user with error", () => {

    let fakeError = new Error("Erreur de requête");
    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }

    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.updateNom("testee@test.com", "TT", testCallback);

    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET nom = \"TT\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );

    DB.query.mockRestore();
  });

  test("updatePrenom - success", (done) => {
    const email = "julie@gmail.com";
    const newPrenom = "Jane";
    ModelUtilisateur.updatePrenom(email, newPrenom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updatePrenom - success", (done) => {
    const email = "julie@gmail.com";
    const newPrenom = "Julie";
    ModelUtilisateur.updatePrenom(email, newPrenom, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updatePrenom user with error", () => {

    let fakeError = new Error("Erreur de requête");
    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }

    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.updatePrenom("testee@test.com", "TT", testCallback);

    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET prenom = \"TT\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );

    DB.query.mockRestore();
  });

  test("updateSexe - success", (done) => {
    const email = "julie@gmail.com";
    const newSexe = "HOMME";
    ModelUtilisateur.updateSexe(email, newSexe, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });

  test("updateSexe - success", (done) => {
    const email = "julie@gmail.com";
    const newSexe = "FEMME";
    ModelUtilisateur.updateSexe(email, newSexe, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });


  test("updateSexe user with error", () => {

    let fakeError = new Error("Erreur de requête");
    function testCallback(err, resultat) {
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }

    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });

    ModelUtilisateur.updateSexe("testee@test.com", "FEMME", testCallback);

    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET sexe = \"FEMME\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );

    DB.query.mockRestore();
  });

  test("TEST_COORDONNEES - OK", (done) => {
    const longitude = 2.5678;
    const latitude = 48.1234;
    ModelUtilisateur.TEST_COORDONNEES(latitude, longitude, function (result) {
      expect(result).toBe(true);
      done();
    });
  });
});
