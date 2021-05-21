"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = exports.template = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var Process = tslib_1.__importStar(require("process"));
var http = tslib_1.__importStar(require("http"));
var func_1 = require("../compiler/func");
//import io from "socket.io";
var url_core = tslib_1.__importStar(require("url"));
var io = require("socket.io")(80);
console.clear();
var config = null;
try {
    if (fs.existsSync("./config.json")) {
        config = JSON.parse(fs.readFileSync("./config.json").toString());
    }
    else if (fs.existsSync(Process.cwd() + "/config.json")) {
        config = require(Process.cwd() + "/config.json");
    }
}
catch (e) { }
if (!config) {
    console.error("config.json could not be found");
    throw new Error("config.json could not be found");
}
function template(title, content, param) {
    var status = 200;
    if (typeof title == "string") {
        var template = fs
            .readFileSync("./assets/node/template/mdb.html")
            .toString();
        var body = "./assets/node/views/" + content + ".html";
        if (fs.existsSync(body)) {
            template = template.replace(/\%content\%/gm, fs.readFileSync(body).toString());
        }
        else {
            console.warn("body not found");
            status = 404;
            template = template.replace(/\%content\%/gm, func_1.readFile(func_1.asset("./assets/node/views/404.html")));
        }
        var script = "./assets/node/views/" + content + ".js";
        if (fs.existsSync(script)) {
            template = template.replace(/\%script\%/gm, "<script src=\"" + config.app.protocol + "://" + config.app.domain + "/assets/node/views/" + content + ".js" + (config.app.environtment == "development"
                ? "?cache=" + new Date().getTime()
                : "") + "\"></script>");
        }
        else {
            console.log("script not found");
        }
        param[1].writeHead(status, { "Content-Type": "text/html" });
        template = template.replace(/\%protocol\%/gm, config.app.protocol);
        template = template.replace(/\%domain\%/gm, config.app.domain);
        template = template.replace(/\%title\%/gm, title);
        template = template.replace(/\%config\%/gm, JSON.stringify(config));
        return template;
    }
    else if (typeof title == "function") {
        if (Array.isArray(content)) {
            content[1].writeHead(status, { "Content-Type": "application/json" });
            return title(content[0], content[1]);
        }
        else if (Array.isArray(param)) {
            param[1].writeHead(status, { "Content-Type": "application/json" });
            return title(param[0], param[1]);
        }
        else {
            return "Can't process anything :(";
        }
    }
}
exports.template = template;
function serve(port) {
    if (port === void 0) { port = 3000; }
    var httpServer = http.createServer(function (req, res) {
        var url = req.url;
        //console.log(url);
        var routerStatic = path.join(__dirname, "/components/router/" + url + ".js");
        //console.log(routerStatic, fs.existsSync(routerStatic));
        if (url === "/") {
            res.write(template("Homepage", "index", [req, res])); //write a response
        }
        else if (url === "/fetch") {
            res.write(template(function () {
                var installed = "./tmp/npm/local.json";
                var result = {};
                try {
                    if (fs.existsSync(installed)) {
                        result = JSON.parse(fs.readFileSync(installed).toString());
                    }
                    else {
                        func_1.list_package();
                        result = {
                            error: "package still not fetched",
                            local: {},
                            global: {},
                        };
                    }
                }
                catch (error) {
                    if (error) {
                        result = {};
                    }
                }
                return JSON.stringify(result, null, 2);
            }, [req, res])); //write a response
        }
        else if (fs.existsSync(routerStatic)) {
            var router = require(path.join(__dirname, "/components/router", url))
                .router;
            res.write(template(router(), [req, res]));
        }
        else {
            res.writeHead(302, {
                Location: config.app.protocol + "://" + config.app.domain + "/" + url_core.parse(url).pathname,
                //add other headers here...
            });
        }
        res.end(); //end the response
    });
    //new io.Server()
    var webSocket = io(httpServer);
    webSocket.on("connect", function (socket) {
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
            func_1.list_package();
        });
    });
    httpServer.listen(port, function () {
        console.log("server start at port " + port);
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9VSS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkNBQXlCO0FBQ3pCLGlEQUE2QjtBQUM3Qix1REFBbUM7QUFDbkMsaURBQTZCO0FBQzdCLHlDQUFpRTtBQUVqRSw2QkFBNkI7QUFDN0Isb0RBQWdDO0FBQ2hDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEIsSUFBSSxNQUFNLEdBUU4sSUFBSSxDQUFDO0FBRVQsSUFBSTtJQUNGLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNsQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDbEU7U0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLGNBQWMsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0tBQ2xEO0NBQ0Y7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBRWQsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Q0FDbkQ7QUFFRCxTQU1TLFFBQVEsQ0FDZixLQUV1RSxFQUN2RSxPQUE4RCxFQUM5RCxLQUFtRDtJQUVuRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFFakIsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7UUFDNUIsSUFBSSxR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