"use strict";

import chalk from "chalk";
import OS from "os";
import settings from "./settings";
import stripAnsi from "strip-ansi";

/**
 * figure out how many lines a string of text will use
 * @param text
 * @returns {number}
 */
function height(text: any): number {
  // todo: text might include \n
  return Math.ceil(ln(text) / process.stdout.columns);
}

function writeln(currentLine: number, text: string) {
  currentLine += height(text);
  write(text + OS.EOL);
  return currentLine;
}

function write(text: string) {
  if (settings.write) {
    settings.write(text);
  }
}

function ln(text: any) {
  //return chalk.stripColor(text || '').length;
  return stripAnsi(text || "").length;
}

function padding(n: number) {
  return n > 0 ? new Array(n).join(" ") : "";
}

export = {
  height: height,
  writeln: writeln,
  write: write,
  ln: ln,
  padding: padding,
};
