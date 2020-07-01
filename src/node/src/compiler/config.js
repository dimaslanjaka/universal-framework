"use strict";
var tslib_1 = require("tslib");
var process = tslib_1.__importStar(require("process"));
var upath = tslib_1.__importStar(require("upath"));
var path = tslib_1.__importStar(require("path"));
var root = function () { var appDir = upath.normalizeSafe(path.dirname(require.main.filename)).toString(); if (/\/libs\/compiler$/s.test(appDir)) {
    var split = appDir.split('/');
    split = split.slice(0, -2);
    appDir = split.join('/');
} return appDir; };
var config = require(process.cwd() + "/config.json");
config.root = root();
module.exports = config;
//# sourceMappingURL=config.js.map