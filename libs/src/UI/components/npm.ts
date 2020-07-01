export class npm {
  static args = [];
  /**
   * Install package
   * @param pkg
   */
  static install(pkg: string | any[]) {
    if (typeof pkg == "string") {
      this.args.push({ install: pkg });
    } else if (Array.isArray(pkg)) {
      pkg.forEach(function (item) {
        npm.args.push({ install: item });
      });
    }
    this.run();
    return this;
  }

  static timer_run: any = null;
  static run() {
    if (this.args && this.args.length) {
      if (this.timer_run) {
        clearTimeout(this.timer_run);
      }
      setTimeout(function () {
        npm.timer_run = setTimeout(function () {
          npm.run();
        }, 3000);
      }, 200);
      if (this.running) {
        return;
      }
      var args = this.args[0];
      if (typeof args == "object") {
        for (const key in args) {
          if (args.hasOwnProperty(key)) {
            if (typeof key == "string" && typeof args[key] == "string") {
              console.log("npm", args);
              npm.npm([key, args[key]]);
            }
          }
        }
      }
      this.args.shift();
    }
  }

  private static running = null;
  static npm(args: string[]) {
    execute(`npm ${args.join(" ")}`);
  }
}
