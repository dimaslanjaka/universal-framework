"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawner = void 0;
var child_process_1 = require("child_process");
var spawner = /** @class */ (function () {
    function spawner() {
    }
    /**
     * Spawn Commands
     * @param command node
     * @param options ['index.js']
     */
    spawner.spawn = function (command, options, detached) {
        var _this = this;
        if (detached === void 0) { detached = false; }
        var stdioOpt = { stdio: "pipe", detached: detached };
        var child = child_process_1.spawn(command, options, stdioOpt);
        child.unref();
        if (detached) {
            child.stdout.setEncoding("utf8");
            child.stdout.on("data", function (data) {
                console.log("stdout:" + data);
            });
            child.stderr.setEncoding("utf8");
            child.stderr.on("data", function (data) {
                console.log("stderr:" + data);
            });
            child.stdin.on("data", function (data) {
                console.log("stdin:" + data);
            });
        }
        spawner.children.push(child);
        process.on("exit", function () {
            console.log("killing", spawner.children.length, spawner.children.length > 1 ? "child processes" : "child process");
            _this.children_kill();
        });
    };
    /**
     * Kill all ChildProcessWithoutNullStreams[]
     */
    spawner.children_kill = function () {
        spawner.children.forEach(function (child) {
            //process.kill(child.pid, "SIGINT");
            child.kill();
            console.log("Child " + child.pid + " killed " + child.killed);
        });
    };
    spawner.children = [];
    spawner.onExit = false;
    return spawner;
}());
exports.spawner = spawner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3NwYXduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQW9GO0FBRXBGO0lBQUE7SUErQ0EsQ0FBQztJQTVDQzs7OztPQUlHO0lBQ0ksYUFBSyxHQUFaLFVBQWEsT0FBZSxFQUFFLE9BQWtCLEVBQUUsUUFBZ0I7UUFBbEUsaUJBNEJDO1FBNUJpRCx5QkFBQSxFQUFBLGdCQUFnQjtRQUNoRSxJQUFJLFFBQVEsR0FBaUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUNuRSxJQUFJLEtBQUssR0FBRyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsSUFBSSxRQUFRLEVBQUU7WUFDWixLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUk7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsU0FBUyxFQUNULE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN2QixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQ2xFLENBQUM7WUFDRixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDWSxxQkFBYSxHQUE1QjtRQUNFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBcUM7WUFDdEUsb0NBQW9DO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBUyxLQUFLLENBQUMsR0FBRyxnQkFBVyxLQUFLLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBN0NNLGdCQUFRLEdBQXFDLEVBQUUsQ0FBQztJQUN4QyxjQUFNLEdBQUcsS0FBSyxDQUFDO0lBNkNoQyxjQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksMEJBQU8ifQ==