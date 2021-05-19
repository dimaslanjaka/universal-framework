"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
//import filemanager from "./filemanager";
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
    /*
    try {
      if (filemanager.exist(outputDir)) {
        filemanager.unlink(outputDir);
      }
    } catch (e) {
      console.log(e);
    }
    */
    var config = {
        recurseDepth: 10,
        tags: {
            allowUnknownTags: true,
            dictionaries: ["jsdoc", "closure"],
        },
        source: {
            include: [root + "/libs/js", root + "/libs/src"],
            includePattern: "\\.(md|jsx|js|ts|tsx|js(doc|x)?)$",
            excludePattern: "[\\/\\\\]node_modules|docs|dist|vendor|demo|example[\\/\\\\]",
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
            cleverLinks: true,
            monospaceLinks: false,
            search: true,
            default: {
                staticFiles: {
                    include: [root + "/docs/statics", root + "/docs/php"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLHdFQUEwQztBQUMxQywwQ0FBMEM7QUFFMUMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUI7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsR0FBRyxDQUFDLEVBQWM7SUFBZCxtQkFBQSxFQUFBLFNBQWM7SUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUNyQzs7Ozs7Ozs7TUFRRTtJQUVGLElBQU0sTUFBTSxHQUFHO1FBQ2IsWUFBWSxFQUFFLEVBQUU7UUFDaEIsSUFBSSxFQUFFO1lBQ0osZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ25DO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFHLFVBQVUsRUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ2hELGNBQWMsRUFBRSxtQ0FBbUM7WUFDbkQsY0FBYyxFQUFFLDhEQUE4RDtTQUMvRTtRQUNELE9BQU8sRUFBRTtZQUNQLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLHFDQUFxQztZQUNyQyxtQ0FBbUM7WUFDbkMsb0NBQW9DO1lBQ3BDLHlDQUF5QztTQUMxQztRQUNELElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsSUFBSSxHQUFHLGVBQWU7WUFDakMsUUFBUSxFQUFFLDBCQUEwQjtTQUNyQztRQUNELFNBQVMsRUFBRTtZQUNULFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRTtvQkFDWCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEdBQUcsZUFBZSxFQUFFLElBQUksR0FBRyxXQUFXLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQsMEJBQTBCO2dCQUMxQixLQUFLLEVBQUUsOENBQThDO2dCQUNyRCxtQkFBbUI7Z0JBQ25CLFlBQVksRUFBRSw0ZEFVckI7Z0JBQ08sYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUscURBQXFEO3FCQUM1RDtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsMEJBQTBCO3FCQUNqQztpQkFDRjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxJQUFJO1NBQ1IsR0FBRyxDQUFDLENBQUMscUNBQXFDLENBQUMsRUFBRTtRQUM1QyxJQUFJLEVBQUUsS0FBSztLQUNaLENBQUM7U0FDRCxJQUFJLENBQUMscUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBdEZELGtCQXNGQyJ9