"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
//import { jsdoc } from "../gulp-jsdoc3/src/gulp-jsdoc";
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
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
            include: [root + "/libs/js", root + "/libs/src/compiler"],
            includePattern: "\\.(jsx|js|ts|tsx|js(doc|x)?)$",
            excludePattern: "[\\/\\\\]node_modules|docs|dist|vendor|demo|example[\\/\\\\]|node_modules",
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
            tutorials: root + "/docs-src/statics",
            template: "node_modules/better-docs",
        },
        templates: {
            cleverLinks: true,
            monospaceLinks: false,
            search: true,
            default: {
                staticFiles: {
                    include: [root + "/docs-src/statics"],
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
                        label: "PHP API",
                        href: "https://git.webmanajemen.com/universal-framework/php",
                    },
                    {
                        label: "Blog",
                        href: "https://webmanajemen.com",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isd0RBQXdEO0FBQ3hELHdFQUEwQztBQUMxQyxzRUFBd0M7QUFDeEMsb0VBQWdDO0FBQ2hDLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCOzs7Ozs7R0FNRztBQUNILFNBQWdCLEdBQUcsQ0FBQyxFQUFjO0lBQWQsbUJBQUEsRUFBQSxTQUFjO0lBQ2hDLElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7SUFDckMsSUFBSTtRQUNGLElBQUkscUJBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEMscUJBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0I7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQjtJQUVELElBQU0sTUFBTSxHQUFHO1FBQ2IsWUFBWSxFQUFFLEVBQUU7UUFDaEIsSUFBSSxFQUFFO1lBQ0osZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ25DO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFHLFVBQVUsRUFBRSxJQUFJLEdBQUcsb0JBQW9CLENBQUM7WUFDekQsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxjQUFjLEVBQUUsMkVBQTJFO1NBQzVGO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQixlQUFlO1lBQ2YscUNBQXFDO1lBQ3JDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMseUNBQXlDO1NBQzFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztZQUNkLFNBQVMsRUFBRSxJQUFJLEdBQUcsbUJBQW1CO1lBQ3JDLFFBQVEsRUFBRSwwQkFBMEI7U0FDckM7UUFDRCxTQUFTLEVBQUU7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixjQUFjLEVBQUUsS0FBSztZQUNyQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRTtnQkFDUCxXQUFXLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDO2lCQUN0QzthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSw4Q0FBOEM7Z0JBQ3BELDBCQUEwQjtnQkFDMUIsS0FBSyxFQUFFLDhDQUE4QztnQkFDckQsbUJBQW1CO2dCQUNuQixZQUFZLEVBQUUsNGRBVXJCO2dCQUNPLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLHFEQUFxRDtxQkFDNUQ7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLElBQUksRUFBRSxzREFBc0Q7cUJBQzdEO29CQUNEO3dCQUNFLEtBQUssRUFBRSxNQUFNO3dCQUNiLElBQUksRUFBRSwwQkFBMEI7cUJBQ2pDO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLElBQUk7U0FDUixHQUFHLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksRUFBRSxLQUFLO0tBQ1osQ0FBQztTQUNELElBQUksQ0FBQyxxQkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUF4RkQsa0JBd0ZDIn0=