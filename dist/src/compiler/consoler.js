/*
migrated to libs\js\console.ts
[
  ["warn", "\x1b[35m"],
  ["error", "\x1b[31m"],
  ["log", "\x1b[2m"],
].forEach(function (pair) {
  var method = pair[0],
    reset = "\x1b[0m",
    color = "\x1b[36m" + pair[1];
  console[method] = console[method].bind(
    console,
    color,
    `${method.toUpperCase()} [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`,
    reset
  );
});

console.error = (function () {
  var error = console.error;

  return function (exception: { stack: any }) {
    if (typeof exception.stack !== "undefined") {
      error.call(console, exception.stack);
    } else {
      error.apply(console, arguments);
    }
  };
})();
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9jb25zb2xlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QkcifQ==