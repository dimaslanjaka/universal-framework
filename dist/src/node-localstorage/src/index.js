"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var LocalStorage_1 = require("../dist/LocalStorage");
LocalStorage_1.LocalStorage.prototype.hasItem = function (key) {
    return this.getItem(key) !== null;
};
var storageDir = "./tmp/storage";
if (fs.existsSync("./tmp")) {
    storageDir = "./tmp/localStorage";
}
else if (fs.existsSync("./temp")) {
    storageDir = "./temp/localStorage";
}
else if (fs.existsSync("./build")) {
    storageDir = "./build/localStorage";
}
var storage = new LocalStorage_1.LocalStorage(storageDir);
//export var localStorage: Storage = storage;
if (typeof localStorage === "undefined" || localStorage === null) {
    if (typeof global != "undefined") {
        global.localStorage = storage;
    }
    else {
        var localStorage_1 = storage;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL3NyYy9ub2RlLWxvY2Fsc3RvcmFnZS9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlCO0FBRXpCLHFEQUFvRDtBQUNwRCwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFXO0lBQ3BELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBU0YsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDO0FBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMxQixVQUFVLEdBQUcsb0JBQW9CLENBQUM7Q0FDbkM7S0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbEMsVUFBVSxHQUFHLHFCQUFxQixDQUFDO0NBQ3BDO0tBQU0sSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0lBQ25DLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQztDQUNyQztBQUVELElBQUksT0FBTyxHQUFvQixJQUFJLDJCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUQsNkNBQTZDO0FBQzdDLElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7SUFDaEUsSUFBSSxPQUFPLE1BQU0sSUFBSSxXQUFXLEVBQUU7UUFDaEMsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7S0FDL0I7U0FBTTtRQUNMLElBQU0sY0FBWSxHQUFHLE9BQU8sQ0FBQztLQUM5QjtDQUNGIn0=