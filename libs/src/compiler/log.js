"use strict";
var fancy_log_1 = require("fancy-log");
var chalk_1 = require("chalk");
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
