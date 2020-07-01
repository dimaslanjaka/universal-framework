"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var func_1 = require("../func");
module.exports = function () {
    var installed = func_1.asset("./tmp/npm/local.json");
    var result = {};
    try {
        if (fs.existsSync(installed)) {
            result = JSON.parse(fs.readFileSync(installed).toString());
        }
        else {
            func_1.list_package();
            result = {
                error: "package still not fetched",
                local: {},
                global: {},
            };
        }
    }
    catch (error) {
        if (error) {
            result = {};
        }
    }
    return JSON.stringify(result, null, 2);
};
//# sourceMappingURL=fetch.js.map