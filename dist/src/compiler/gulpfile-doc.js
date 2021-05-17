"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
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
    /*const config = {
      recurseDepth: 10,
      opts: {
        template: "node_modules/better-docs",
      },
      tags: {
        allowUnknownTags: true,
        dictionaries: ["jsdoc", "closure"],
      },
      plugins: [
        "node_modules/better-docs/typescript",
        "node_modules/better-docs/category",
        "node_modules/better-docs/component",
        "plugins/markdown",
        "plugins/summarize",
      ],
      source: {
        includePattern: "\\.(jsx|js|ts|tsx|js(doc|x)?)$",
        ///include: ["./libs"],
        //exclude: ["./src"],
      },
    };*/
    var config = {
        tags: {
            allowUnknownTags: true,
            dictionaries: ["jsdoc", "closure"],
        },
        source: {
            include: ["./libs"],
            includePattern: ".js$",
            excludePattern: "(node_modules|docs)",
        },
        plugins: [
            "plugins/markdown",
            "jsdoc-mermaid",
            "node_modules/better-docs/typescript",
            "node_modules/better-docs/category",
            "node_modules/better-docs/component",
            "node_modules/better-docs/typedef-import",
        ],
        opts: {
            encoding: "utf8",
            destination: root + "/docs/js/",
            readme: "readme.md",
            recurse: true,
            verbose: true,
            //tutorials: "./docs-src/tutorials",
            template: "better-docs",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLHdFQUEwQztBQUMxQyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQjs7Ozs7R0FLRztBQUNILFNBQWdCLEdBQUcsQ0FBQyxFQUFjO0lBQWQsbUJBQUEsRUFBQSxTQUFjO0lBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQkk7SUFDSixJQUFNLE1BQU0sR0FBRztRQUNiLElBQUksRUFBRTtZQUNKLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUNuQztRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixjQUFjLEVBQUUsTUFBTTtZQUN0QixjQUFjLEVBQUUscUJBQXFCO1NBQ3RDO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCO1lBQ2xCLGVBQWU7WUFDZixxQ0FBcUM7WUFDckMsbUNBQW1DO1lBQ25DLG9DQUFvQztZQUNwQyx5Q0FBeUM7U0FDMUM7UUFDRCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsSUFBSSxHQUFHLFdBQVc7WUFDL0IsTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLG9DQUFvQztZQUNwQyxRQUFRLEVBQUUsYUFBYTtTQUN4QjtRQUNELFNBQVMsRUFBRTtZQUNULFdBQVcsRUFBRSxLQUFLO1lBQ2xCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRTtnQkFDWCxrQ0FBa0M7aUJBQ25DO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQsMEJBQTBCO2dCQUMxQixLQUFLLEVBQUUsOENBQThDO2dCQUNyRCxtQkFBbUI7Z0JBQ25CLFlBQVksRUFBRSx5Q0FBeUM7Z0JBQ3ZELGFBQWEsRUFBRSxLQUFLO2dCQUNwQixRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLHFEQUFxRDtxQkFDNUQ7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsSUFBSSxFQUFFLG9EQUFvRDtxQkFDM0Q7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUNGLElBQUk7U0FDRCxHQUFHLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksRUFBRSxLQUFLO0tBQ1osQ0FBQztTQUNELElBQUksQ0FBQyxxQkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFwRkQsa0JBb0ZDIn0=