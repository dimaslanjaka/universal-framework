import core from './core';
import * as misc from './framework';
import filemanager from './filemanager';
import log from './log';
import sorter from './sorter';
import process from './process';
import * as locutus from '../locutus/src/index';
var sprintf = locutus.php.strings.sprintf;
//var sprintf = require('./libs/src/locutus/src/php/strings/sprintf');

/**
 * @class {core}
 * @extends {core}
 * @inheritdoc {core}
 */
class framework extends core {
  filemanager = filemanager;
  static filemanager = filemanager;
  static misc = misc.dimas;
  log = log;
  static log = log;
  static array = {
    sorter: sorter,
  };
  process = process;
  static process = process;
}

export = framework;
module.exports = sprintf;
