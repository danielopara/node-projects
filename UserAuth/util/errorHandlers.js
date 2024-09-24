const log = require("../util/LogTime");

const handle404 = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `Cannot ${req.method} ${req.url} - Endpoint not found`,
  });
};

const handleBadRequest = (err, req, res, next) => {
  log.logError(`Error: ${err.message}`);
  res.status(500).json({
    status: 500,
    message: "An internal server error occurred",
    error: err.message,
  });
};

module.exports = {
  handle404,
  handleBadRequest,
};
