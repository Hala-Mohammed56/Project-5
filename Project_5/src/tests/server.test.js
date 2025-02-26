const request = require('supertest');
const app = require('../src/server/server');

test("Test /getTrip route", async () => {
    const response = await request(app)
        .post('/getTrip')
        .send({ city: "Paris", date: "2025-06-15" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("city", "Paris");
    expect(response.body.weather).toHaveProperty("description");
});
