"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = exports.template = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var Process = tslib_1.__importStar(require("process"));
var http = tslib_1.__importStar(require("http"));
var func_1 = require("../compiler/func");
var socket_io_1 = tslib_1.__importDefault(require("socket.io"));
var url_core = tslib_1.__importStar(require("url"));
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
            });
        }
        res.end(); //end the response
    });
    var webSocket = socket_io_1.default(httpServer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9VSS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkNBQXlCO0FBQ3pCLGlEQUE2QjtBQUM3Qix1REFBbUM7QUFDbkMsaURBQTZCO0FBQzdCLHlDQUFpRTtBQUVqRSxnRUFBMkI7QUFDM0Isb0RBQWdDO0FBRWhDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FRTixJQUFJLENBQUM7QUFFVCxJQUFJO0lBQ0YsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUNsRTtTQUFNLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDLEVBQUU7UUFDeEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7S0FDbEQ7Q0FDRjtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZCxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztDQUNuRDtBQUVELFNBTVMsUUFBUSxDQUNmLEtBRXVFLEVBQ3ZFLE9BQThELEVBQzlELEtBQW1EO0lBRW5ELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUVqQixJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtRQUM1QixJQUFJLFFBQVEsR0FBRyxFQUFFO2FBQ2QsWUFBWSxDQUFDLGlDQUFpQyxDQUFDO2FBQy9DLFFBQVEsRUFBRSxDQUFD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