"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var packages = /** @class */ (function () {
    function packages() {
    }
    packages.npmls = function (cb) {
        return child_process_1.default.exec("npm ls --json", function (err, stdout, stderr) {
            if (err)
                return cb(err);
            cb(null, JSON.parse(stdout));
        });
    };
    return packages;
}());
exports.default = packages;
