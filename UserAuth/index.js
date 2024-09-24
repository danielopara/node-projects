const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/dbConfig");
const userRoutes = require("./route/UserRoute");
const log = require("./util/LogTime");
const { handle404, handleBadRequest } = require("./util/errorHandlers");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  log.logSuccess(`Endpoint called : ${req.method} ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);

// Handle 404 errors for unknown routes
app.use(handle404);

// Error-handling middleware
app.use(handleBadRequest);

sequelize
  .authenticate()
  .then(() => {
    log.logSuccess("Database connection established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    log.logSuccess("Database synchronized.");
  })
  .catch((err) => {
    log.logError("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  log.logSuccess(`Server is running on port ${PORT}`);
});
