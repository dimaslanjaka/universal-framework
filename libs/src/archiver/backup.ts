import archiver from "archiver";
import fs from "fs";
import process from "process";
import path from "path";
import core from "./../compiler/core";
const log = core.log;
const root = process.cwd();

/**
 * Get function name
 */
export function getFuncName() {
  return getFuncName.caller.name;
}

/**
 * Read directory with deep options
 * @param directory directory scan target
 * @param deep true for recursive scan, false only scan the folder not subfolder
 * @param fileslist files to concat
 * @example ['node_modules', /\/node_modules\//]
 * @param filter
 * @example files only { folders true, files false }
 * @example folder only { files true, folder false }
 */
export function readdir(
  directory: string,
  deep: boolean,
  fileslist: null | string[] = [],
  exclude: Array<string | RegExp> = [],
  filter: null | {
    /**
     * Filter files from results (remove)
     */
    files: boolean;
    /**
     * Filter directory from results (remove)
     */
    folders: boolean;
  } = null
) {
  if (!directory) {
    log.log("directory(" + log.type(typeof directory) + ") not valid");
    return;
  }
  if (!fileslist) {
    fileslist = [];
  } else if (!fileslist.length) {
    fileslist = [];
  } else if (fileslist.length) {
    fileslist = fileslist;
  }
  const doRead = function (directory: string) {
    var files = fs.readdirSync(directory, { encoding: "utf-8" });
    files.forEach(function (file) {
      file = path.resolve(file);
      if (Array.isArray(fileslist)) {
        fileslist.push(file);
        var isDir = fs.lstatSync(file).isDirectory();
        if (deep) {
          if (isDir) {
            fileslist = readdir(file, deep, fileslist);
          }
        }
      }
    });
    if (exclude && exclude.length) {
      exclude.forEach(function (ex) {
        fileslist = fileslist.filter(function (item) {
          var allow = null;
          item = core.normalize(item);
          if (ex instanceof RegExp) {
            allow = !ex.test(item);
          } else {
            var matches = item.indexOf(ex) !== -1;
            allow = !matches;
          }
          return allow;
        });
      });
    }
    //log.log(typeof filter == "object");
    if (filter) {
      fileslist = fileslist.filter(function (item) {
        var type = fs.statSync(item);
        if (filter.hasOwnProperty("files") && filter.files) {
          return !type.isFile();
        } else if (filter.hasOwnProperty("folders") && filter.folders) {
          return !type.isDirectory();
        }
        return null;
      });
    }
    //log.log(filter);

    return fileslist;
  };

  return doRead(directory);
}

export function backup() {
  const fn = getFuncName();

  // create a file to stream archive data to.
  var output = fs.createWriteStream(root + "/tmp/backup.zip");
  var archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on("end", function () {
    console.log("Data has been drained");
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on("error", function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  /**
   * Process archive
   * @param files
   */
  const archive_now = function (files: string[]) {
    if (files.length) {
      if (!fs.existsSync(files[0])) {
        if (!fs.existsSync(fromRoot(files[0]))) {
          log.log(log.error(`${fn}(${files[0]}) not found`));
          return;
        }
        files[0] = fromRoot(files[0]);
      }
      var type = fs.lstatSync(files[0]);
      var filename = path.basename(files[0]);
      if (type.isFile()) {
        archive.append(fs.createReadStream(files[0]), {
          name: filename,
        });
      } else if (type.isDirectory()) {
        archive.directory(fromRoot(files[0]), filename);
      }
      files.shift();
      archive_now(files);
    }
  };

  archive_now(
    readdir(fromRoot("/"), false, null, null, { folders: true, files: false })
  );
  archive_now(["src", "assets", ".vscode", "views", "libs"]);

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
}

export function fromRoot(dest: string) {
  return path.join(root, dest);
}
