/**
 * @todo CryptoJS
 * @package https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
 */
var salt = "salt"; //salt
var iv = "1111111111111111"; //pass salt minimum length 12 chars
var iterations = "999"; //iterations

/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 */
function getKey(passphrase, salt) {
  if (typeof CryptoJS == "undefined") return;
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA256,
    keySize: 64 / 8,
    iterations: iterations,
  });
  return key;
}
/**
 * Encrypt function
 * @param {string} passphrase
 * @param {string} plainText
 */
function userJSEncrypt(passphrase, plainText) {
  if (typeof CryptoJS == "undefined") return;
  var key = getKey(passphrase, salt);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  // @ts-ignore
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Decrypt function
 * @param {string} passphrase
 * @param {string} encryptedText
 */
function userJSDecrypt(passphrase, encryptedText) {
  if (typeof CryptoJS == "undefined") return;
  var key = getKey(passphrase, salt);
  var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
