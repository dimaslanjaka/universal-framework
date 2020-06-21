"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var tslib_1 = require("tslib");
var fancy_log_1 = tslib_1.__importDefault(require("fancy-log"));
var chalk = tslib_1.__importStar(require("chalk"));
var log = /** @class */ (function () {
    function log() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (arguments.length) {
            log.log(arguments);
        }
    }
    log.chalk = function () {
        return chalk;
    };
    log.success = function (msg) {
        return chalk.greenBright(msg);
    };
    log.error = function (msg) {
        return chalk.redBright(msg);
    };
    /**
     * Generate Random Hex Color
     */
    log.hexColor = function () {
        return Math.floor(Math.random() * 16777215).toString(16);
    };
    /**
     * console.log
     */
    log.log = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (arguments.length) {
            var result = [];
            for (var key in arguments) {
                if (arguments.hasOwnProperty(key)) {
                    var args = arguments[key];
                    if (typeof args == "boolean") {
                        if (args) {
                            args = chalk.greenBright(args);
                        }
                        else {
                            args = chalk.redBright(args);
                        }
                    }
                    result.push(args);
                }
            }
            fancy_log_1.default(result.join(", "));
        }
    };
    /**
     * Indicator rainbow
     */
    log.enable_rainbow = false;
    log.rainbow = function (want) {
        log.enable_rainbow = want;
    };
    return log;
}());
exports.log = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0VBQStCO0FBQy9CLG1EQUErQjtBQUUvQjtJQUNFO1FBQVksYUFBNkI7YUFBN0IsVUFBNkIsRUFBN0IscUJBQTZCLEVBQTdCLElBQTZCO1lBQTdCLHdCQUE2Qjs7UUFDdkMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBQ00sU0FBSyxHQUFaO1FBQ0MsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ00sV0FBTyxHQUFkLFVBQWUsR0FBVztRQUN4QixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNNLFNBQUssR0FBWixVQUFhLEdBQVc7UUFDdEIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRDs7T0FFRztJQUNJLFlBQVEsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFRRDs7T0FFRztJQUNJLE9BQUcsR0FBVjtRQUFXLGFBQWE7YUFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1lBQWIsd0JBQWE7O1FBQ3RCLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsS0FBSyxJQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUU7Z0JBQzNCLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDakMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixJQUFJLE9BQU8sSUFBSSxJQUFJLFNBQVMsRUFBRTt3QkFDNUIsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsSUFBSSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2hDOzZCQUFNOzRCQUNMLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUM5QjtxQkFDRjtvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1lBQ0QsbUJBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBNUJEOztPQUVHO0lBQ0ksa0JBQWMsR0FBWSxLQUFLLENBQUM7SUFDaEMsV0FBTyxHQUFHLFVBQVUsSUFBYTtRQUN0QyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUM7SUF1QkosVUFBQztDQUFBLEFBbERELElBa0RDO0FBbERZLGtCQUFHIn0=