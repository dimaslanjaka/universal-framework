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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMtaW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvdHlwZXMtaW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtEQUFvQjtBQUVwQixzREFBd0I7QUFLaEIsSUFBQSxJQUFJLEdBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUE3QixDQUE4QjtBQUUxQyxJQUFNLFFBQVEsR0FHVixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDNUUsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXpFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5QixLQUFLLElBQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtJQUMxQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaEMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFVLEdBQUssQ0FBQyxDQUFDO1lBQzVCLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7S0FDRjtDQUNGO0FBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztBQUNwRCxZQUFZLEVBQUUsQ0FBQztBQUVmLFNBQVMsWUFBWTtJQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsT0FBTztLQUNSO0lBQ0QsSUFBSSxDQUFDLGlCQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsaUNBQThCLEVBQUUsVUFDMUQsR0FBd0IsRUFDeEIsTUFBVyxFQUNYLE1BQVc7UUFFWCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDTCxhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLE9BQU8sQ0FBQyxDQUFhO0lBQzVCLElBQUksQ0FBUyxFQUFFLENBQU0sRUFBRSxDQUFTLENBQUM7SUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDVjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyJ9