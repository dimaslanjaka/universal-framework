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
