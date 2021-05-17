import core from "./core";
import * as misc from "./framework";
import filemanager from "./filemanager";
//import log from "./log";
import sorter from "./sorter";
import process from "./process";
import { backup, fromRoot } from "./../archiver/backup";

class framework extends core {
  static filemanager: filemanager = filemanager;
  static misc = misc.dimas;
  static sorter: sorter = sorter;
  static process: process = process;
  static pathFromRoot = fromRoot;
  static backup = backup;
  filemanager: filemanager = filemanager;
  sorter: sorter = sorter;
  process: process = process;
  pathFromRoot = fromRoot;
  backup = backup;
}

export = framework;
