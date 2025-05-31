const { getCampgrounds } = require("./path/to/your/controller");
const { Campground } = require("../models");

jest.mock("../models"); // Mock the entire models module

describe("Campground Controller - getCampgrounds", () => {
  let req, res;

  beforeEach(() => {
    req = {}; // no params needed for this controller
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return all campgrounds with status 200", async () => {
    const mockCampgrounds = [{ id: 1, name: "Test Campground" }];
    Campground.findAll.mockResolvedValue(mockCampgrounds);

    await getCampgrounds(req, res);

    expect(Campground.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCampgrounds);
  });

  it("should return 500 if there is a server error", async () => {
    Campground.findAll.mockRejectedValue(new Error("DB failure"));

    await getCampgrounds(req, res);

    expect(Campground.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});
