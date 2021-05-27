var table;
(function () {
    load_module(
        [
            "datatables.net",
            "datatables.net-bs4",
            "datatables.net-colreorder",
            "datatables.net-rowreorder",
            "datatables.net-scroller",
            "datatables.net-select",
            "datatables.net-buttons",
            "datatables.net-buttons-html5",
        ],
        function () {
            loadCSS([
                "https://adminlte.io/themes/v3/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
                "https://adminlte.io/themes/v3/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
            ]);
            datatables_init().then(loadDT);
        }
    );
})();

function loadDT() {
    table = $("#list").DataTable({
        destroy: true,
        //dom: "Bfrtip",
        processing: false,
        serverSide: false,
        stateSave: false,
        autoWidth: false,
        responsive: true,
        deferRender: true,
        paging: true,
        lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],
        ajax: {
            url: "/html-builder",
            method: "POST",
            data: {
                fetch: guid(),
            },
            dataSrc: function (res) {
                console.log(res);

                return res;
            },
        },
        columns: [
            {
                title: "username",
                data: "username",
            },
            {
                title: "name",
                data: "display_name",
            },
            {
                title: "email",
                data: "email",
            },
            {
                title: "Role",
                data: "role",
            },
            {
                title: "Last seen",
                data: "last_seen",
            },
        ],
    });
    table.on("init.dt", function () {
        $(this).removeClass("table-loader").show();
    });
}
