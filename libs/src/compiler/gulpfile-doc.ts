import * as gulp from "gulp";
import jsdoc from "gulp-jsdoc3";
import process from "../compiler/process";
import filemanager from "./filemanager";

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
      tutorials: root + "/docs/statics",
      template: "node_modules/better-docs",
    },
    templates: {
      cleverLinks: false,
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
        title: "Universal Framework Javascript Documentation", // HTML title
        //css: "style.css",
        trackingCode: `<script data-ad-client="ca-pub-1165447249910969" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-106238155-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-106238155-1');
</script>
`,
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
    .pipe(jsdoc(config, cb));
}
