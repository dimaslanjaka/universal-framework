"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderPkg = exports.build = void 0;
var tslib_1 = require("tslib");
// noinspection RegExpDuplicateAlternationBranch
// noinspection ES6PreferShortImport
require("../node-localstorage/src/index");
var gulp = tslib_1.__importStar(require("gulp"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var fs = tslib_1.__importStar(require("fs"));
var gulpfile_app_1 = require("./gulpfile-app");
var gulpfile_doc_1 = require("./gulpfile-doc");
var func_1 = require("./func");
require("../../js/_Prototype-Array");
var gulp_watch_1 = require("./gulp-watch");
var root = process_1.default.root;
localStorage.removeItem("compile");
console.clear();
/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
    return build();
});
gulp.task("build-clear", function () {
    return build(true);
});
/**
 * Build Project
 * @param withoutApp
 */
function build(withoutApp) {
    return gulpfile_app_1.createApp(withoutApp);
}
exports.build = build;
function reorderPkg() {
    try {
        var packageJson = root + "/package.json";
        if (fs.existsSync(packageJson)) {
            var json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
            func_1.fixDeps(json_pkg).then(function (json) {
                fs.writeFileSync(root + "/package.json", JSON.stringify(json, null, 2), {
                    encoding: "utf-8",
                });
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.reorderPkg = reorderPkg;
// watch libs/js/**/* and views
gulp.task("watch", gulp_watch_1.gulpWatch);
gulp.task("assets-compile", function () {
    function filter(views) {
        return views
            .filter(function (item) {
            return (/\.(js|scss|css|sass|less)$/.test(item) &&
                !/\.min\.(js|css)$/.test(item) &&
                !/-ori|-original|-backup|\.bak/s.test(item));
        })
            .map(function (asset) {
            return index_1.default.normalize(asset);
        });
    }
    var css = index_1.default.readdir(root + "/assets/css");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    css = filter(css);
    var js = index_1.default.readdir(root + "/assets/js");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    js = filter(js);
});
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * Create Documentation of javascripts
 */
gulp.task("doc", gulpfile_doc_1.doc);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0RBQWdEO0FBQ2hELG9DQUFvQztBQUNwQywwQ0FBd0M7QUFDeEMsaURBQTZCO0FBQzdCLG9FQUEwQztBQUMxQyx3RUFBMEM7QUFDMUMsNkNBQXlCO0FBQ3pCLCtDQUEyQztBQUMzQywrQ0FBcUM7QUFDckMsK0JBQWlDO0FBQ2pDLHFDQUFtQztBQUNuQywyQ0FBeUM7QUFFekMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEI7OztHQUdHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDakIsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLFVBQW9CO0lBQ3hDLE9BQU8sd0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLElBQUk7UUFDRixJQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNyRSxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTtnQkFDbkMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDdEUsUUFBUSxFQUFFLE9BQU87aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUM7QUFkRCxnQ0FjQztBQUVELCtCQUErQjtBQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxzQkFBUyxDQUFDLENBQUM7QUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtJQUMxQixTQUFTLE1BQU0sQ0FBQyxLQUFZO1FBQzFCLE9BQU8sS0FBSzthQUNULE1BQU0sQ0FBQyxVQUFVLElBQUk7WUFDcEIsT0FBTyxDQUNMLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDOUIsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzVDLENBQUM7UUFDSixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBVSxLQUFLO1lBQ2xCLE9BQU8sZUFBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLEdBQUcsR0FBRyxlQUFTLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNsRCxrQ0FBa0M7SUFDbEMsNkRBQTZEO0lBQzdELEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxFQUFFLEdBQUcsZUFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7SUFDaEQsa0NBQWtDO0lBQ2xDLDZEQUE2RDtJQUM3RCxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdEQ7O0dBRUc7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxrQkFBRyxDQUFDLENBQUMifQ==