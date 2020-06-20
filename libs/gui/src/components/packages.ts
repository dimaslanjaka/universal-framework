const process = require("child_process");

class packages {
  static npmls(cb) {
    return process.exec("npm ls --json", function (err, stdout, stderr) {
      if (err) return cb(err);
      cb(null, JSON.parse(stdout));
    });
  }
}
 