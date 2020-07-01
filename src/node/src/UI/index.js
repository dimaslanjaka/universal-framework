"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var Process = tslib_1.__importStar(require("process"));
var http = tslib_1.__importStar(require("http"));
var func_1 = require("./components/func");
var socket_io_1 = tslib_1.__importDefault(require("socket.io"));
var url_core = tslib_1.__importStar(require("url"));
function serve(port) {
    if (port === void 0) { port = 3000; }
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
        return;
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
                template = template.replace(/\%content\%/gm, fs.readFileSync("./assets/node/views/404.html").toString());
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
    var httpServer = http.createServer(function (req, res) {
        var url = req.url;
        var routerStatic = path.join(__dirname, "/components/router/" + url + ".js");
        console.log(routerStatic, fs.existsSync(routerStatic));
        if (url === "/") {
            res.write(template("Homepage", "index", [req, res]));
        }
        else if (fs.existsSync(path.join(__dirname, "/components/router/" + url + ".js"))) {
            res.write(template(require(path.join(__dirname, "/components/router", url))));
        }
        else {
            res.writeHead(302, {
                Location: config.app.protocol + "://" + config.app.domain + "/" + url_core.parse(url).pathname,
            });
        }
        res.end();
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
//# sourceMappingURL=index.js.map