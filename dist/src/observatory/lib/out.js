'use strict';
var chalk = require('chalk');
var OS = require('os');
var settings = require('./settings');
var stripAnsi = require('strip-ansi');
/**
 * figure out how many lines a string of text will use
 * @param text
 * @returns {number}
 */
function height(text) {
    // todo: text might include \n
    return Math.ceil(ln(text) / process.stdout.columns);
}
function writeln(currentLine, text) {
    currentLine += height(text);
    write(text + OS.EOL);
    return currentLine;
}
function write(text) {
    if (settings.write) {
        settings.write(text);
    }
}
function ln(text) {
    //return chalk.stripColor(text || '').length;
    return stripAnsi(text || '').length;
}
function padding(n) {
    return n > 0 ? new Array(n).join(' ') : '';
}
module.exports = {
    height: height,
    writeln: writeln,
    write: write,
    ln: ln,
    padding: padding,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9zcmMvb2JzZXJ2YXRvcnkvbGliL291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEM7Ozs7R0FJRztBQUNILFNBQVMsTUFBTSxDQUFDLElBQUk7SUFDbEIsOEJBQThCO0lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUk7SUFDaEMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNqQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDbEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQyxJQUFJO0lBQ2QsNkNBQTZDO0lBQzdDLE9BQU8sU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLENBQUM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLE1BQU0sRUFBRSxNQUFNO0lBQ2QsT0FBTyxFQUFFLE9BQU87SUFDaEIsS0FBSyxFQUFFLEtBQUs7SUFDWixFQUFFLEVBQUUsRUFBRTtJQUNOLE9BQU8sRUFBRSxPQUFPO0NBQ2pCLENBQUMifQ==