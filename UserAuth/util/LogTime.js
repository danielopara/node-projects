function logSuccess(message) {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${message}`);
}

function logError(message) {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${message}`);
}

module.exports = {
  logSuccess,
  logError,
};
