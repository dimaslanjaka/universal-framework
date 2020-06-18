/**
 * base64 encoding
 * @param {string} str string raw
 */
function base64_encode(str) {
  // PROCESS
  const encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
  return encoded;
}

/**
 * base64 decoding
 * @param {string} str base64 string
 */
function base64_decode(str) {
  // PROCESS
  const encodedWord = CryptoJS.enc.Base64.parse(str); // encodedWord via Base64.parse()
  const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
  return decoded;
}

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16))
  }));
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''));
}