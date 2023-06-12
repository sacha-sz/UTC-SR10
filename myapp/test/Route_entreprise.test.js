const request = require('supertest');
const app = require('../app');
const entrepriseModel = require('../model/Entreprise');


const agent = request.agent(app); // Crée un agent de test

beforeAll((done) => {
    agent
        .post('/login/auth')
        .send({ email: 'test@gmail.com', password: 'Passwordtest+123' })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            // Effectuez une nouvelle requête GET pour mettre à jour la session sur l'agent
            agent.get('/').expect(200, done);
        });
});


afterAll((done) => {

    agent.get('/login/logout').expect(302, done);

});



describe("Test the root path", () => {

    /// /entreprise : GET

    test('GET /entreprise : Connecté donc retourne 200', done => {
        agent
            .get('/entreprise')
            .expect(200, done);
    });

    test('GET /entreprise : Non connecté donc retourne 302', done => {
        request(app)
            .get('/entreprise')
            .expect(302, done);
    });


    /// /entreprise/inscription : GET

    test("GET /inscription : Connecté mais aucun Type d'organisation donc retourne 302", async () => {
        jest.spyOn(entrepriseModel, 'readTypeOrganisation').mockImplementation((callback) => {
            callback(null, null);
        });

        const response = await agent.get('/entreprise/inscription');

        expect(response.statusCode).toBe(302); // Modifier le code de statut en fonction de votre application
        expect(response.headers.location).toBe('/entreprise');

        entrepriseModel.readTypeOrganisation.mockRestore();;
    });

    test("GET /entreprise/inscription : Non connecté donc retourne 302", done => {
        request(app)
            .get("/entreprise/inscription")
            .expect(302, done);
    });

    test("GET /entreprise/inscription : Connecté et Type d'organisation donc retourne 200", done => {
        agent
            .get("/entreprise/inscription")
            .expect(200, done);
    });


    /// /entreprise/inscription : POST

    test("POST /entreprise/inscription : Connecté donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "TEST1",
                SIREN: "911111111",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "SAS"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Non connecté donc retourne 302", done => {
        request(app)
            .post("/entreprise/inscription")
            .send({
                name: "Company Name",
                SIREN: "911111113",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "SAS"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais l'un des champs est vide donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "Company Name",
                SIREN: "911111114",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: ""
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais Latitude invalide donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "Company Name",
                SIREN: "911111115",
                lat: "100",
                long: "2.3522",
                type_organisation: "SAS"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais Longitude invalide donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "Company Name",
                SIREN: "911111116",
                lat: "48.8566",
                long: "200",
                type_organisation: "SAS"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais SIREN invalide donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "Company Name",
                SIREN: "123456789X",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "SAS"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais Type d'organisation est Autre donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "TEST7",
                SIREN: "911111117",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "Autre",
                newOrganisation: "Test7OrgaTest",
                newDescription: "Fake Description"
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Connecté mais Type d'organisation est Autre et Description est vide donc retourne 302", done => {
        agent
            .post("/entreprise/inscription")
            .send({
                name: "TEST8",
                SIREN: "911111118",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "Autre",
                newOrganisation: "TEST8Organisation",
                newDescription: ""
            })
            .expect(302, done);
    });

    test("POST /entreprise/inscription : Erreur lors de l'ajout du nouveau type d'organisation", async () => {
        const mockCreateTorga = jest.spyOn(entrepriseModel, 'createTypeOrganisation').mockImplementation((type, desc, callback) => {
            callback(new Error("Erreur lors de la création du type d'organisation"), false);
        });

        const response = await agent.post("/entreprise/inscription").send({
            name: "TEST9",
                SIREN: "911111119",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "Autre",
                newOrganisation: "TEST9Organisation",
                newDescription: "TEST9Desc"
        });

        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/entreprise/inscription');

        expect(mockCreateTorga).toHaveBeenCalledTimes(1);
        expect(mockCreateTorga).toHaveBeenCalledWith("TEST9Organisation", "TEST9Desc", expect.any(Function));

        mockCreateTorga.mockRestore();
    });

    test("POST /entreprise/inscription : Erreur lors de l'ajout de la nouvelle organisation d'un nouveau type", async () => {
        const mockCreateOrga = jest.spyOn(entrepriseModel, 'create').mockImplementation((siren, name, lat, long, type_organisation, callback) => {
            callback(new Error("Erreur lors de la création de l'organisation"), false);
        });

        const response = await agent.post("/entreprise/inscription").send({
            name: "TEST10",
                SIREN: "911111101",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "Autre",
                newOrganisation: "TEST10Organisation",
                newDescription: "TEST10Desc"
        });

        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/entreprise/inscription');

        expect(mockCreateOrga).toHaveBeenCalledTimes(1);
        expect(mockCreateOrga).toHaveBeenCalledWith("911111101", "TEST10", "48.8566", "2.3522", "TEST10Organisation",  expect.any(Function));

        mockCreateOrga.mockRestore();
    });

    test("POST /entreprise/inscription : Erreur lors de l'ajout de la nouvelle organisation d'un nouveau type", async () => {
        const mockCreateOrga = jest.spyOn(entrepriseModel, 'create').mockImplementation((siren, name, lat, long, type_organisation, callback) => {
            callback(new Error("Erreur lors de la création de l'organisation"), false);
        });

        const response = await agent.post("/entreprise/inscription").send({
            name: "TEST11",
                SIREN: "911111001",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "SAS"
        });

        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/entreprise/inscription');

        expect(mockCreateOrga).toHaveBeenCalledTimes(1);
        expect(mockCreateOrga).toHaveBeenCalledWith("911111001", "TEST11", "48.8566", "2.3522", "SAS",  expect.any(Function));

        mockCreateOrga.mockRestore();
    });

    /// /entreprise/delete_entreprise : GET

    test("GET /entreprise/delete_entreprise : Non connecté donc retourne 302", done => {
        request(app)
            .get("/entreprise/delete_entreprise")
            .expect(302, done);
    });

    test("GET /entreprise/delete_entreprise : Connecté donc retourne 200", done => {
        agent
            .get("/entreprise/delete_entreprise")
            .expect(200, done);
    });


    /// /entreprise/rejoindre_entreprise : POST

    test("POST /entreprise/rejoindre_entreprise : Connecté mais SIREN Impossible donc retourne 302", done => {
        agent
            .post("/entreprise/rejoindre_entreprise")
            .send({
                SIREN: "XXXXXXXXXXXX"
            })
            .expect(302)
            .expect('Location', '/entreprise')
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test("POST /entreprise/rejoindre_entreprise : Connecté avec SIREN inexistant donc retourne 302", done => {
        agent
            .post("/entreprise/rejoindre_entreprise")
            .send({
                SIREN: "111111119"
            })
            .expect(302)
            .expect('Location', '/entreprise', done);
    });

    test("POST /entreprise/rejoindre_entreprise : Connecté avec SIREN existant donc retourne 302", done => {
        agent
            .post("/entreprise/rejoindre_entreprise")
            .send({
                SIREN: "911111111"
            })
            .expect(302)
            .expect('Location', '/entreprise', done);
    });


    test("POST /entreprise/rejoindre_entreprise : Erreur lors de l'ajout de l'utilisateur à l'entreprise", async () => {
        const mockAddUser = jest.spyOn(entrepriseModel, 'addUser').mockImplementation((siren, username, callback) => {
            callback("Erreur lors de l'ajout de l'utilisateur à l'entreprise", null);
        });

        const response = await agent.post('/entreprise/rejoindre_entreprise').send({
            SIREN: "123456789"
        });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/entreprise');

        expect(mockAddUser).toHaveBeenCalledTimes(1);
        expect(mockAddUser).toHaveBeenCalledWith("123456789", "test@gmail.com", expect.any(Function));

        mockAddUser.mockRestore();
    });

    test("POST /entreprise/rejoindre_entreprise : Connecté mais SIREN inexistant donc retourne 302 [SIREN Vide]", done => {
        agent
            .post("/entreprise/rejoindre_entreprise")
            .send({
                SIREN: ""
            })
            .expect(302)
            .expect('Location', '/entreprise')
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });


    /// /entreprise/delete_entreprise : POST

    test("POST /entreprise/delete_entreprise : Connecté donc retourne 302 [Success]", done => {
        agent
            .post("/entreprise/delete_entreprise")
            .send({
                SIREN: "911111111"
            })
            .expect(302, done);
    });

    test("POST /entreprise/delete_entreprise : Connecté donc retourne 302 [SIREN Vide]", done => {
        agent
            .post("/entreprise/delete_entreprise")
            .send({
                SIREN: ""
            })
            .expect(302, done);
    });

    test("POST /entreprise/delete_entreprise : Erreur lors de la suppression de l'entreprise", async () => {
        const mockDelete = jest.spyOn(entrepriseModel, 'delete').mockImplementation((siren, callback) => {
            callback(new Error("Erreur lors de la suppression de l'entreprise"), false);
        });

        const response = await agent.post('/entreprise/delete_entreprise').send({
            SIREN: "91111111"
        });

        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/entreprise');

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith("91111111", expect.any(Function));

        mockDelete.mockRestore();
    });
});
