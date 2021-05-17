import * as gulp from "gulp";
import jsdoc from "gulp-jsdoc3";
import * as fs from "fs";
import process from "../compiler/process";
const root = process.root;

/**
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
export function doc(cb: any = null) {
  let outputDir = root + "/docs/js/";
  if (fs.existsSync(outputDir)) {
    fs.unlinkSync(outputDir);
  }
  let config = {
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
    .pipe(jsdoc(config, cb));
}
