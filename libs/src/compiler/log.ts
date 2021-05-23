import logger from "fancy-log";
import chalk from "chalk";

class log {
    /**
     * Indicator rainbow
     */
    static enable_rainbow = false;

    constructor(...arg: string[] | any | null) {
        if (arguments.length) {
            log.log(arguments);
        }
    }

    /**
     * return color by their type
     * @param any
     */
    static type(any: any) {
        const type = typeof any;
        if (type == "undefined") return log.error(any);
        if (type == "string") return log.string(any);
        if (type == "number" || type == "bigint") return log.number(any);
        if (type == "function") return log.chalk().magentaBright(any);
        if (type == "boolean") {
            if (!any) {
                return log.error(any);
            } else {
                return log.success(any);
            }
        }
        if (type == "object") return log.chalk().cyan(any);
        if (type == "symbol") return log.chalk().hex("#DC143C")(any);
    }

    static string(msg: any) {
        return log.hex(log.rand(["#FF8C00", "#FFA500", "#FF7F50"]), msg);
    }

    static number(msg: any) {
        return log.hex(log.rand(["#7CFC00", "#7FFF00", "#ADFF2F", "#808000", "#98FB98"]), msg);
    }

    /**
     * Chalk instance
     * @returns Chalk instance
     */
    static chalk() {
        return chalk;
    }

    /**
     * return greenBright color
     * @param msg
     */
    static success(msg: string) {
        return chalk.greenBright(msg);
    }

    /**
     * return redBright color
     * @param msg
     */
    static error(msg: string) {
        return chalk.redBright(msg);
    }

    /**
     * Clear console
     */
    static clear() {
        return console.clear();
    }

    /**
     * Generate Random Hex Color
     */
    static hexColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    /**
     * Random Color
     * @param msg
     */
    static random(msg: string) {
        return this.hex(`#${this.hexColor()}`, msg);
    }

    /**
     * Color By Name
     * @param colorstr
     * @param msg
     */
    static color(colorstr: string, msg: string) {
        return chalk.keyword(colorstr)(msg);
    }

    /**
     * Output log custom hex color
     * @param hex hex color
     * @param msg message to output
     */
    static hex(hex: string, msg: string) {
        return chalk.hex(hex)(msg);
    }

    static rainbow = function (want: boolean) {
        log.enable_rainbow = want;
    };

    /**
     * console.log
     */
    static log(...arg: any[]) {
        if (arguments.length) {
            const result = [];
            for (const key in arguments) {
                if (arguments.hasOwnProperty(key)) {
                    const args = log.prettyprint(arguments[key]);
                    result.push(args);
                }
            }
            logger(result.join(", "));
        }
    }

    static prettyprint(args: any) {
        if (typeof args == "boolean") {
            if (args) {
                args = chalk.greenBright("true");
            } else {
                args = chalk.redBright("false");
            }
        } else if (typeof args == "string") {
            args = chalk.hex("#c4750e")(args);
        } else if (typeof args == "object" || Array.isArray(args)) {
            args = this.prettyprint(JSON.stringify(args, null, 2));
        } else if (typeof args == "undefined") {
            args = chalk.red("undefined");
        }
        return args;
    }

    /**
     * random array
     * @param items
     */
    private static rand(items: any[]) {
        return items[Math.floor(Math.random() * items.length)];
    }
}

Object.assign(log, chalk);

export = log;
