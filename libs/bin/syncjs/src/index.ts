import Sync from "./classes/Sync";
import * as fs from "fs";

wrt();
setInterval(wrt, 5000);
function wrt() {
  fs.writeFile('./test/test.txt', new Date().toString(), function (err) { });
}

// Main Export
export default Sync;