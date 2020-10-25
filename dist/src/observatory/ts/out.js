"use strict";
var tslib_1 = require("tslib");
var os_1 = tslib_1.__importDefault(require("os"));
var settings_1 = tslib_1.__importDefault(require("./settings"));
var strip_ansi_1 = tslib_1.__importDefault(require("strip-ansi"));
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
    write(text + os_1.default.EOL);
    return currentLine;
}
function write(text) {
    if (settings_1.default.write) {
        settings_1.default.write(text);
    }
}
function ln(text) {
    //return chalk.stripColor(text || '').length;
    return strip_ansi_1.default(text || "").length;
}
function padding(n) {
    return n > 0 ? new Array(n).join(" ") : "";
}
module.exports = {
    height: height,
    writeln: writeln,
    write: write,
    ln: ln,
    padding: padding,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9zcmMvb2JzZXJ2YXRvcnkvdHMvb3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFHYixrREFBb0I7QUFDcEIsZ0VBQWtDO0FBQ2xDLGtFQUFtQztBQUVuQzs7OztHQUlHO0FBQ0gsU0FBUyxNQUFNLENBQUMsSUFBUztJQUN2Qiw4QkFBOEI7SUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxXQUFtQixFQUFFLElBQVk7SUFDaEQsV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixLQUFLLENBQUMsSUFBSSxHQUFHLFlBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsSUFBWTtJQUN6QixJQUFJLGtCQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2xCLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQUVELFNBQVMsRUFBRSxDQUFDLElBQVM7SUFDbkIsNkNBQTZDO0lBQzdDLE9BQU8sb0JBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxDQUFTO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDN0MsQ0FBQztBQUVELGlCQUFTO0lBQ1AsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsT0FBTztJQUNoQixLQUFLLEVBQUUsS0FBSztJQUNaLEVBQUUsRUFBRSxFQUFFO0lBQ04sT0FBTyxFQUFFLE9BQU87Q0FDakIsQ0FBQyJ9