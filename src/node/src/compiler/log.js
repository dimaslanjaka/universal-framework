"use strict";
var tslib_1 = require("tslib");
var fancy_log_1 = tslib_1.__importDefault(require("fancy-log"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var log = (function () {
    function log() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (arguments.length) {
            log.log(arguments);
        }
    }
    log.rand = function (items) {
        return items[Math.floor(Math.random() * items.length)];
    };
    log.type = function (any) {
        var type = typeof any;
        if (type == "undefined")
            return log.error(any);
        if (type == "string")
            return log.string(any);
        if (type == "number" || type == "bigint")
            return log.number(any);
        if (type == "function")
            return log.chalk().magentaBright(any);
        if (type == "boolean") {
            if (!any) {
                return log.error(any);
            }
            else {
                return log.success(any);
            }
        }
        if (type == "object")
            return log.chalk().cyan(any);
        if (type == "symbol")
            return log.chalk().hex("#DC143C")(any);
    };
    log.string = function (msg) {
        return log.hex(log.rand(["#FF8C00", "#FFA500", "#FF7F50"]), msg);
    };
    log.number = function (msg) {
        return log.hex(log.rand(["#7CFC00", "#7FFF00", "#ADFF2F", "#808000", "#98FB98"]), msg);
    };
    log.chalk = function () {
        return chalk_1.default;
    };
    log.success = function (msg) {
        return chalk_1.default.greenBright(msg);
    };
    log.error = function (msg) {
        return chalk_1.default.redBright(msg);
    };
    log.clear = function () {
        return console.clear();
    };
    log.hexColor = function () {
        return Math.floor(Math.random() * 16777215).toString(16);
    };
    log.random = function (msg) {
        return this.hex("#" + this.hexColor(), msg);
    };
    log.hex = function (hex, msg) {
        return chalk_1.default.hex(hex)(msg);
    };
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
    log.enable_rainbow = false;
    log.rainbow = function (want) {
        log.enable_rainbow = want;
    };
    return log;
}());
Object.assign(log, chalk_1.default);
module.exports = log;
//# sourceMappingURL=log.js.map