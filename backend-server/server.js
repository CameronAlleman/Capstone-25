const app = require("./app");
const sequelize = require("./dbConnect");

const PORT = process.env.PORT || 8081;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
