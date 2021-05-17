import filemanager from "./filemanager";
import fs from "fs";
import upath from "upath";
import log from "./log";
import { MD5 } from "crypto-js";
import coreProcess from "process";

const savetemp = "./tmp/compiler";
if (fs.existsSync(savetemp)) {
  filemanager.empty(upath.join(coreProcess.cwd(), savetemp), null);
}

class process {
  static root = coreProcess.cwd();
  static verbose: boolean = false;
  static tmp = savetemp;

  /**
   * Create lock file
   * @param file
   */
  static lockCreate(file: string) {
    return upath.join(coreProcess.cwd(), this.tmp, MD5(file).toString());
  }

  /**
   * do process
   * @param lockfile
   * @param callback
   */
  static doProcess(
    lockfile: string,
    options: { verbose: boolean } | any,
    callback: Function
  ) {
    if (typeof options.verbose == "boolean") {
      this.verbose = options.verbose;
    }
    lockfile = process.lockCreate(lockfile);
    if (fs.existsSync(lockfile)) {
      log.log(
        log.error(`Process locked (${lockfile}). please provide unique ids.`)
      );
      return null;
    }
    const doCall = function () {
      if (typeof callback == "function") {
        return callback(lockfile);
      } else if (typeof options == "function") {
        return options(lockfile);
      }
    };
    process.lockProcess(lockfile);
    const load = new Promise((resolve, reject) => {
      doCall();
      resolve(true);
    });
    load.then(function () {
      process.releaseLock(lockfile);
    });
  }

  /**
   * lock the process
   * @param lockfile
   */
  private static lockProcess(lockfile: string) {
    if (this.verbose) {
      log.log(log.random("locking process"));
    }
    if (!upath.resolve(upath.dirname(lockfile))) {
      filemanager.mkdir(upath.dirname(lockfile));
    }
    filemanager.mkfile(lockfile, "lockfile");
  }

  /**
   * release lock process
   * @param lockfile
   */
  private static releaseLock(lockfile: string) {
    if (this.verbose) {
      log.log(log.random("releasing process"));
    }
    if (fs.existsSync(lockfile)) {
      filemanager.unlink(lockfile, false);
    } else {
      if (this.verbose) {
        log.log(log.error("process file already deleted"));
      }
    }
  }
}

export = process;
