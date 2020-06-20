
import core from "./core";
var config: {
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
} = require(`${core.root()}/config.json`);

export default config;