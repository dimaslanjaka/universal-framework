import rimraf from "rimraf";
import * as fs from "fs";
import * as path from "path";
import log from "./log";
import core from "./core";

class filemanager {
  /**
   * Is file/folder exists?
   */
  static exist(filepath: string) {
    return fs.existsSync(filepath);
  }

  /**
   * Delete file or directory recursive
   * @param filedir
   * @param async
   * @returns null = file/dir not exists, false = delete filedir failed, true = success
   */
  static unlink(filedir: string, async?: boolean) {
    const deleteNow = function () {
      if (fs.existsSync(filedir)) {
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
        return true;
      } else {
        return false;
      }
    };
    try {
      var exists = fs.existsSync(filedir);
      if (exists) {
        return deleteNow();
      } else {
        return null;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * create file recursive
   * @param file
   * @param content
   */
  static mkfile(file: string, content: any) {
    this.mkdir(path.dirname(file));
    if (typeof content == "object" || Array.isArray(content)) {
      content = JSON.stringify(content, null, 4);
    }
    fs.writeFileSync(file, content, { encoding: "utf-8" });
    return file;
  }

  /**
   * create directory recursive
   * @param dir
   */
  static mkdir(dir: string) {
    if (!fs.existsSync(path.dirname(dir))) {
      this.mkdir(path.dirname(dir));
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return dir;
  }

  /**
   * remove all files/folders except matches regex
   * @param folder
   * @param exclude
   */
  static empty(folder: string, exclude: RegExp | null) {
    fs.readdir(folder, (err, files) => {
      if (err) {
        log.log(log.error(err.message));
      } else {
        files.forEach((file) => {
          const fileDir = path.join(folder, file);

          if (exclude) {
            if (!exclude.test(file)) {
              filemanager.unlink(fileDir, true);
            } else {
              log.log(log.error(`${fileDir} in excluded lists`));
            }
          } else {
            filemanager.unlink(fileDir, true);
          }
        });
      }
    });
  }
}

export = filemanager;
