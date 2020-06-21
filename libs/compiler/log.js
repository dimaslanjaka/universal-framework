"use strict";
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
module.exports = log;
//export default log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUErQjtBQUMvQixtREFBK0I7QUFFL0I7SUFDRTtRQUFZLGFBQXVCO2FBQXZCLFVBQXVCLEVBQXZCLHFCQUF1QixFQUF2QixJQUF1QjtZQUF2Qix3QkFBdUI7O1FBQ2pDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUNNLFNBQUssR0FBWjtRQUNDLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNNLFdBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTSxTQUFLLEdBQVosVUFBYSxHQUFXO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7O09BRUc7SUFDSSxZQUFRLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBUUQ7O09BRUc7SUFDSSxPQUFHLEdBQVY7UUFBVyxhQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLHdCQUFhOztRQUN0QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEtBQUssSUFBTSxHQUFHLElBQUksU0FBUyxFQUFFO2dCQUMzQixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxPQUFPLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQzVCLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNoQzs2QkFBTTs0QkFDTCxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDOUI7cUJBQ0Y7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtZQUNELG1CQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQTVCRDs7T0FFRztJQUNJLGtCQUFjLEdBQVksS0FBSyxDQUFDO0lBQ2hDLFdBQU8sR0FBRyxVQUFVLElBQWE7UUFDdEMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBdUJKLFVBQUM7Q0FBQSxBQWxERCxJQWtEQztBQUVELGlCQUFTLEdBQUcsQ0FBQztBQUNiLHFCQUFxQiJ9