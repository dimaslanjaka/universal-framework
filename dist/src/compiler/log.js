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
     * @returns Chalk instance
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
                args = chalk_1.default.greenBright("true");
            }
            else {
                args = chalk_1.default.redBright("false");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQStCO0FBQy9CLHdEQUEwQjtBQUUxQjtJQU1JO1FBQVksYUFBNkI7YUFBN0IsVUFBNkIsRUFBN0IscUJBQTZCLEVBQTdCLElBQTZCO1lBQTdCLHdCQUE2Qjs7UUFDckMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBSSxHQUFYLFVBQVksR0FBUTtRQUNoQixJQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQztRQUN4QixJQUFJLElBQUksSUFBSSxXQUFXO1lBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxJQUFJLFFBQVE7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksSUFBSSxJQUFJLFVBQVU7WUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsSUFBSSxJQUFJLElBQUksUUFBUTtZQUFFLE9B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