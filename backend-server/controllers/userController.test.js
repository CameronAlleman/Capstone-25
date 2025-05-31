const { loginUser } = require("./path/to/userController");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("loginUser controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("returns 400 if username or password missing", async () => {
    req.body = { userName: "user1" }; // no password
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Username and password are required.",
    });
  });

  it("returns 401 if user not found", async () => {
    req.body = { userName: "user1", password: "pass" };
    User.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { userName: "user1" } });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid username or password.",
    });
  });

  it("returns 401 if password is invalid", async () => {
    req.body = { userName: "user1", password: "wrongpass" };
    const fakeUser = { id: 1, userName: "user1", password: "hashedpass" };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(false);

    await loginUser(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith("wrongpass", "hashedpass");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid username or password.",
    });
  });

  it("returns 200 and token if login successful", async () => {
    req.body = { userName: "user1", password: "rightpass" };
    const fakeUser = { id: 1, userName: "user1", password: "hashedpass" };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    await loginUser(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, userName: "user1" },
      expect.any(String),
      { expiresIn: "2h" }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "fake-jwt-token",
      userName: "user1",
      userId: 1,
    });
  });
});
