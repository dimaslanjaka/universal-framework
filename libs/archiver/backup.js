"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRoot = exports.backup = exports.readdir = exports.getFuncName = void 0;
var tslib_1 = require("tslib");
var archiver_1 = tslib_1.__importDefault(require("archiver"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var process_1 = tslib_1.__importDefault(require("process"));
var path_1 = tslib_1.__importDefault(require("path"));
var core_1 = tslib_1.__importDefault(require("./../compiler/core"));
var log = core_1.default.log;
var root = process_1.default.cwd();
/**
 * Get function name
 */
function getFuncName() {
    return getFuncName.caller.name;
}
exports.getFuncName = getFuncName;
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
function readdir(directory, deep, fileslist, exclude, filter) {
    if (fileslist === void 0) { fileslist = []; }
    if (exclude === void 0) { exclude = []; }
    if (filter === void 0) { filter = null; }
    if (!directory) {
        log.log("directory(" + log.type(typeof directory) + ") not valid");
        return;
    }
    if (!fileslist) {
        fileslist = [];
    }
    else if (!fileslist.length) {
        fileslist = [];
    }
    else if (fileslist.length) {
        fileslist = fileslist;
    }
    var doRead = function (directory) {
        var files = fs_1.default.readdirSync(directory, { encoding: "utf-8" });
        files.forEach(function (file) {
            file = path_1.default.resolve(file);
            if (Array.isArray(fileslist)) {
                fileslist.push(file);
                var isDir = fs_1.default.lstatSync(file).isDirectory();
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
                    item = core_1.default.normalize(item);
                    if (ex instanceof RegExp) {
                        allow = !ex.test(item);
                    }
                    else {
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
                var type = fs_1.default.statSync(item);
                if (filter.hasOwnProperty("files") && filter.files) {
                    return !type.isFile();
                }
                else if (filter.hasOwnProperty("folders") && filter.folders) {
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
exports.readdir = readdir;
function backup() {
    var fn = getFuncName();
    // create a file to stream archive data to.
    var output = fs_1.default.createWriteStream(root + "/tmp/backup.zip");
    var archive = archiver_1.default("zip", {
        zlib: { level: 9 },
    });
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on("close", function () {
        console.log(archive.pointer() + " total bytes");
        console.log("archiver has been finalized and the output file descriptor has closed.");
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
        }
        else {
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
    var archive_now = function (files) {
        if (files.length) {
            if (!fs_1.default.existsSync(files[0])) {
                if (!fs_1.default.existsSync(fromRoot(files[0]))) {
                    log.log(log.error(fn + "(" + files[0] + ") not found"));
                    return;
                }
                files[0] = fromRoot(files[0]);
            }
            var type = fs_1.default.lstatSync(files[0]);
            var filename = path_1.default.basename(files[0]);
            if (type.isFile()) {
                archive.append(fs_1.default.createReadStream(files[0]), {
                    name: filename,
                });
            }
            else if (type.isDirectory()) {
                archive.directory(fromRoot(files[0]), filename);
            }
            files.shift();
            archive_now(files);
        }
    };
    archive_now(readdir(fromRoot("/"), false, null, null, { folders: true, files: false }));
    archive_now(["src", "assets", ".vscode", "views", "libs"]);
    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
}
exports.backup = backup;
function fromRoot(dest) {
    return path_1.default.join(root, dest);
}
exports.fromRoot = fromRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FyY2hpdmVyL2JhY2t1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOERBQWdDO0FBQ2hDLGtEQUFvQjtBQUNwQiw0REFBOEI7QUFDOUIsc0RBQXdCO0FBQ3hCLG9FQUFzQztBQUN0QyxJQUFNLEdBQUcsR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFM0I7O0dBRUc7QUFDSCxTQUFnQixXQUFXO0lBQ3pCLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDakMsQ0FBQztBQUZELGtDQUVDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBZ0IsT0FBTyxDQUNyQixTQUFpQixFQUNqQixJQUFhLEVBQ2IsU0FBK0IsRUFDL0IsT0FBb0MsRUFDcEMsTUFTUTtJQVhSLDBCQUFBLEVBQUEsY0FBK0I7SUFDL0Isd0JBQUEsRUFBQSxZQUFvQztJQUNwQyx1QkFBQSxFQUFBLGFBU1E7SUFFUixJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQ25FLE9BQU87S0FDUjtJQUNELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDNUIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtTQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUMzQixTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQ3ZCO0lBQ0QsSUFBTSxNQUFNLEdBQUcsVUFBVSxTQUFpQjtRQUN4QyxJQUFJLEtBQUssR0FBRyxZQUFFLENBQUMsV0FBVyxD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