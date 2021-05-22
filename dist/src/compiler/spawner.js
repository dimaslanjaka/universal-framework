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
        if (typeof callback == "function") {
            callback(child);
        }
        spawner.children.push(child);
        if (!this.onExit) {
            this.onExit = true;
            process.on("exit", this.children_kill);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3NwYXduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQWtHO0FBRWxHO0lBQUE7SUFnREEsQ0FBQztJQTdDQzs7OztPQUlHO0lBQ0ksYUFBSyxHQUFaLFVBQWEsT0FBZSxFQUFFLE9BQWtCLEVBQUUsUUFBeUIsRUFBRSxRQUFzQztRQUNqSCxJQUFJLFFBQVEsR0FBaUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUcsSUFBSSxLQUFLLEdBQUcscUJBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLElBQUksT0FBTyxRQUFRLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUM1QyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUk7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQjtRQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFDRDs7T0FFRztJQUNZLHFCQUFhLEdBQTVCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFxQztZQUN0RSxvQ0FBb0M7WUFDcEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFTLEtBQUssQ0FBQyxHQUFHLGdCQUFXLEtBQUssQ0FBQyxNQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE5Q00sZ0JBQVEsR0FBcUMsRUFBRSxDQUFDO0lBQ3hDLGNBQU0sR0FBRyxLQUFLLENBQUM7SUE4Q2hDLGNBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSwwQkFBTyJ9