import * as process from "process";
import * as upath from "upath";
import * as path from "path";
const root = function (): string {
  var appDir = upath
    .normalizeSafe(path.dirname(require.main.filename))
    .toString();
  if (/\/libs\/compiler$/s.test(appDir)) {
    var split = appDir.split("/");
    split = split.slice(0, -2);
    appDir = split.join("/");
  }
  return appDir;
};
var config: {
  database: {
    user: string;
    pass: string;
    dbname: string;
    host: string;
    port: string;
  };
  google: {
    key: string;
    client: string;
    secret: string;
    redirect: string;
  };
  cache: {
    enable: string;
    ext: string;
    key: string;
    timeout: string;
  };
  htaccess: {
    cache: string;
  };
  vscode: {
    tasks: [
      {
        version: string;
        tasks: [
          {
            label: string;
            type: string;
            command: string;
            isBackground: boolean;
            presentation: {
              echo: boolean;
              reveal: string;
              focus: boolean;
              panel: string;
              showReuseMessage: boolean;
              clear: boolean;
            };
            runOptions: {
              runOn: string;
            };
          },
          {
            label: string;
            type: string;
            command: string;
            isBackground: boolean;
            presentation: {
              echo: boolean;
              reveal: string;
              focus: boolean;
              panel: string;
              showReuseMessage: boolean;
              clear: boolean;
            };
            runOptions: {
              runOn: string;
            };
          }
        ];
      }
    ];
  };
  app: {
    views: string;
    root: string;
    domain: string;
    protocol: string;
    environtment: string;
  };
  security: {
    salt: string;
  };
  session: [];
  root: string;
  $schema: string;
} = require(`${process.cwd()}/config.json`);
config.root = root();
export = config;
