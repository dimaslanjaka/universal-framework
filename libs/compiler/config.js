"use strict";
var tslib_1 = require("tslib");
//import { core } from "./core";
var process = tslib_1.__importStar(require("process"));
var upath = tslib_1.__importStar(require("upath"));
var path = tslib_1.__importStar(require("path"));
var root = function () {
    var appDir = upath.normalizeSafe(path.dirname(require.main.filename)).toString();
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
//export default config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdDQUFnQztBQUNoQyx1REFBbUM7QUFDbkMsbURBQStCO0FBQy9CLGlEQUE2QjtBQUU3QixJQUFNLElBQUksR0FBSTtJQUNaLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakYsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQTtBQUNELElBQUksTUFBTSxHQXlFTixPQUFPLENBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBYyxDQUFDLENBQUM7QUFDNUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUVyQixpQkFBUyxNQUFNLENBQUM7QUFDaEIsd0JBQXdCIn0=