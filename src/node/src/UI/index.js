"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var fs = require("fs");
var Process = require("process");
var http = require("http");
var func_1 = require("./components/func");
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
    http
        .createServer(function (req, res) {
        var url = req.url;
        console.log(url);
        if (url === "/") {
            res.write(template("Homepage", "index", [req, res]));
        }
        else if (url === "/fetch") {
            res.write(template(function () {
                var installed = "./tmp/npm/local.json";
                func_1.list_package();
                var result = {};
                try {
                    if (fs.existsSync(installed)) {
                        result = JSON.parse(fs.readFileSync(installed).toString());
                    }
                }
                catch (error) {
                    if (error) {
                        result = {};
                    }
                }
                if (!fs.existsSync(installed)) {
                    return "package still not fetched";
                }
                return JSON.stringify(result, null, 2);
            }, [req, res]));
        }
        else {
            res.write("<h1>404<h1>");
        }
        res.end();
    })
        .listen(port, function () {
        console.log("server start at port 3000");
    });
}
exports.serve = serve;
//# sourceMappingURL=index.js.map