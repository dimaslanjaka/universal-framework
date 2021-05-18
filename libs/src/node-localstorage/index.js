/**
 * @type {Storage}
 */
let LocalStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LocalStorage = require("./dist/LocalStorage").LocalStorage;
  //var LocalStorage = require('node-localstorage').LocalStorage;
  if (typeof global != "undefined") {
    global.localStorage = new LocalStorage("./tmp/storage");
  } else {
    const localStorage = new LocalStorage("./tmp/storage");
  }
}
module.exports.localStorage = localStorage;
module.exports.LocalStorage = LocalStorage;
