/**
 * check string is json
 * @param {string} str
 * @description check validate json
 */
function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
