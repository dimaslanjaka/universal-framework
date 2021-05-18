"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyTypeDoc = exports.doc = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
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
                        href: "https://github.com/dimaslanjaka/universal-framework",
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
/**
 * Generate Documentation Typescript Only (Without Emit JS),
 * for completion single ts files in view directory
 */
function dummyTypeDoc() {
    var outDir = "dist/dts/";
    if (filemanager_1.default.exist(outDir)) {
        filemanager_1.default.unlink(outDir);
    }
    var tsProject = gulp_typescript_1.default.createProject("tsconfig.json", {
        module: "amd",
        outFile: "dist/dts/types.d.ts",
        declaration: true,
        allowJs: true,
        noEmitJs: true,
    });
    return gulp.src(["libs/**/*.ts"]).pipe(tsProject()).pipe(gulp.dest("dist/dts"));
    //return merge([tResult.dts.pipe(gulp.dest("dist/dts/"))]);
}
exports.dummyTypeDoc = dummyTypeDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBNkI7QUFDN0Isb0VBQWdDO0FBQ2hDLHdFQUEwQztBQUMxQyxzRUFBd0M7QUFDeEMsNEVBQWlDO0FBRWpDLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCOzs7Ozs7R0FNRztBQUNILFNBQWdCLEdBQUcsQ0FBQyxFQUFjO0lBQWQsbUJBQUEsRUFBQSxTQUFjO0lBQ2hDLElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7SUFDckMsSUFBSTtRQUNGLElBQUkscUJBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEMscUJBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0I7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQjtJQUVELElBQU0sTUFBTSxHQUFHO1FBQ2IsWUFBWSxFQUFFLEVBQUU7UUFDaEIsSUFBSSxFQUFFO1lBQ0osZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ25DO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFHLFVBQVUsRUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ2hELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsY0FBYyxFQUFFLDBDQUEwQztTQUMzRDtRQUNELE9BQU8sRUFBRTtZQUNQLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLHFDQUFxQztZQUNyQyxtQ0FBbUM7WUFDbkMsb0NBQW9DO1lBQ3BDLHlDQUF5QztTQUMxQztRQUNELElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCwwQ0FBMEM7WUFDMUMsUUFBUSxFQUFFLDBCQUEwQjtTQUNyQztRQUNELFNBQVMsRUFBRTtZQUNULFdBQVcsRUFBRSxLQUFLO1lBQ2xCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRTtnQkFDWCxrQ0FBa0M7aUJBQ25DO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQsMEJBQTBCO2dCQUMxQixLQUFLLEVBQUUsOENBQThDO2dCQUNyRCxtQkFBbUI7Z0JBQ25CLFlBQVksRUFBRSxnREFBZ0Q7Z0JBQzlELGFBQWEsRUFBRSxLQUFLO2dCQUNwQixRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLHFEQUFxRDtxQkFDNUQ7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsSUFBSSxFQUFFLHFEQUFxRDtxQkFDNUQ7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sSUFBSTtTQUNSLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO1NBQ0QsSUFBSSxDQUFDLHFCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQTFFRCxrQkEwRUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixZQUFZO0lBQzFCLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUMzQixJQUFJLHFCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdCLHFCQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsSUFBTSxTQUFTLEdBQUcseUJBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFO1FBQ2xELE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLDJEQUEyRDtBQUM3RCxDQUFDO0FBZEQsb0NBY0MifQ==