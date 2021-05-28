$.fn.dataTable.ext.errMode = "none";
var table = $("#list").DataTable({
    destroy: true,
    //dom: "Bfrtip",
    processing: false,
    serverSide: false,
    stateSave: false,
    autoWidth: false,
    responsive: true,
    deferRender: true,
    paging: true,
    scrollX: true,
    lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],
    ajax: {
        url: "/html-builder/index",
        method: "POST",
        data: {
            fetch: "1",
        },
        dataSrc: function (res) {
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                res[index].title = element.config.title;
            }
            //console.log(res);

            return res;
        },
    },
    columnDefs: [
        { className: "text-center", targets: "_all" },
        {
            targets: 0,
            searchable: true,
            title: "TITLE",
            data: "title",
        },
        {
            targets: 1,
            title: "Action",
            searchable: false,
            render: function (data, type, row, meta) {
                console.log(row);
                return `<div class="btn-group">
                <button class="btn btn-success btn-sm" data-href="/html-builder/index?render=${row.name}" title="preview"><i class="far fa-eye"></i></button>
                <button class="btn btn-primary btn-sm" data-href="/html-builder/edit?name=${row.name}" title="edit"><i class="far fa-pen"></i></button>
                </div>`;
            },
        },
    ],
});
