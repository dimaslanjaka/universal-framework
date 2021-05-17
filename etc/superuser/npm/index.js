$(document).ready(function () {
  if (typeof Worker !== "undefined") {
    console.log("Web Worker Supported");
    const myWorker = new Worker("/assets/js/worker.js");
    myWorker.postMessage([100, 20]);
    myWorker.onmessage = function (e) {
      //result.textContent = e.data;
      console.log("Message received from worker", e);
    };
  } else {
    console.error("Web Worker not support");
  }

  $(document).on("click", '[data-toggle="ajax"]', function (e) {
    e.preventDefault();
    const t = $(this);
    var method = t.data("method") || "POST";
    var data = t.data("postdata");
    var target = t.data("href");
    var success = t.data("success");
    var failed = t.data("failed");
    var complete = t.data("complete");
    ajx(
      {
        url: target,
        data: data,
        method: method,
      },
      success,
      failed,
      complete
    );
  });
});

function show_install(res) {
  console.log(res);
}
