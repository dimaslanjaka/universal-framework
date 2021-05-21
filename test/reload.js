var spawn = require("child_process").spawn;

(function process() {
  if (process.env.process_restarting) {
    console.log("restarting...");
    delete process.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(main, 1000);
    return;
  }

  // ...

  // Restart process ...
  spawn(process.argv[0], process.argv.slice(1), {
    env: { process_restarting: 1 },
    stdio: "ignore",
    detached: true,
  }).unref();
})();
