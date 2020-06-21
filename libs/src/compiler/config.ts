//import { core } from "./core";
import * as process from "process";
import * as upath from "upath";
import * as path from "path";

const root =  function(): string {
  var appDir = upath.normalizeSafe(path.dirname(require.main.filename)).toString();
  if (/\/libs\/compiler$/s.test(appDir)) {
    var split = appDir.split("/");
    split = split.slice(0, -2);
    appDir = split.join("/");
  }
  return appDir;
}
var config: {
  /**
   * Root directory
   */
  root: string,
  database: {
    user: string;
    pass: string;
    dbname: string;
    host: string;
    port: 3306;
  };
  google: {
    key: string;
    client: string;
    secret: string;
  };
  cache: {
    enable: true;
    ext: string;
    key: string;
    timeout: 60;
  };
  htaccess: {
    cache: true;
  };
  vscode: {
    tasks: [
      {
        version: string;
        tasks: [
          {
            label: "Compiler Dist";
            type: "shell";
            command: "npm run index";
            isBackground: true;
            presentation: {
              echo: true;
              reveal: "always";
              focus: false;
              panel: "dedicated";
              showReuseMessage: true;
              clear: true;
            };
            runOptions: {
              runOn: "folderOpen";
            };
          },
          {
            label: "Compiler Dev";
            type: "shell";
            command: "npm run index-watch";
            isBackground: true;
            presentation: {
              echo: true;
              reveal: "always";
              focus: false;
              panel: "dedicated";
              showReuseMessage: true;
              clear: true;
            };
            runOptions: {
              runOn: "folderOpen";
            };
          }
        ];
      }
    ];
  };
  app: {
    views: "views";
    root: "";
  };
} = require(`${process.cwd()}/config.json`);
config.root = root();

export = config;
//export default config;
