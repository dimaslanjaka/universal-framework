import rimraf from "rimraf";
import * as fs from "fs";
import * as path from "path";
import { log } from "./log";
import { core } from "./core";

export class filemanager {
  /**
   * Delete file or directory recursive
   * @param filedir
   * @param async
   */
  static unlink(filedir: string, async: boolean) {
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
  }

  /**
   * remove all files except matches regex
   * @param {string} folder
   * @param {RegExp} exclude
   */
  static empty(folder: string, exclude: RegExp) {
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.log(err);
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
