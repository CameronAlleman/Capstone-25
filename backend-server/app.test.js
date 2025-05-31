const request = require("supertest");
const app = require("./app.js");
const sequelize = require("./dbConnect");

describe("GET /", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Welcome to my My campSphere application."
    );
  });
});

afterAll(async () => {
  await sequelize.close(); // closes DB pool
});
