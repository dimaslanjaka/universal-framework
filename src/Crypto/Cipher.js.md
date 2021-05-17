```js
/*global require*/

var plainText = "This is the text to be encrypted",
  iv = cryptLib.generateRandomIV(16), //16 bytes = 128 bit
  key = cryptLib.getHashSha256("my secret key", 32); //32 bytes = 256 bits
const cryptLib = require("./Cipher.js"),
  cypherText = cryptLib.encrypt(plainText, key, iv);

console.log("iv = %s", iv);
console.log("key = %s", key);
console.log("Cypher text = %s", cypherText);
console.log("Plain text = %s", cryptLib.decrypt(cypherText, key, iv));

// Test 2
plainText = "The quick brown fox jumps over to the lazy dog.";
key = "BlVssQKxzAHFAUNZbqvwS+yKw/m";
const cipherText = cryptLib.encryptPlainTextWithRandomIV(plainText, key);
console.log("cipherText %s", cipherText);

const decryptedString = cryptLib.decryptCipherTextWithRandomIV(cipherText, key);
console.log("decryptedString %s", decryptedString);
```
