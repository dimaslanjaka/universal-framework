import core from './core';
import * as misc from './framework';
import filemanager from './filemanager';
import log from './log';
import sorter from './sorter';
import process from './process';

class framework extends core {
  filemanager: filemanager = filemanager;
  static filemanager: filemanager = filemanager;
  static misc = misc.dimas;
  log: log = log;
  static log: log = log;
  sorter: sorter = sorter;
  static sorter: sorter = sorter;
  process: process = process;
  static process: process = process;
}

export = framework;
