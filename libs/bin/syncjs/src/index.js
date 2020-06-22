"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sync_1 = require("./classes/Sync");
var fs = require("fs");
wrt();
setInterval(wrt, 5000);
function wrt() {
    fs.writeFile('./test/test.txt', new Date().toString(), function (err) { });
}
// Main Export
exports.default = Sync_1.default;
