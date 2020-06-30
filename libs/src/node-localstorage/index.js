if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("./LocalStorage").LocalStorage;
  //var LocalStorage = require('node-localstorage').LocalStorage;
  global.localStorage = new LocalStorage("./tmp/storage");
}
module.exports.localStorage = localStorage;
