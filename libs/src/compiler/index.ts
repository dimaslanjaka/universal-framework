import core from "./core";
import * as misc from "./framework";
import filemanager from "./filemanager";
import log from "./log";
import sorter from "./sorter";
/*
const framework = {};
Object.assign(framework, core, misc);
*/

class framework extends core {
  filemanager = filemanager;
  misc = misc.dimas;
  log = log;
  array = {
    sorter: sorter,
  };
}
export = framework;
