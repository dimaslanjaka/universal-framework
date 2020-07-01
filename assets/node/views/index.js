/**
 * @type {{local:[],global:[]}}
 */
var packages = {
  local: [],
  global: [],
};
$(document).ready(function () {
  datatables_init().then(renderDatatables);
});

function renderDatatables() {
  $("#local").DataTable({
    destroy: true,
    dom: "Bfrtip",
    processing: false,
    serverSide: false,
    stateSave: true,
    autoWidth: false,
    responsive: true,
    deferRender: true,
    paging: true,
    lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],
    buttons: [
      {
        text: "Refresh",
        action: function (e, dt, node, config) {
          dt.clear().draw();
          dt.ajax.reload();
          LoadSocket().emit("fetch");
        },
      },
    ],
    ajax: {
      url: "fetch",
      method: "POST",
      data: { local: "true" },
      dataType: "json",
      dataSrc: function (data, textStatus, jqXHR) {
        if (typeof data == "object" && data.hasOwnProperty("dependencies")) {
          if (data.hasOwnProperty("dependencies")) {
            for (const key in data.dependencies) {
              if (data.dependencies.hasOwnProperty(key)) {
                const info = data.dependencies[key];
                packages.local.push({ name: key, version: info.version });
              }
            }
          }
        }

        console.log(packages);
        return packages.local;
      },
    },
    columns: [
      { title: "package", data: "name" },
      { title: "installed", data: "version" },
    ],
  });
  $(".mdb-select").not(".select-wrapper").materialSelect();
  $(".dt-button").addClass("btn btn-primary btn-sm");
}

LoadScript("/socket.io/socket.io.js", LoadSocket);

var socket;
/**
 * Load Socket.io
 * @param {function('event', {message: "string"})} callback
 * @returns {SocketIOClientStatic}
 */
function LoadSocket(callback) {
  if (!socket) {
    socket = io.connect("/");
    socket.on("announcements", function (data) {
      console.log("Got announcement:", data.message);
    });
  }
  //socket.emit("event", { message: "Hey, I have an important message!" });
  return socket;
}
