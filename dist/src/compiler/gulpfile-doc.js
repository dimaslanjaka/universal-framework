"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var root = process_1.default.root;
/**
 * Better-Docs JSDoc
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
function doc(cb) {
    if (cb === void 0) { cb = null; }
    var outputDir = root + "/docs/js/";
    try {
        if (filemanager_1.default.exist(outputDir)) {
            filemanager_1.default.unlink(outputDir);
        }
    }
    catch (e) {
        console.log(e);
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
            excludePattern: "[\\/\\\\]node_modules|docs|dist[\\/\\\\]",
        },
        plugins: [
            //"plugins/summarize",
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
            tutorials: root + "/docs/statics",
            template: "node_modules/better-docs",
        },
        templates: {
            cleverLinks: false,
            monospaceLinks: false,
            search: true,
            default: {
                staticFiles: {
                    include: [root + "/docs/statics"],
                },
            },
            "better-docs": {
                name: "Universal Framework Javascript Documentation",
                //logo: "images/logo.png",
                title: "Universal Framework Javascript Documentation",
                //css: "style.css",
                trackingCode: "<script data-ad-client=\"ca-pub-1165447249910969\" async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-106238155-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-106238155-1');\n</script>\n",
                hideGenerator: true,
                navLinks: [
                    {
                        label: "Github",
                        href: "https://github.com/dimaslanjaka/universal-framework",
                    },
                    {
                        label: "Usages And Tutorial",
                        href: "../statics",
                    },
                ],
            },
        },
    };
    return gulp
        .src(["./libs/**/*.(js|ts|tsx|js(doc|x)?)$"], {
        read: false,
    })
        .pipe(gulp_jsdoc3_1.default(config, cb));
}
exports.doc = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLHdFQUEwQztBQUMxQyxzRUFBd0M7QUFFeEMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUI7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsR0FBRyxDQUFDLEVBQWM7SUFBZCxtQkFBQSxFQUFBLFNBQWM7SUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUNyQyxJQUFJO1FBQ0YsSUFBSSxxQkFBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsSUFBTSxNQUFNLEdBQUc7UUFDYixZQUFZLEVBQUUsRUFBRTtRQUNoQixJQUFJLEVBQUU7WUFDSixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDbkM7UUFDRCxNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxFQUFFLElBQUksR0FBRyxXQUFXLENBQUM7WUFDaEQsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxjQUFjLEVBQUUsMENBQTBDO1NBQzNEO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQixlQUFlO1lBQ2YscUNBQXFDO1lBQ3JDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMseUNBQXlDO1NBQzFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztZQUNkLFNBQVMsRUFBRSxJQUFJLEdBQUcsZUFBZTtZQUNqQyxRQUFRLEVBQUUsMEJBQTBCO1NBQ3JDO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFO29CQUNYLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7aUJBQ2xDO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQsMEJBQTBCO2dCQUMxQixLQUFLLEVBQUUsOENBQThDO2dCQUNyRCxtQkFBbUI7Z0JBQ25CLFlBQVksRUFBRSw0ZEFVckI7Z0JBQ08sYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUscURBQXFEO3FCQUM1RDtvQkFDRDt3QkFDRSxLQUFLLEVBQUUscUJBQXFCO3dCQUM1QixJQUFJLEVBQUUsWUFBWTtxQkFDbkI7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sSUFBSTtTQUNSLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO1NBQ0QsSUFBSSxDQUFDLHFCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQXBGRCxrQkFvRkMifQ==