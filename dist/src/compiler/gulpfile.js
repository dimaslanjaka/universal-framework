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
var gulpfile_watch_1 = require("./gulpfile-watch");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
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
gulp.task("watch", gulp.series(gulpfile_watch_1.watch3));
gulp.task("assets-compile", function (done) {
    function filter(views) {
        return views
            .filter(function (item) {
            return (/\.(js|scss|css|sass|less|ts)$/.test(item) &&
                !/\.min\.(js|css)$/.test(item) &&
                !/-ori|-original|-backup|\.bak/s.test(item));
        })
            .map(function (asset) {
            return index_1.default.normalize(asset);
        });
    }
    var css = filemanager_1.default.readdir(root + "/assets/css");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    css = filter(css);
    var js = filemanager_1.default.readdir(root + "/assets/js");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    js = filter(js);
    console.log(css);
    console.log(js);
    done();
});
gulp.task("compile-view", function () {
    gulpfile_app_1.multiMinify(gulpfile_app_1.views());
});
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * Create Documentation of javascript's
 */
gulp.task("doc", gulpfile_doc_1.doc);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0RBQWdEO0FBQ2hELHFDQUFtQztBQUNuQywwQ0FBd0M7QUFDeEMsaURBQTZCO0FBQzdCLG9FQUEwQztBQUMxQyx3RUFBMEM7QUFDMUMsNkNBQXlCO0FBQ3pCLCtDQUErRDtBQUMvRCwrQ0FBcUM7QUFDckMsK0JBQWlDO0FBQ2pDLG1EQUEwQztBQUMxQyxzRUFBd0M7QUFFeEMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEI7OztHQUdHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDZixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ25CLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7SUFDckIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUMsVUFBb0I7SUFDdEMsT0FBTyx3QkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFGRCxzQkFFQztBQUVELFNBQWdCLFVBQVU7SUFDdEIsSUFBSTtRQUNBLElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUNwRSxRQUFRLEVBQUUsT0FBTztpQkFDcEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjtLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQztBQWRELGdDQWNDO0FBRUQsK0JBQStCO0FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQU0sQ0FBQyxDQUFDLENBQUM7QUFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLElBQUk7SUFDdEMsU0FBUyxNQUFNLENBQUMsS0FBWTtRQUN4QixPQUFPLEtBQUs7YUFDUCxNQUFNLENBQUMsVUFBVSxJQUFJO1lBQ2xCLE9BQU8sQ0FDSCwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUM5QyxDQUFDO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQVUsS0FBSztZQUNoQixPQUFPLGVBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSSxHQUFHLEdBQUcscUJBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELGtDQUFrQztJQUNsQyw2REFBNkQ7SUFDN0QsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLEVBQUUsR0FBRyxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7SUFDbEQsa0NBQWtDO0lBQ2xDLDZEQUE2RDtJQUM3RCxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVoQixJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7SUFDdEIsMEJBQVcsQ0FBQyxvQkFBSyxFQUFFLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXREOztHQUVHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsa0JBQUcsQ0FBQyxDQUFDIn0=