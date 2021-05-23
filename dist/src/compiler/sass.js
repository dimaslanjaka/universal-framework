"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sass_compiler = void 0;
var tslib_1 = require("tslib");
var sass = tslib_1.__importStar(require("sass"));
var fs = tslib_1.__importStar(require("fs"));
var log_1 = tslib_1.__importDefault(require("./log"));
//import { core } from "./core";
var core = require("./core");
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
                var output_1 = filename.toString().replace(/\.scss/s, ".css");
                var outputcss_1 = output_1;
                if (/\.scss$/s.test(filename.toString()) && !/\.min\.scss$/s.test(filename.toString())) {
                    sass.render({
                        file: filename.toString(),
                        outputStyle: "expanded",
                        outFile: output_1,
                    }, function (err, result) {
                        if (!err) {
                            fs.writeFile(outputcss_1, result.css, function (err) {
                                if (!err) {
                                    filename = filename.toString().replace(core.root(), "");
                                    outputcss_1 = outputcss_1.replace(core.root(), "");
                                    new log_1.default(filename + " > " + outputcss_1 + " " + log_1.default.success("success"));
                                    core.minCSS(output_1, null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3Nhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlEQUE2QjtBQUM3Qiw2Q0FBeUI7QUFDekIsc0RBQXdCO0FBQ3hCLGdDQUFnQztBQUNoQyw2QkFBZ0M7QUFFaEM7SUFBQTtJQW9DQSxDQUFDO0lBbkNHOzs7T0FHRztJQUNJLGtCQUFJLEdBQVgsVUFBWSxRQUFnQjtRQUN4QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU07WUFDaEMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBTSxRQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlELElBQUksV0FBUyxHQUFHLFFBQU0sQ0FBQztnQkFDdkIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtvQkFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FDUDt3QkFDSSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDekIsV0FBVyxFQUFFLFVBQVU7d0JBQ3ZCLE9BQU8sRUFBRSxRQUFNO3FCQUNsQixFQUNELFVBQVUsR0FBRyxFQUFFLE1BQU07d0JBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUc7Z0NBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0NBQ04sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29DQUN4RCxXQUFTLEdBQUcsV0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0NBQy9DLElBQUksYUFBRyxDQUFJLFFBQVEsV0FBTSxXQUFTLFNBQUksYUFBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFDO29DQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQ0FDN0I7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7eUJBQ047b0JBQ0wsQ0FBQyxDQUNKLENBQUM7aUJBQ0w7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFJLFFBQVEsZUFBWSxDQUFDLENBQUM7YUFDMUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksc0NBQWEifQ==