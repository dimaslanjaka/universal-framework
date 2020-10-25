if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("./LocalStorage").LocalStorage;
  //var LocalStorage = require('node-localstorage').LocalStorage;
  if (typeof global != "undefined") {
    global.localStorage = new LocalStorage("./tmp/storage");
  } else {
    const localStorage = new LocalStorage("./tmp/storage");
  }
}
module.exports.localStorage = localStorage;
