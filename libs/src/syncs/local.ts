import Config from "./Config";
import filemanager from "./../compiler/filemanager";

export default class local {
  localpath: string;

  constructor(private config: Config) {
    this.localpath = config.localPath;
  }

  fetch() {
    const path = this.localpath;
    const read = filemanager.readdir(path, [], this.config.ignores);
    return read;
  }
}
