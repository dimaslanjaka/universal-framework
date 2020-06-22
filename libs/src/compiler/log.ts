import logger from "fancy-log";
import chalk from "chalk";

class log {
  constructor(...arg: string[] | any | null) {
    if (arguments.length) {
      log.log(arguments);
    }
  }
  /**
   * Chalk instance
   */
  static chalk(): chalk.Chalk {
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
   * Output log custom hex color
   * @param hex hex color
   * @param msg message to output
   */
  static hex(hex: string, msg: string) {
    return chalk.hex(hex)(msg);
  }
  /**
   * Indicator rainbow
   */
  static enable_rainbow: boolean = false;
  static rainbow = function (want: boolean) {
    log.enable_rainbow = want;
  };
  /**
   * console.log
   */
  static log(...arg: any[]) {
    if (arguments.length) {
      var result = [];
      for (const key in arguments) {
        if (arguments.hasOwnProperty(key)) {
          var args = log.prettyprint(arguments[key]);
          result.push(args);
        }
      }
      logger(result.join(", "));
    }
  }

  static prettyprint(args: any) {
    if (typeof args == "boolean") {
      if (args) {
        args = chalk.greenBright(args);
      } else {
        args = chalk.redBright(args);
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
}
export = log;