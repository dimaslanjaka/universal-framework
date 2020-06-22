import * as sass from "sass";
import * as fs from "fs";
import log from "./log";
//import { core } from "./core";
import core = require('./core');

export class sass_compiler {
  /**
   * Compile filename.scss to filename.css and filename.min.css
   * @param filename
   */
  static scss(filename: fs.PathLike) {
    fs.exists(filename, function (exists) {
      if (exists) {
        var output = filename.toString().replace(/\.scss/s, ".css");
        var outputcss = output;
        if (
          /\.scss$/s.test(filename.toString()) &&
          !/\.min\.scss$/s.test(filename.toString())
        ) {
          sass.render(
            {
              file: filename.toString(),
              outputStyle: "expanded",
              outFile: output,
            },
            function (err, result) {
              if (!err) {
                fs.writeFile(outputcss, result.css, function (err) {
                  if (!err) {
                    filename = filename.toString().replace(core.root(), "");
                    outputcss = outputcss.replace(core.root(), "");
                    new log(
                      `${filename} > ${outputcss} ${log.success("success")}`
                    );
                    core.minCSS(output, null);
                  }
                });
              }
            }
          );
        }
      } else {
        console.error(`${filename} not found`);
      }
    });
  }
}

