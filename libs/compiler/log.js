"use strict";
var tslib_1 = require("tslib");
var fancy_log_1 = tslib_1.__importDefault(require("fancy-log"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
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
    /**
     * Chalk instance
     */
    log.chalk = function () {
        return chalk_1.default;
    };
    /**
     * return greenBright color
     * @param msg
     */
    log.success = function (msg) {
        return chalk_1.default.greenBright(msg);
    };
    /**
     * return redBright color
     * @param msg
     */
    log.error = function (msg) {
        return chalk_1.default.redBright(msg);
    };
    /**
     * Clear console
     */
    log.clear = function () {
        return console.clear();
    };
    /**
     * Generate Random Hex Color
     */
    log.hexColor = function () {
        return Math.floor(Math.random() * 16777215).toString(16);
    };
    /**
     * Random Color
     * @param msg
     */
    log.random = function (msg) {
        return this.hex("#" + this.hexColor(), msg);
    };
    /**
     * Output log custom hex color
     * @param hex hex color
     * @param msg message to output
     */
    log.hex = function (hex, msg) {
        return chalk_1.default.hex(hex)(msg);
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
                    var args = log.prettyprint(arguments[key]);
                    result.push(args);
                }
            }
            fancy_log_1.default(result.join(", "));
        }
    };
    log.prettyprint = function (args) {
        if (typeof args == "boolean") {
            if (args) {
                args = chalk_1.default.greenBright(args);
            }
            else {
                args = chalk_1.default.redBright(args);
            }
        }
        else if (typeof args == "string") {
            args = chalk_1.default.hex("#c4750e")(args);
        }
        else if (typeof args == "object" || Array.isArray(args)) {
            args = this.prettyprint(JSON.stringify(args, null, 2));
        }
        else if (typeof args == "undefined") {
            args = chalk_1.default.red("undefined");
        }
        return args;
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
module.exports = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUErQjtBQUMvQix3REFBMEI7QUFFMUI7SUFDRTtRQUFZLGFBQTZCO2FBQTdCLFVBQTZCLEVBQTdCLHFCQUE2QixFQUE3QixJQUE2QjtZQUE3Qix3QkFBNkI7O1FBQ3ZDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUNEOztPQUVHO0lBQ0ksU0FBSyxHQUFaO1FBQ0UsT0FBTyxlQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksV0FBTyxHQUFkLFVBQWUsR0FBVztRQUN4QixPQUFPLGVBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7T0FHRztJQUNJLFNBQUssR0FBWixVQUFhLEdBQVc7UUFDdEIsT0FBTyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRDs7T0FFRztJQUNJLFNBQUssR0FBWjtRQUNFLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRDs7T0FFRztJQUNJLFlBQVEsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFNLEdBQWIsVUFBYyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFRLEVBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLE9BQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxHQUFXO1FBQ2pDLE9BQU8sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBUUQ7O09BRUc7SUFDSSxPQUFHLEdBQVY7UUFBVyxhQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLHdCQUFhOztRQUN0QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEtBQUssSUFBTSxHQUFHLElBQUksU0FBUyxFQUFFO2dCQUMzQixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25CO2FBQ0Y7WUFDRCxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFTSxlQUFXLEdBQWxCLFVBQW1CLElBQVM7UUFDMUIsSUFBSSxPQUFPLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxHQUFHLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7U0FDRjthQUFNLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ2xDLElBQUksR0FBRyxlQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6RCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUFNLElBQUksT0FBTyxJQUFJLElBQUksV0FBVyxFQUFFO1lBQ3JDLElBQUksR0FBRyxlQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdENEOztPQUVHO0lBQ0ksa0JBQWMsR0FBWSxLQUFLLENBQUM7SUFDaEMsV0FBTyxHQUFHLFVBQVUsSUFBYTtRQUN0QyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUM7SUFpQ0osVUFBQztDQUFBLEFBNUZELElBNEZDO0FBQ0QsaUJBQVMsR0FBRyxDQUFDIn0=