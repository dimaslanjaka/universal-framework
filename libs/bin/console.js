/**
 * Usage for colored console output:
 * ```
 * const { c, color, colorInit } = require('./color.js').default;
 * colorInit();
 * color(c.BLUE, 'Script is processing');
 * color(c.YELLOW, 'Be careful of user input!');
 * color(c.GREEN, 'Script completed successfully.');
 * ```
 *
 * Outputs ORIGIN » MESSAGE
 * Where ORIGIN is the relative script name. E.g.:
 * ./install.js » Script is processing
 */

const c = {
  PRE: "\033[0;240;2m",
  BLUE: "\033[0;34m",
  GREEN: "\033[0;32m",
  RED: "\033[0;31m",
  YELLOW: "\033[0;33m",
  END: "\033[0m",
};

function colorInit() {
  console.clear();
  console.log(
    `\n ${c.BLUE}PROCESS ${c.GREEN}SUCCESS ${c.YELLOW}WARN ${c.RED}FAIL ${c.END} \n`
  );
}

var rexStack = /\/(.*)\.js/;

function color(which = "", message = "") {
  let stack;
  try {
    throw new Error("Get stack");
  } catch (e) {
    stack = e.stack;
  }

  const file = stack
    .split("\n")[2]
    .match(rexStack)[0]
    .replace(process.cwd(), ".");

  console.log(`${c.PRE}${file} » ${which}${message}${c.END}`);
}

const reset = "\x1b[0m";
const bright = "\x1b[1m";
const dim = "\x1b[2m";
const underscore = "\x1b[4m";
const blink = "\x1b[5m";
const reverse = "\x1b[7m";
const hidden = "\x1b[8m";

const black = "\x1b[30m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";

const BGblack = "\x1b[40m";
const BGred = "\x1b[41m";
const BGgreen = "\x1b[42m";
const BGyellow = "\x1b[43m";
const BGblue = "\x1b[44m";
const BGmagenta = "\x1b[45m";
const BGcyan = "\x1b[46m";
const BGwhite = "\x1b[47m";

/**
 * Consoler
 */
[
  ["warn", "\x1b[35m"],
  ["error", "\x1b[31m"],
  ["log", "\x1b[2m"],
].forEach(function (pair) {
  var method = pair[0],
    reset = "\x1b[0m",
    color = "\x1b[36m" + pair[1];
  console[method] = console[method].bind(
    console,
    color,
    `${method.toUpperCase()}[${new Date().toLocaleString()}]`,
    reset
  );
});

/**
 * @param {number} progress
 */
function printProgress(progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress + "%");
}

module.exports.color = color;
module.exports.red = color.red;
module.exports.progress = printProgress;
