import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./config/dbConfig.js";
import userRoutes from "./routes/UserRoute.js";
import { logSuccess, logFailure } from "./utils/Logging.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  logSuccess(`Endpoint called: ${req.method}, ${req.url}`);
  next();
});

app.use("/api/user", userRoutes);

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
