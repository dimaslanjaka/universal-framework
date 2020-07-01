"use strict";
var process = require("process");
var upath = require("upath");
var path = require("path");
var root = function () { var appDir = upath.normalizeSafe(path.dirname(require.main.filename)).toString(); if (/\/libs\/compiler$/s.test(appDir)) {
    var split = appDir.split('/');
    split = split.slice(0, -2);
    appDir = split.join('/');
} return appDir; };
var config = require(process.cwd() + "/config.json");
config.root = root();
module.exports = config;
//# sourceMappingURL=config.js.map