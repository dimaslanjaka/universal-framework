import * as fs from "fs";

import { LocalStorage } from "../dist/LocalStorage";
LocalStorage.prototype.hasItem = function (key: string) {
  return this.getItem(key) !== null;
};
interface newLocalStorage extends Storage {
  /**
   * Is key exists in localStorage?
   * @param key key item
   */
  hasItem(key: string): boolean;
}

let storageDir = "./tmp/storage";
if (fs.existsSync("./tmp")) {
  storageDir = "./tmp/localStorage";
} else if (fs.existsSync("./temp")) {
  storageDir = "./temp/localStorage";
} else if (fs.existsSync("./build")) {
  storageDir = "./build/localStorage";
}

var storage: newLocalStorage = new LocalStorage(storageDir);
//export var localStorage: Storage = storage;
if (typeof localStorage === "undefined" || localStorage === null) {
  if (typeof global != "undefined") {
    global.localStorage = storage;
  } else {
    const localStorage = storage;
  }
}
