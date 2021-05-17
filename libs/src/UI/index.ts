import * as fs from "fs";
import * as path from "path";
import * as Process from "process";
import * as http from "http";
import { readFile, list_package, asset } from "../compiler/func";
import app from "express";
//import io from "socket.io";
import * as url_core from "url";
const io = require("socket.io")(80);
console.clear();
var config: {
  app: {
    root: string;
    domain: string;
    protocol: string;
    views: string;
    environtment: "production" | "development";
  };
} = null;

try {
  if (fs.existsSync("./config.json")) {
    config = JSON.parse(fs.readFileSync("./config.json").toString());
  } else if (fs.existsSync(Process.cwd() + "/config.json")) {
    config = require(Process.cwd() + "/config.json");
  }
} catch (e) {}

if (!config) {
  console.error("config.json could not be found");
  throw new Error("config.json could not be found");
}

export /**
 *
 * @param title
 * @param content
 * @param param
 */
function template(
  title:
    | string
    | ((arg0: http.IncomingMessage, arg1: http.ServerResponse) => string),
  content?: [http.IncomingMessage, http.ServerResponse] | string,
  param?: [http.IncomingMessage, http.ServerResponse]
) {
  var status = 200;

  if (typeof title == "string") {
    var template = fs
      .readFileSync("./assets/node/template/mdb.html")
      .toString();

    var body = `./assets/node/views/${content}.html`;
    if (fs.existsSync(body)) {
      template = template.replace(
        /\%content\%/gm,
        fs.readFileSync(body).toString()
      );
    } else {
      console.warn("body not found");
      status = 404;
      template = template.replace(
        /\%content\%/gm,
        readFile(asset("./assets/node/views/404.html"))
      );
    }
    var script = `./assets/node/views/${content}.js`;
    if (fs.existsSync(script)) {
      template = template.replace(
        /\%script\%/gm,
        `<script src="${config.app.protocol}://${
          config.app.domain
        }/assets/node/views/${content}.js${
          config.app.environtment == "development"
            ? "?cache=" + new Date().getTime()
            : ""
        }"></script>`
      );
    } else {
      console.log("script not found");
    }
    param[1].writeHead(status, { "Content-Type": "text/html" });

    template = template.replace(/\%protocol\%/gm, config.app.protocol);
    template = template.replace(/\%domain\%/gm, config.app.domain);
    template = template.replace(/\%title\%/gm, title);
    template = template.replace(/\%config\%/gm, JSON.stringify(config));
    return template;
  } else if (typeof title == "function") {
    if (Array.isArray(content)) {
      content[1].writeHead(status, { "Content-Type": "application/json" });
      return title(content[0], content[1]);
    } else if (Array.isArray(param)) {
      param[1].writeHead(status, { "Content-Type": "application/json" });
      return title(param[0], param[1]);
    } else {
      return "Can't process anything :(";
    }
  }
}
export function serve(port: number = 3000) {
  const httpServer = http.createServer(function (req, res) {
    var url = req.url;
    //console.log(url);
    var routerStatic = path.join(__dirname, `/components/router/${url}.js`);
    //console.log(routerStatic, fs.existsSync(routerStatic));

    if (url === "/") {
      res.write(template("Homepage", "index", [req, res])); //write a response
    } else if (url === "/fetch") {
      res.write(
        template(
          function () {
            var installed = "./tmp/npm/local.json";
            var result = {};
            try {
              if (fs.existsSync(installed)) {
                result = JSON.parse(fs.readFileSync(installed).toString());
              } else {
                list_package();
                result = {
                  error: "package still not fetched",
                  local: {},
                  global: {},
                };
              }
            } catch (error) {
              if (error) {
                result = {};
              }
            }

            return JSON.stringify(result, null, 2);
          },
          [req, res]
        )
      ); //write a response
    } else if (fs.existsSync(routerStatic)) {
      var router = require(path.join(__dirname, "/components/router", url))
        .router;
      res.write(template(router(), [req, res]));
    } else {
      res.writeHead(302, {
        Location: `${config.app.protocol}://${config.app.domain}/${
          url_core.parse(url).pathname
        }`,
        //add other headers here...
      });
    }

    res.end(); //end the response
  });
  //new io.Server()
  const webSocket = io(httpServer);
  webSocket.on("connect", (socket: { id: any }) => {
    console.log("websocket connected", socket.id);
  });
  var numClients = 0;
  webSocket.on("connection", function (socket) {
    numClients++;
    socket.emit("stats", { numClients: numClients });

    console.log("Connected clients:", numClients);

    socket.on("disconnect", function () {
      numClients--;
      socket.emit("stats", { numClients: numClients });

      console.log("Connected clients:", numClients);
    });

    socket.emit("announcements", { message: "A new user has joined!" });
    socket.on("fetch", function (data) {
      list_package();
    });
  });

  httpServer.listen(port, function () {
    console.log("server start at port " + port);
  });
}
