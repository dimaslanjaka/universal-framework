import { ChildProcess, ChildProcessWithoutNullStreams, spawn, SpawnOptions } from "child_process";

export class spawner {
    static children: ChildProcessWithoutNullStreams[] = [];
    private static onExit = false;

    /**
     * Spawn Commands
     * @param command node
     * @param options ['index.js']
     * @param detached spawn stdio detach
     * @param callback callback for children process
     */
    static spawn(command: string, options?: string[], detached?: boolean | null, callback?: (path: ChildProcess) => any) {
        const stdioOpt: SpawnOptions = {stdio: "pipe", detached: typeof detached == "boolean" ? detached : false};
        const child = spawn(command, options, stdioOpt);
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
        } else {
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
    }

    /**
     * Kill all ChildProcessWithoutNullStreams[]
     */
    private static children_kill() {
        console.log("killing", spawner.children.length, spawner.children.length > 1 ? "child processes" : "child process");
        spawner.children.forEach(function (child: ChildProcessWithoutNullStreams) {
            //process.kill(child.pid, "SIGINT");
            child.kill();
            console.log(`Child ${child.pid} killed ${child.killed}`);
        });
    }
}
