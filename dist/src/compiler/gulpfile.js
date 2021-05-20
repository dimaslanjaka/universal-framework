"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderPkg = exports.build = void 0;
var tslib_1 = require("tslib");
// noinspection RegExpDuplicateAlternationBranch
require("../../js/_Prototype-Array");
require("../node-localstorage/src/index");
var gulp = tslib_1.__importStar(require("gulp"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var fs = tslib_1.__importStar(require("fs"));
var gulpfile_app_1 = require("./gulpfile-app");
var gulpfile_doc_1 = require("./gulpfile-doc");
var func_1 = require("./func");
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
 * Create Documentation of javascript's
 */
gulp.task("doc", gulpfile_doc_1.doc);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0RBQWdEO0FBQ2hELHFDQUFtQztBQUNuQywwQ0FBd0M7QUFDeEMsaURBQTZCO0FBQzdCLG9FQUEwQztBQUMxQyx3RUFBMEM7QUFDMUMsNkNBQXlCO0FBQ3pCLCtDQUEyQztBQUMzQywrQ0FBcUM7QUFDckMsK0JBQWlDO0FBQ2pDLDJDQUF5QztBQUV6QyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQixZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUVoQjs7O0dBR0c7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNqQixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7SUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUMsVUFBb0I7SUFDeEMsT0FBTyx3QkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCxzQkFFQztBQUVELFNBQWdCLFVBQVU7SUFDeEIsSUFBSTtRQUNGLElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUNuQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUN0RSxRQUFRLEVBQUUsT0FBTztpQkFDbEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQWRELGdDQWNDO0FBRUQsK0JBQStCO0FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0lBQzFCLFNBQVMsTUFBTSxDQUFDLEtBQVk7UUFDMUIsT0FBTyxLQUFLO2FBQ1QsTUFBTSxDQUFDLFVBQVUsSUFBSTtZQUNwQixPQUFPLENBQ0wsNEJBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM5QixDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDNUMsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFVLEtBQUs7WUFDbEIsT0FBTyxlQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUksR0FBRyxHQUFHLGVBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELGtDQUFrQztJQUNsQyw2REFBNkQ7SUFDN0QsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLEVBQUUsR0FBRyxlQUFTLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQztJQUNoRCxrQ0FBa0M7SUFDbEMsNkRBQTZEO0lBQzdELEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV0RDs7R0FFRztBQUNILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGtCQUFHLENBQUMsQ0FBQyJ9