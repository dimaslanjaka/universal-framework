import * as upath from 'upath';
import { readFileSync } from 'fs';
import Config from './Config';
import core from './../compiler/core';
import filemanager from './../compiler/filemanager';
import log from './../compiler/log';
export default class local {
  localpath: string;
  constructor(private config: Config) {
    this.localpath = config.localPath;
  }
  fetch() {
    const path = this.localpath;
    var read = core.readdir(path, [], this.config.ignores);
    return read;
  }
}
