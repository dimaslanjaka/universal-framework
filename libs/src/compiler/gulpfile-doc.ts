import * as gulp from "gulp";
import jsdoc from "gulp-jsdoc3";
import process from "../compiler/process";
import filemanager from "./filemanager";
import ts from "gulp-typescript";

const root = process.root;

/**
 * Better-Docs JSDoc
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
export function doc(cb: any = null): NodeJS.ReadWriteStream {
  const outputDir = root + "/docs/js/";
  try {
    if (filemanager.exist(outputDir)) {
      filemanager.unlink(outputDir);
    }
  } catch (e) {
    console.log(e);
  }

  const config = {
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
        title: "Universal Framework Javascript Documentation", // HTML title
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
    .pipe(jsdoc(config, cb));
}

const tsProject = ts.createProject({
  declaration: true,
});
