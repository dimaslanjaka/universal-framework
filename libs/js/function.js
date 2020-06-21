/**
 * Check variable is timeout instance (setInterval, setTimeout)
 * @param {NodeJS.Timeout} t
 */
function isTimer(t) {
  return t instanceof Timeout;
}
