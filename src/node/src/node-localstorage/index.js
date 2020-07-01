if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("./LocalStorage").LocalStorage;
    if (typeof global != "undefined") {
        global.localStorage = new LocalStorage("./tmp/storage");
    }
    else {
        var localStorage_1 = new LocalStorage("./tmp/storage");
    }
}
module.exports.localStorage = localStorage;
//# sourceMappingURL=index.js.map