export function logSuccess(message) {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${message}`);
}

export function logFailure(message) {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime} ${message}]`);
}
