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
        zlib: { level: 9 }, // Sets the compression level.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvYXJjaGl2ZXIvYmFja3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw4REFBZ0M7QUFDaEMsa0RBQW9CO0FBQ3BCLDREQUE4QjtBQUM5QixzREFBd0I7QUFDeEIsb0VBQXNDO0FBQ3RDLElBQU0sR0FBRyxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQUM7QUFDckIsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUzQjs7R0FFRztBQUNILFNBQWdCLFdBQVc7SUFDekIsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNqQyxDQUFDO0FBRkQsa0NBRUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixPQUFPLENBQ3JCLFNBQWlCLEVBQ2pCLElBQWEsRUFDYixTQUErQixFQUMvQixPQUFvQyxFQUNwQyxNQVNRO0lBWFIsMEJBQUEsRUFBQSxjQUErQjtJQUMvQix3QkFBQSxFQUFBLFlBQW9DO0lBQ3BDLHVCQUFBLEVBQUEsYUFTUTtJQUVSLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDbkUsT0FBTztLQUNSO0lBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDaEI7U0FBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUM1QixTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQzNCLFNBQVMsR0FBRyxTQUFTLENBQUM7S0FDdkI7SUFDRCxJQUFNLE1BQU0sR0FBRyxVQUFVLFNBQWlCO1FBQ3hDLElBQUksS0FBSyxHQUFHLFlBQUUs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