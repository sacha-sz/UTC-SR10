const request = require('supertest');
const app = require('../app'); // Remplacez './app' par le chemin d'accès à votre fichier d'application Express


const agent = request.agent(app); // Crée un agent de test

beforeAll((done) => {
    agent
        .post('/login/auth')
        .send({ email: 'test@gmail.com', password: 'mon_mot_de_passe' })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            // Effectuez une nouvelle requête GET pour mettre à jour la session sur l'agent
            agent.get('/').expect(200, done);
        });
    agent
        .post("/entreprise/inscripion")
        .send({
            name: "Company",
            SIREN: "911111111",
            lat: "48.8566",
            long: "2.3522",
            type_organisation: "SAS"
        })
        .expect(302)
});


afterAll((done) => {
    agent
        .post("/entreprise/delete_entreprise")
        .send({
            SIREN: "111111119"
        })
        .expect(302) // Redirection attendue après la création de l'entreprise
    DB.end(callback); // Ferme la connexion à la base de données après les tests
    done();
});



describe("Test the root path", () => {
    test('should return 200 OK for GET /entreprise', function (done) {
        agent
            .get('/entreprise')
            .expect(200)
        done();
    });

    test('should return 302 Redirect for GET /entreprise', function (done) {
        request(app)
            .get('/entreprise')
            .expect(302)
        done();
    });


    test("GET /entreprise/inscription 302", done => {
        request(app)
            .get("/entreprise/inscription")
            .expect(302)
        done();
    });

    test("GET /entreprise/inscription 200", done => {
        agent
            .get("/entreprise/inscription")
            .expect(200)
        done();
    });

    test("GET /entreprise/delete_entreprise 302", done => {
        request(app)
            .get("/entreprise/delete_entreprise")
            .expect(302)
        done();
    });

    test("GET /entreprise/delete_entreprise 200", done => {
        agent
            .get("/entreprise/delete_entreprise")
            .expect(200)
        done();
    });

    test("POST /entreprise/inscripion", done => {
        agent
            .post("/entreprise/inscripion")
            .send({
                name: "Company Name",
                SIREN: "111111119",
                lat: "48.8566",
                long: "2.3522",
                type_organisation: "SAS"
            })
            .expect(302) // Redirection attendue après la création de l'entreprise
        done();
    });

    test("POST /entreprise/rejoindre_entreprise", done => {
        agent
            .post("/entreprise/rejoindre_entreprise")
            .send({
                SIREN: "123456789"
            })
            .expect(302) // Redirection attendue après l'ajout de l'utilisateur à l'entreprise
        done();
    });

    test("POST /entreprise/delete_entreprise", done => {
        agent
            .post("/entreprise/delete_entreprise")
            .send({
                SIREN: "91111111"
            })
            .expect(302) // Redirection attendue après la création de l'entreprise
        done();
    });
});
