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
            excludePattern: "[\\/\\\\]node_modules|docs|dist[\\/\\\\]|framework.js$",
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
                trackingCode: "<!--tracking-code-which-will-go-to-the-HEAD-->",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLHdFQUEwQztBQUMxQyxzRUFBd0M7QUFDeEMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUI7Ozs7O0dBS0c7QUFDSCxTQUFnQixHQUFHLENBQUMsRUFBYztJQUFkLG1CQUFBLEVBQUEsU0FBYztJQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBQ25DLElBQUk7UUFDRixJQUFJLHFCQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hDLHFCQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7SUFFRCxJQUFJLE1BQU0sR0FBRztRQUNYLFlBQVksRUFBRSxFQUFFO1FBQ2hCLElBQUksRUFBRTtZQUNKLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUNuQztRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBRyxVQUFVLEVBQUUsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNoRCxjQUFjLEVBQUUsZ0NBQWdDO1lBQ2hELGNBQWMsRUFBRSx3REFBd0Q7U0FDekU7UUFDRCxPQUFPLEVBQUU7WUFDUCxzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLGVBQWU7WUFDZixxQ0FBcUM7WUFDckMsbUNBQW1DO1lBQ25DLG9DQUFvQztZQUNwQyx5Q0FBeUM7U0FDMUM7UUFDRCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsU0FBUztZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxLQUFLO1lBQ2QsMENBQTBDO1lBQzFDLFFBQVEsRUFBRSwwQkFBMEI7U0FDckM7UUFDRCxTQUFTLEVBQUU7WUFDVCxXQUFXLEVBQUUsS0FBSztZQUNsQixjQUFjLEVBQUUsS0FBSztZQUNyQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRTtnQkFDUCxXQUFXLEVBQUU7Z0JBQ1gsa0NBQWtDO2lCQUNuQzthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSw4Q0FBOEM7Z0JBQ3BELDBCQUEwQjtnQkFDMUIsS0FBSyxFQUFFLDhDQUE4QztnQkFDckQsbUJBQW1CO2dCQUNuQixZQUFZLEVBQUUsZ0RBQWdEO2dCQUM5RCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsUUFBUSxFQUFFO29CQUNSO3dCQUNFLEtBQUssRUFBRSxRQUFRO3dCQUNmLElBQUksRUFBRSxxREFBcUQ7cUJBQzVEO29CQUNEO3dCQUNFLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLElBQUksRUFBRSxvREFBb0Q7cUJBQzNEO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7SUFFRixJQUFJO1NBQ0QsR0FBRyxDQUFDLENBQUMscUNBQXFDLENBQUMsRUFBRTtRQUM1QyxJQUFJLEVBQUUsS0FBSztLQUNaLENBQUM7U0FDRCxJQUFJLENBQUMscUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBMUVELGtCQTBFQyJ9