import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./src/config/DbConfig.js";
import userRoutes from "./src/routes/UserRoutes.js";
import { logSuccess, logFailure } from "./src/util/Logging.js";
import ErrorHandlers from "./src/util/ErrorHandlers.js";

const app = express();
const PORT = 5400;

app.use(bodyParser.json());

app.use((req, res, next) => {
  logSuccess(`Endpoint called: ${req.method}, ${req.url}`);
  next();
});

app.use("/api/user", userRoutes);

app.use(ErrorHandlers.handle404);
app.use(ErrorHandlers.handleBadRequest);

(async () => {
  try {
    await sequelize.authenticate();
    logSuccess("Database connection established");
    await sequelize.sync();
    logSuccess("Database synced");
  } catch (err) {
    logFailure("Error connecting to the database: " + err.message);
  }
})();

// Graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", async () => {
  try {
    await sequelize.close();
    logSuccess("Database connection closed");
    process.exit(0);
  } catch (err) {
    logFailure("Error during disconnection: " + err.message);
    process.exit(1);
  }
});

app.listen(PORT, () => {
  logSuccess("running on port " + PORT);
});
