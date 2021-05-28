const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const siteConfig = require("./config.json");
const spawn = require("cross-spawn");
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

gulp.task("config", function (done) {
    fs.writeFileSync(path.join(__dirname, "/libs/js/_conf.ts"), "const siteConfig = " + JSON.stringify(webConfig));
    fs.writeFileSync(
        path.join(__dirname, "libs/src/compiler/config.ts"),
        "export const config = " + JSON.stringify(siteConfig)
    );

    download(
        "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts",
        "./libs/js/lib.dom.d.ts"
    )._final(done);
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

try {
    require("./dist/src/compiler/gulpfile");
} catch (error) {
    console.error(error);
}
