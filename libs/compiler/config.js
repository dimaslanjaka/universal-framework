"use strict";
var tslib_1 = require("tslib");
var process = tslib_1.__importStar(require("process"));
var upath = tslib_1.__importStar(require("upath"));
var path = tslib_1.__importStar(require("path"));
var root = function () {
    var appDir = upath
        .normalizeSafe(path.dirname(require.main.filename))
        .toString();
    if (/\/libs\/compiler$/s.test(appDir)) {
        var split = appDir.split('/');
        split = split.slice(0, -2);
        appDir = split.join('/');
    }
    return appDir;
};
var config = require(process.cwd() + "/config.json");
config.root = root();
module.exports = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFtQztBQUNuQyxtREFBK0I7QUFDL0IsaURBQTZCO0FBQzdCLElBQU0sSUFBSSxHQUFHO0lBQ1gsSUFBSSxNQUFNLEdBQUcsS0FBSztTQUNmLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQsUUFBUSxFQUFFLENBQUM7SUFDZCxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxNQUFNLEdBMEVOLE9BQU8sQ0FBSSxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFjLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3JCLGlCQUFTLE1BQU0sQ0FBQyJ9