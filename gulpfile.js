try {
    require("./dist/src/compiler/gulpfile");
} catch (error) {
    console.error(error);
}

const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const siteConfig = require("./config.json");
const spawn = require("cross-spawn");
const slash = require("slash");
const http = require("https"); // or 'https' for https:// URLs
const download = function (url, dest) {
    const file = fs.createWriteStream(dest);
    const request = http.get(url, function (response) {
        response.pipe(file);
    });
    return request;
};
const webConfig = {
    google: {
        key: siteConfig.google.key,
        recaptcha: {
            key: siteConfig.google.recaptcha.key,
        },
        analystics: {
            id: siteConfig.google.analystics.id,
        },
    },
};

/**
 * fs.readdirSync recursive
 * @param {string} dir
 * @param {(err:NodeJS.ErrnoException|null, results:string[])} done
 */
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

gulp.task("config", function (done) {
    fs.writeFileSync(path.join(__dirname, "/libs/js/_conf.ts"), "const siteConfig = " + JSON.stringify(webConfig));
    fs.writeFileSync(
        path.join(__dirname, "libs/src/compiler/config.ts"),
        "export const config = " + JSON.stringify(siteConfig)
    );

    download(
        "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts",
        "./libs/js/lib.dom.d.ts"
    );

    let interf = "";
    let modes = [];
    let modeArrays = [];
    fs.readdirSync("./node_modules/codemirror/mode", { encoding: "utf-8" }).map(function (dir, i, arr) {
        modes.push(`'${dir}'`);
        modeArrays.push(`'${dir}'[]`);
    });

    let themes = [];
    fs.readdirSync("./node_modules/codemirror/theme").map(function (file, i, arr) {
        themes.push(`'${file.replace(/\.css$/, "")}'`);
    });

    let codename = [];
    let codenames = [];
    walk("./node_modules/codemirror/addon", function (err, result) {
        if (!err) {
            let newResult = {};
            result.map(function (file) {
                let repl = file.replace(path.join(__dirname, "node_modules/codemirror/addon"), "");
                repl = slash(repl);
                repl = repl.replace(/\//g, "-");

                let id = "CodeMirror" + repl.replace(/\.(js|css)$/g, "");
                if (!newResult.hasOwnProperty(id)) {
                    newResult[id] = {};
                    codename.push(`'${id}'`);
                    codenames.push(`'${id}'[]`);
                }
                if (repl.includes(".css")) {
                    newResult[id].css = slash(file.replace(__dirname, ""));
                } else {
                    newResult[id].js = slash(file.replace(__dirname, ""));
                }
            });
            setTimeout(() => {
                //interf += `declare const CodeMirrorAddon = ${JSON.stringify(newResult, null, 4)};\n`;
                fs.writeFileSync(
                    "./libs/js/Codemirror-var.ts",
                    `const CodeMirrorAddon = ${JSON.stringify(newResult, null, 4)};\n`
                );
            }, 1000);
        }
    });

    setTimeout(() => {
        interf += `interface CodeMirrorConfig {
            addon : ${codename.join(" | ")};
            theme : ${themes.join(" | ")};
            mode : ${modes.join(" | ")};
            modes : ${modeArrays.join(" | ")};
            modeAll : ${modes.join(" | ")} | ${modeArrays.join(" | ")};
            addons : ${codenames.join(" | ")};
            addonAll : ${codename.join(" | ")} | ${codenames.join(" | ")};
        }\n`;

        fs.writeFileSync(path.join(__dirname, "libs/js/Codemirror.d.ts"), interf);

        done();
    }, 2000);
});

gulp.task("compile", function (done) {
    ["tsconfig.formsaver.json", "tsconfig.precompiler.json", "tsconfig.compiler.json", "tsconfig.build.json"].map(
        function (config, index, arr) {
            const child = spawn("tsc", ["-p", config]);
            child.addListener("error", console.error);
            child.addListener("message", console.info);
            child.stdout.on("data", function (data) {
                console.log("stdout: " + data);
            });
            child.stderr.on("data", function (data) {
                console.log("stderr: " + data);
            });
            child.stdin.on("data", function (data) {
                console.log("stdin: " + data);
            });
            if (index == arr.length - 1) done();
        }
    );
});
