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
     * @param detached spawn stdio detach
     * @param callback callback for children process
     */
    spawner.spawn = function (command, options, detached, callback) {
        var stdioOpt = { stdio: "pipe", detached: typeof detached == "boolean" ? detached : false };
        var child = child_process_1.spawn(command, options, stdioOpt);
        child.unref();
        if (typeof detached == "boolean" && detached) {
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
        else {
            child.stderr.setEncoding("utf8");
            child.stderr.on("data", function (data) {
                console.log("stderr:" + data);
            });
        }
        if (typeof callback == "function") {
            callback(child);
        }
        spawner.children.push(child);
        if (!this.onExit) {
            this.onExit = true;
            process.on("exit", this.children_kill);
        }
        return child;
    };
    /**
     * Kill all ChildProcessWithoutNullStreams[]
     */
    spawner.children_kill = function () {
        console.log("killing", spawner.children.length, spawner.children.length > 1 ? "child processes" : "child process");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3NwYXduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQWtHO0FBRWxHO0lBQUE7SUEyREEsQ0FBQztJQXZERzs7Ozs7O09BTUc7SUFDSSxhQUFLLEdBQVosVUFBYSxPQUFlLEVBQUUsT0FBa0IsRUFBRSxRQUF5QixFQUFFLFFBQXNDO1FBQy9HLElBQU0sUUFBUSxHQUFpQixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUMxRyxJQUFNLEtBQUssR0FBRyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsSUFBSSxPQUFPLFFBQVEsSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUk7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDWSxxQkFBYSxHQUE1QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ILE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBcUM7WUFDcEUsb0NBQW9DO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBUyxLQUFLLENBQUMsR0FBRyxnQkFBVyxLQUFLLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekRNLGdCQUFRLEdBQXFDLEVBQUUsQ0FBQztJQUN4QyxjQUFNLEdBQUcsS0FBSyxDQUFDO0lBeURsQyxjQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksMEJBQU8ifQ==