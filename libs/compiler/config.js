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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFtQztBQUFDLG1EQUErQjtBQUFDLGlEQUE2QjtBQUFDLElBQU0sSUFBSSxHQUFHLGNBQXdCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBTSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQU0sUUFBUSxFQUFFLENBQUMsQ0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUFNLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFLLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQUksQ0FBRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFDLElBQUksTUFBTSxHQStFN1ksT0FBTyxDQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0FBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUFDLGlCQUFTLE1BQU0sQ0FBQyJ9