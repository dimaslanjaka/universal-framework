"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var log_1 = tslib_1.__importDefault(require("./log"));
var exec = require("child_process").exec;
var root_pkg = JSON.parse(fs_1.default.readFileSync(process.cwd() + "/package.json").toString());
var packages = {};
Object.assign(packages, root_pkg.dependencies, root_pkg.devDependencies);
var TypesLists = [];
var types = [];
var already = [];
var exclude = ["animate.css"];
for (var key in packages) {
    if (packages.hasOwnProperty(key)) {
        var version = packages[key];
        if (!key.includes("@types")) {
            TypesLists.push(key);
            types.push("@types/" + key);
            TypesLists = shuffle(TypesLists);
        }
        else {
            already.push(key);
        }
    }
}
types = types.filter(function (el) { return !already.includes(el); });
installTypes();
function installTypes() {
    if (!types.length) {
        exec("npm rebuild");
        return;
    }
    exec("npm install " + types[0] + " --save-dev --prefer-offline", function (err, stdout, stderr) {
        if (!err) {
            console.log(stdout);
            console.log(stderr);
        }
        else {
            log_1.default.log(log_1.default.error(err.message));
        }
        types.shift();
        installTypes();
    });
}
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMtaW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL3R5cGVzLWluc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrREFBb0I7QUFFcEIsc0RBQXdCO0FBS2hCLElBQUEsSUFBSSxHQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBN0IsQ0FBOEI7QUFFMUMsSUFBTSxRQUFRLEdBR1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUV6RSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDOUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUU7SUFDMUIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2hDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBVSxHQUFLLENBQUMsQ0FBQztZQUM1QixVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Y7Q0FDRjtBQUVELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7QUFDcEQsWUFBWSxFQUFFLENBQUM7QUFFZixTQUFTLFlBQVk7SUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BCLE9BQU87S0FDUjtJQUNELElBQUksQ0FBQyxpQkFBZSxLQUFLLENBQUMsQ0FBQyxDQUFDLGlDQUE4QixFQUFFLFVBQzFELEdBQXdCLEVBQ3hCLE1BQVcsRUFDWCxNQUFXO1FBRVgsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0wsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxPQUFPLENBQUMsQ0FBYTtJQUM1QixJQUFJLENBQVMsRUFBRSxDQUFNLEVBQUUsQ0FBUyxDQUFDO0lBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1Y7SUFDRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMifQ==