"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
var fs = tslib_1.__importStar(require("fs"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var root = process_1.default.root;
/**
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
function doc(cb) {
    if (cb === void 0) { cb = null; }
    var outputDir = root + "/docs/js/";
    if (fs.existsSync(outputDir)) {
        fs.unlinkSync(outputDir);
    }
    var config = {
        recurseDepth: 10,
        tags: {
            allowUnknownTags: true,
            dictionaries: ["jsdoc", "closure"],
        },
        source: {
            include: [root + "/libs/js", root + "/libs/src"],
            includePattern: "\\.(jsx|js|ts|tsx|js(doc|x)?)$",
            excludePattern: "(/node_modules|/docs)", //||(^|\\/|\\\\)_
        },
        plugins: [
            "plugins/summarize",
            "plugins/markdown",
            "jsdoc-mermaid",
            "node_modules/better-docs/typescript",
            "node_modules/better-docs/category",
            "node_modules/better-docs/component",
            "node_modules/better-docs/typedef-import",
        ],
        opts: {
            encoding: "utf8",
            destination: outputDir,
            readme: "readme.md",
            recurse: true,
            verbose: false,
            //tutorials: root + "/docs-src/tutorials",
            template: "node_modules/better-docs",
        },
        templates: {
            cleverLinks: false,
            monospaceLinks: false,
            search: true,
            default: {
                staticFiles: {
                //include: ["./docs-src/statics"],
                },
            },
            "better-docs": {
                name: "Universal Framework Javascript Documentation",
                //logo: "images/logo.png",
                title: "Universal Framework Javascript Documentation",
                //css: "style.css",
                trackingCode: "tracking-code-which-will-go-to-the-HEAD",
                hideGenerator: false,
                navLinks: [
                    {
                        label: "Github",
                        href: "https://github.com/dimaslanjaka/universal-framework",
                    },
                    {
                        label: "Example Application",
                        href: "http://github.com/dimaslanjaka/universal-framework",
                    },
                ],
            },
        },
    };
    gulp
        .src(["./libs/**/*.(js|ts|tsx|js(doc|x)?)$"], {
        read: false,
    })
        .pipe(gulp_jsdoc3_1.default(config, cb));
}
exports.doc = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLDZDQUF5QjtBQUN6Qix3RUFBMEM7QUFDMUMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUI7Ozs7O0dBS0c7QUFDSCxTQUFnQixHQUFHLENBQUMsRUFBYztJQUFkLG1CQUFBLEVBQUEsU0FBYztJQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBQ25DLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsSUFBSSxNQUFNLEdBQUc7UUFDWCxZQUFZLEVBQUUsRUFBRTtRQUNoQixJQUFJLEVBQUU7WUFDSixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDbkM7UUFDRCxNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxFQUFFLElBQUksR0FBRyxXQUFXLENBQUM7WUFDaEQsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxjQUFjLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCO1NBQzNEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixlQUFlO1lBQ2YscUNBQXFDO1lBQ3JDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMseUNBQXlDO1NBQzFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztZQUNkLDBDQUEwQztZQUMxQyxRQUFRLEVBQUUsMEJBQTBCO1NBQ3JDO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFO2dCQUNYLGtDQUFrQztpQkFDbkM7YUFDRjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsOENBQThDO2dCQUNwRCwwQkFBMEI7Z0JBQzFCLEtBQUssRUFBRSw4Q0FBOEM7Z0JBQ3JELG1CQUFtQjtnQkFDbkIsWUFBWSxFQUFFLHlDQUF5QztnQkFDdkQsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUscURBQXFEO3FCQUM1RDtvQkFDRDt3QkFDRSxLQUFLLEVBQUUscUJBQXFCO3dCQUM1QixJQUFJLEVBQUUsb0RBQW9EO3FCQUMzRDtpQkFDRjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBRUYsSUFBSTtTQUNELEdBQUcsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO1NBQ0QsSUFBSSxDQUFDLHFCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQXJFRCxrQkFxRUMifQ==