"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sass_compiler = void 0;
var tslib_1 = require("tslib");
var sass = tslib_1.__importStar(require("sass"));
var fs = tslib_1.__importStar(require("fs"));
var log_1 = require("./log");
var core_1 = require("./core");
var sass_compiler = /** @class */ (function () {
    function sass_compiler() {
    }
    /**
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    sass_compiler.scss = function (filename) {
        fs.exists(filename, function (exists) {
            if (exists) {
                var output = filename.toString().replace(/\.scss/s, ".css");
                var outputcss = output;
                if (/\.scss$/s.test(filename.toString()) &&
                    !/\.min\.scss$/s.test(filename.toString())) {
                    sass.render({
                        file: filename.toString(),
                        outputStyle: "expanded",
                        outFile: output,
                    }, function (err, result) {
                        if (!err) {
                            fs.writeFile(outputcss, result.css, function (err) {
                                if (!err) {
                                    filename = filename.toString().replace(core_1.core.root(), "");
                                    outputcss = outputcss.replace(core_1.core.root(), "");
                                    new log_1.log(filename + " > " + outputcss + " " + log_1.log.success("success"));
                                    core_1.core.minCSS(output, null);
                                }
                            });
                        }
                    });
                }
            }
            else {
                console.error(filename + " not found");
            }
        });
    };
    return sass_compiler;
}());
exports.sass_compiler = sass_compiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9zYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0IsNkNBQXlCO0FBQ3pCLDZCQUEwQjtBQUMxQiwrQkFBOEI7QUFFOUI7SUFBQTtJQXlDQSxDQUFDO0lBeENDOzs7T0FHRztJQUNJLGtCQUFJLEdBQVgsVUFBWSxRQUFxQjtRQUMvQixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU07WUFDbEMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsSUFDRSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUMxQztvQkFDQSxJQUFJLENBQUMsTUFBTSxDQUNUO3dCQUNFLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUN6QixXQUFXLEVBQUUsVUFBVTt3QkFDdkIsT0FBTyxFQUFFLE1BQU07cUJBQ2hCLEVBQ0QsVUFBVSxHQUFHLEVBQUUsTUFBTTt3QkFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDUixFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRztnQ0FDL0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQ0FDUixRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0NBQ3hELFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQ0FDL0MsSUFBSSxTQUFHLENBQ0YsUUFBUSxXQUFNLFNBQVMsU0FBSSxTQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBRyxDQUN2RCxDQUFDO29DQUNGLFdBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lDQUMzQjs0QkFDSCxDQUFDLENBQUMsQ0FBQzt5QkFDSjtvQkFDSCxDQUFDLENBQ0YsQ0FBQztpQkFDSDthQUNGO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUksUUFBUSxlQUFZLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxzQ0FBYSJ9