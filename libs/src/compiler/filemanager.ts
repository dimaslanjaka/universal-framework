import rimraf from "rimraf";
import * as fs from "fs";
import * as path from "path";
import log from "./log";
//import { core } from "./core";
import core from "./core";

class filemanager {
  /**
   * Delete file or directory recursive
   * @param filedir
   * @param async
   * @returns null = filedir not exists, false = delete filedir failed, true = success
   */
  static unlink(filedir: string, async: boolean) {
    const execute = function () {
      if (async) {
        rimraf(filedir, function (err) {
          if (!err) {
            log.log(log.success("done"));
          } else {
            log.log(log.error(`cannot delete ${core.filelog(filedir)}`));
          }
        });
      } else {
        rimraf.sync(filedir);
      }
    };
    try {
      fs.exists(filedir, function (exists) {
        if (exists) {
          execute();
        } else {
          return null;
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * remove all files except matches regex
   * @param {string} folder
   * @param {RegExp} exclude
   */
  static empty(folder: string, exclude: RegExp) {
    fs.readdir(folder, (err, files) => {
      if (err) {
        log.log(log.error(err.message));
      } else {
        files.forEach((file) => {
          const fileDir = path.join(folder, file);

          if (exclude.test(file)) {
            filemanager.unlink(fileDir, true);
          }
        });
      }
    });
  }
}

export = filemanager;
