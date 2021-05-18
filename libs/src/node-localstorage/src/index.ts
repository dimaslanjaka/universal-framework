import { LocalStorage } from "../dist/LocalStorage";
if (typeof localStorage === "undefined" || localStorage === null) {
  if (typeof global != "undefined") {
    global.localStorage = new LocalStorage("./tmp/storage");
  } else {
    const localStorage = new LocalStorage("./tmp/storage");
  }
}
