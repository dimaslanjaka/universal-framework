"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderPkg = exports.build = void 0;
var tslib_1 = require("tslib");
// noinspection RegExpDuplicateAlternationBranch
require("../../js/_Prototype-Array");
require("../node-localstorage/src/index");
var gulp = tslib_1.__importStar(require("gulp"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var fs = tslib_1.__importStar(require("fs"));
var gulpfile_app_1 = require("./gulpfile-app");
var gulpfile_doc_1 = require("./gulpfile-doc");
var func_1 = require("./func");
var gulpfile_watch_1 = require("./gulpfile-watch");
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
gulp.task("watch", gulp.series(gulpfile_watch_1.gulpWatch));
gulp.task("watch2", gulp.series(gulpfile_watch_1.gulpWatch2));
gulp.task("compile-view", function (done) {
    gulpfile_app_1.multiMinify(gulpfile_app_1.views());
    done();
});
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * Create Documentation of javascript's
 */
gulp.task("doc", gulpfile_doc_1.doc);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0RBQWdEO0FBQ2hELHFDQUFtQztBQUNuQywwQ0FBd0M7QUFDeEMsaURBQTZCO0FBQzdCLHdFQUEwQztBQUMxQyw2Q0FBeUI7QUFDekIsK0NBQStEO0FBQy9ELCtDQUFxQztBQUNyQywrQkFBaUM7QUFDakMsbURBQXlEO0FBRXpELElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWhCOzs7R0FHRztBQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2YsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO0lBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLFVBQW9CO0lBQ3RDLE9BQU8sd0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixVQUFVO0lBQ3RCLElBQUk7UUFDQSxJQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNyRSxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTtnQkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDcEUsUUFBUSxFQUFFLE9BQU87aUJBQ3BCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4QjtBQUNMLENBQUM7QUFkRCxnQ0FjQztBQUVELCtCQUErQjtBQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLDBCQUFTLENBQUMsQ0FBQyxDQUFDO0FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQVUsQ0FBQyxDQUFDLENBQUM7QUFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxJQUFJO0lBQ3BDLDBCQUFXLENBQUMsb0JBQUssRUFBRSxDQUFDLENBQUM7SUFDckIsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXREOztHQUVHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsa0JBQUcsQ0FBQyxDQUFDIn0=