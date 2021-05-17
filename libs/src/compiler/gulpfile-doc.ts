import * as gulp from "gulp";
import jsdoc from "gulp-jsdoc3";

/**
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
function doc(cb: any = null) {
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
  const config = {
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
        title: "Universal Framework Javascript Documentation", // HTML title
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
    .pipe(jsdoc(config, cb));
}

/**
 * Create Documentation of javascripts
 */
gulp.task("doc", doc);
