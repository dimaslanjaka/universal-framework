import { ChildProcessWithoutNullStreams, spawn, SpawnOptions } from "child_process";

export class spawner {
  static children: ChildProcessWithoutNullStreams[] = [];
  private static onExit = false;
  /**
   * Spawn Commands
   * @param command node
   * @param options ['index.js']
   */
  static spawn(command: string, options?: string[], detached = false) {
    let stdioOpt: SpawnOptions = { stdio: "pipe", detached: detached };
    let child = spawn(command, options, stdioOpt);
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

    process.on("exit", () => {
      console.log(
        "killing",
        spawner.children.length,
        spawner.children.length > 1 ? "child processes" : "child process"
      );
      this.children_kill();
    });
  }
  /**
   * Kill all ChildProcessWithoutNullStreams[]
   */
  private static children_kill() {
    spawner.children.forEach(function (child: ChildProcessWithoutNullStreams) {
      //process.kill(child.pid, "SIGINT");
      child.kill();
      console.log(`Child ${child.pid} killed ${child.killed}`);
    });
  }
}
