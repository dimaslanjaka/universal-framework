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
        var split = appDir.split("/");
        split = split.slice(0, -2);
        appDir = split.join("/");
    }
    return appDir;
};
var config = require(process.cwd() + "/config.json");
config.root = root();
module.exports = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQW1DO0FBQ25DLG1EQUErQjtBQUMvQixpREFBNkI7QUFFN0IsSUFBTSxJQUFJLEdBQUc7SUFDWCxJQUFJLE1BQU0sR0FBRyxLQUFLO1NBQ2YsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsRCxRQUFRLEVBQUUsQ0FBQztJQUNkLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixJQUFJLE1BQU0sR0ErRU4sT0FBTyxDQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDckIsaUJBQVMsTUFBTSxDQUFDIn0=