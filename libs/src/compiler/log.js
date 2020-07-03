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
     * random array
     * @param items
     */
    log.rand = function (items) {
        return items[Math.floor(Math.random() * items.length)];
    };
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
Object.assign(log, chalk_1.default);
module.exports = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQStCO0FBQy9CLHdEQUEwQjtBQUUxQjtJQUNFO1FBQVksYUFBNkI7YUFBN0IsVUFBNkIsRUFBN0IscUJBQTZCLEVBQTdCLElBQTZCO1lBQTdCLHdCQUE2Qjs7UUFDdkMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ1ksUUFBSSxHQUFuQixVQUFvQixLQUFZO1FBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRDs7O09BR0c7SUFDSSxRQUFJLEdBQVgsVUFBWSxHQUFRO1FBQ2xCLElBQU0sSUFBSSxHQUFHLE9BQU8sR0FBRyxDQUFDO1FBQ3hCLElBQUksSUFBSSxJQUFJLFdBQVc7WUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLElBQUksUUFBUTtZQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVE7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsSUFBSSxJQUFJLElBQUksVUFBVTtZQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixPQUFPLEdBQUcsQ0FBQyxLQUFLLENB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