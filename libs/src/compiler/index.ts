import core from "./core";
import * as misc from "./framework";
import filemanager from "./filemanager";
import log from "./log";
import sorter from "./sorter";
import process from "./process";
import { backup, fromRoot } from "./../archiver/backup";

class framework extends core {
  filemanager: filemanager = filemanager;
  static filemanager: filemanager = filemanager;
  static misc = misc.dimas;
  sorter: sorter = sorter;
  static sorter: sorter = sorter;
  process: process = process;
  static process: process = process;
  static pathFromRoot = fromRoot;
  pathFromRoot = fromRoot;
  static backup = backup;
  backup = backup;
}

export = framework;
