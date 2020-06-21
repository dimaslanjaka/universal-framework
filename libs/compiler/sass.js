"use strict";
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
module.exports = sass_compiler;
//export default sass_compiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9zYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTZCO0FBQzdCLDZDQUF5QjtBQUN6Qiw2QkFBMEI7QUFDMUIsK0JBQThCO0FBRTlCO0lBQUE7SUF5Q0EsQ0FBQztJQXhDQzs7O09BR0c7SUFDSSxrQkFBSSxHQUFYLFVBQVksUUFBcUI7UUFDL0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxNQUFNO1lBQ2xDLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLElBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3BDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFDMUM7b0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FDVDt3QkFDRSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDekIsV0FBVyxFQUFFLFVBQVU7d0JBQ3ZCLE9BQU8sRUFBRSxNQUFNO3FCQUNoQixFQUNELFVBQVUsR0FBRyxFQUFFLE1BQU07d0JBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ1IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUc7Z0NBQy9DLElBQUksQ0FBQyxHQUFHLEVBQUU7b0NBQ1IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29DQUN4RCxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0NBQy9DLElBQUksU0FBRyxDQUNGLFFBQVEsV0FBTSxTQUFTLFNBQUksU0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUcsQ0FDdkQsQ0FBQztvQ0FDRixXQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQ0FDM0I7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUNGLENBQUM7aUJBQ0g7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFJLFFBQVEsZUFBWSxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUFFRCxpQkFBUyxhQUFhLENBQUM7QUFDdkIsK0JBQStCIn0=