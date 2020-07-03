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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQW1DO0FBQUMsbURBQStCO0FBQUMsaURBQTZCO0FBQUMsSUFBTSxJQUFJLEdBQUcsY0FBd0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBTSxRQUFRLEVBQUUsQ0FBQyxDQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQU0sSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUFLLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUssTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FBSSxDQUFHLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSSxNQUFNLEdBK0U3WSxPQUFPLENBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBYyxDQUFDLENBQUM7QUFBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDO0FBQUMsaUJBQVMsTUFBTSxDQUFDIn0=