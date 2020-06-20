"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = require("fancy-log");
const chalk = require('chalk');
class log {
    constructor(...arg) {
        if (arguments.length) {
            log.log(arguments);
        }
    }
    static chalk() {
        return chalk;
    }
    static success(msg) {
        return chalk.greenBright(msg);
    }
    static error(msg) {
        return chalk.redBright(msg);
    }
    /**
     * Generate Random Hex Color
     */
    static hexColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }
    /**
     * console.log
     */
    static log(...arg) {
        if (arguments.length) {
            var result = [];
            for (const key in arguments) {
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
    }
}
/**
 * Indicator rainbow
 */
log.enable_rainbow = false;
log.rainbow = function (want) {
    log.enable_rainbow = want;
};
exports.default = log;
//# sourceMappingURL=log.js.map