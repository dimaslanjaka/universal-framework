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
     * return color by their type
     * @param any
     */
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
     * Color By Name
     * @param colorstr
     * @param msg
     */
    log.color = function (colorstr, msg) {
        return chalk_1.default.keyword(colorstr)(msg);
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
     * random array
     * @param items
     */
    log.rand = function (items) {
        return items[Math.floor(Math.random() * items.length)];
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
Object.assign(log, chalk_1.default);
module.exports = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQStCO0FBQy9CLHdEQUEwQjtBQUUxQjtJQU1FO1FBQVksYUFBNkI7YUFBN0IsVUFBNkIsRUFBN0IscUJBQTZCLEVBQTdCLElBQTZCO1lBQTdCLHdCQUE2Qjs7UUFDdkMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBSSxHQUFYLFVBQVksR0FBUTtRQUNsQixJQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQztRQUN4QixJQUFJLElBQUksSUFBSSxXQUFXO1lBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxJQUFJLFFBQVE7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksSUFBSSxJQUFJLFVBQVU7WUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNGO1FBQ0QsSUFBSSxJQUFJLElBQUksUUFBUTtZQUFFLE9B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