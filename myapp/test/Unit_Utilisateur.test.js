const DB = require("../model/ConnexionBDD.js");
const ModelUtilisateur = require("../model/Utilisateur.js");

beforeAll(() => {
  // des instructions à exécuter avant le lancement de cette suite de tests
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
  });
});

afterAll((done) => {
  function callback(err) {
    ModelUtilisateur.delete("test_create_user@example.com", function (resultat) {
    });
    if (err) done(err);
    else done();
  }
  DB.end(callback); // Ferme la connexion à la base de données après les tests
});



describe("ModelUtilisateur Tests", () => {
  test("read user", (done) => {
    ModelUtilisateur.read("julie@gmail.com", function (err, resultat) {
      const prenom = resultat[0].prenom;
      expect(prenom).toBe("Julie");
      expect(resultat[0].nom).toBe("Bonnet");
      expect(resultat[0].password).toBe("julie123");
      expect(resultat[0].statut).toBe(1);
      expect(resultat[0].telephone).toBe("0612345678");
      expect(resultat[0].adresse_utilisateur_lat).toBe(48.5826);
      expect(resultat[0].adresse_utilisateur_long).toBe(7.7492);
      expect(resultat[0].sexe).toBe("FEMME");
      expect(resultat[0].type_utilisateur).toBe("RECRUTEUR");
      done();
    });
  });

  test("read user if erreur", () => {
    function cbRead(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.read("testee@test.fr", cbRead);
  });

  test("read user with error", () => {
    // Définir une erreur fictive pour simuler une erreur dans la requête
    const fakeError = new Error("Erreur de requête");
  
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction read avec l'email et la fonction de rappel de test
    ModelUtilisateur.read("testee@test.fr", testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith('SELECT * FROM Utilisateur WHERE email = "testee@test.fr"', expect.any(Function));
  
    // Restaurer la fonction DB.query originale
    DB.query.mockRestore();
  });
  
  
  test("readall user with error", () => {
    // Définir une erreur fictive pour simuler une erreur dans la requête
    const fakeError = new Error("Erreur de requête");
  
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction read avec l'email et la fonction de rappel de test
    ModelUtilisateur.readall(testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith('SELECT * FROM Utilisateur', expect.any(Function));
  
    // Restaurer la fonction DB.query originale
    DB.query.mockRestore();
  });
  
  test("getNomPrenomTelSexe with error", () => {
    // Définir une erreur fictive pour simuler une erreur dans la requête
    const fakeError = new Error("Erreur de requête");
  
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBeNull(); // Vérifie si resultat est null
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((query, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction read avec l'email et la fonction de rappel de test
    ModelUtilisateur.getNomPrenomTelSexe("testee@test.fr", testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith('SELECT nom, prenom, telephone, sexe FROM Utilisateur WHERE email = "testee@test.fr"', expect.any(Function));
  
    // Restaurer la fonction DB.query originale
    DB.query.mockRestore();
  });

  test("getNomPrenomTelSexe if erreur", () => {
    function testIf(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.getNomPrenomTelSexe("testee@test.fr", testIf);
  });

  test("getNomPrenomTelSexe", (done) => {
    ModelUtilisateur.getNomPrenomTelSexe("julie@gmail.com", function (err, resultat) {
      const prenom = resultat[0].prenom;
      expect(prenom).toBe("Julie");
      expect(resultat[0].nom).toBe("Bonnet");
      expect(resultat[0].telephone).toBe("0612345678");
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
    ModelUtilisateur.read("testee@test.fr", testIf);
  });


  test("delete if erreur", () => {
    function testIf(err, resultat) {
      expect(() => {
        if (err) throw err; // lever l'erreur si err!=null
      }).toThrow("Aucun utilisateur avec cet email"); // elle passe si une exception est levée mais elle passe avec false si l'erreur n'est pas de type email not found
    }
    ModelUtilisateur.delete("testeeeeee@test.fr", testIf);
  });

  test("readall", (done) => {
    ModelUtilisateur.readall(function (err, resultat) {
      for (var i = 0; i < resultat.length; i++) {
        if (resultat[i].email == "julie@gmail.com") {
          expect(resultat[i].prenom).toBe("Julie");
          expect(resultat[i].nom).toBe("Bonnet");
          expect(resultat[i].password).toBe("julie123");
          expect(resultat[i].statut).toBe(1);
          expect(resultat[i].telephone).toBe("0612345678");
          expect(resultat[i].adresse_utilisateur_lat).toBe(48.5826);
          expect(resultat[i].adresse_utilisateur_long).toBe(7.7492);
          expect(resultat[i].sexe).toBe("FEMME");
          expect(resultat[i].type_utilisateur).toBe("RECRUTEUR");
        }
      }
      done();
    });
  });

  test("TEST_MAIL_TRUE", (done) => {
    ModelUtilisateur.TEST_MAIL("julie@gmail.com", function (resultat) {
      expect(resultat).toBe(true);
      done();
    });
  });

  test("TEST_MAIL_FALSE", (done) => {
    ModelUtilisateur.TEST_MAIL("juliegmail.com", function (resultat) {
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
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction updateNom avec l'email, le nouveau nom et la fonction de rappel de test
    ModelUtilisateur.updateNom("testee@test.com", "TT", testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET nom = \"TT\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );
  
    // Restaurer la fonction DB.query originale
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
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction updateNom avec l'email, le nouveau nom et la fonction de rappel de test
    ModelUtilisateur.updatePrenom("testee@test.com", "TT", testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET prenom = \"TT\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );
  
    // Restaurer la fonction DB.query originale
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
    // Définir une fonction de rappel de test
    function testCallback(err, resultat) {
      // Vérifier si la fonction de rappel est appelée avec les arguments appropriés
      expect(err).toBe(fakeError); // Vérifie si err est l'erreur attendue
      expect(resultat).toBe(false); // Vérifie si resultat est false
    }
  
    // Mock de la fonction db.query pour renvoyer une erreur
    jest.spyOn(DB, 'query').mockImplementation((sql, callback) => {
      callback(fakeError, null);
    });
  
    // Appeler la fonction updateNom avec l'email, le nouveau nom et la fonction de rappel de test
    ModelUtilisateur.updateSexe("testee@test.com", "FEMME", testCallback);
  
    // Vérifier si la fonction db.query a été appelée avec les arguments appropriés
    expect(DB.query).toHaveBeenCalledWith(
      "UPDATE Utilisateur SET sexe = \"FEMME\" WHERE email = \"testee@test.com\";",
      expect.any(Function)
    );
  
    // Restaurer la fonction DB.query originale
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
