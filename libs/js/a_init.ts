/**
 * Is Node ?
 */
function isnode() {
  if (typeof module !== "undefined" && module.exports) {
    return true;
  }
}
