const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
    test("GET /", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("GET /inscription", done => {
        request(app)
            .get("/inscription")
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("POST /inscription", (done) => {
        request(app)
            .post("/inscription")
            .expect("Content-Type", /json/)
            .send({
                name: "test_route_inscription",
                siren: 098745637,
                lat: 12.5673,
                long: 15.9054,
                type_organisation: "SARL"
            })
            .expect(201)

            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
        // More logic goes here
    });
});