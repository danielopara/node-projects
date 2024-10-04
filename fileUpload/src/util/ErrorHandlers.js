import { logSuccess, logFailure } from "./Logging.js";

class ErrorHandlers {
  static handle404(req, res, next) {
    res.status(404).json({
      status: 404,
      message: `Cannot ${req.method} ${req.url} - Endpoint not found`,
    });
  }

  static handleBadRequest(err, req, res, next) {
    logFailure(`ERROR: ${err.message}`);
    res.status(500).json({
      status: 500,
      message: "An internal server error occurred",
      error: err.message,
    });
  }
}

export default ErrorHandlers;
