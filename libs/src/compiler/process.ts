import filemanager from './filemanager';
import fs from 'fs';
import upath from 'upath';
import log from './log';
import { MD5 } from 'crypto-js';
import coreProcess from 'process';

filemanager.empty(upath.join(coreProcess.cwd(), 'tmp', 'compiler'), null);

class process {
  static verbose: boolean = false;
  /**
   * Create lock file
   * @param file
   */
  static lockCreate(file: string) {
    return upath.join(coreProcess.cwd(), 'tmp/compiler', MD5(file).toString());
  }
  /**
   * lock the process
   * @param lockfile
   */
  private static lockProcess(lockfile: string) {
    if (this.verbose) {
      log.log(log.random('locking process'));
    }
    if (!upath.resolve(upath.dirname(lockfile))) {
      filemanager.mkdir(upath.dirname(lockfile));
    }
    filemanager.mkfile(lockfile, 'lockfile');
  }
  /**
   * release lock process
   * @param lockfile
   */
  private static releaseLock(lockfile: string) {
    if (this.verbose) {
      log.log(log.random('releasing process'));
    }
    if (fs.existsSync(lockfile)) {
      filemanager.unlink(lockfile, false);
    } else {
      if (this.verbose) {
        log.log(log.error('process file already deleted'));
      }
    }
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
    if (typeof options.verbose == 'boolean') {
      this.verbose = options.verbose;
    }
    if (fs.existsSync(lockfile)) {
      return null;
    }
    this.lockProcess(lockfile);
    if (typeof callback == 'function') {
      callback(lockfile);
    } else if (typeof options == 'function') {
      options(lockfile);
    }
    this.releaseLock(lockfile);
  }
}

export = process;
