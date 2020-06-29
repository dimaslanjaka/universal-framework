class ctable {
  private can_edit = null;
  private instance: JQuery = null;
  constructor(config?: ctableOpt) {
    if (typeof config == "object") {
      if (config.hasOwnProperty("editable") && config.editable) {
        this.can_edit = true;
      }
    }
  }
  create(id: string, where: string, data: string[]) {
    var table: string;
    if (this.can_edit) {
      table += `<table id='${id}' class='table table-responsive'><span class="table-add fas fa-plus" style="position: absolute;right:15px;top:15px;"></span><thead><tr>`;
    } else {
      table = `<table id='${id}' class='table table-responsive'><thead><tr>`;
    }
    for (var i = 0; i < data.length; i++) {
      table = table + "<th>" + data[i] + "</th>";
    }
    table = table + "</tr></thead><tbody></tbody></table>";
    document.getElementById(where).innerHTML += table;
    if (this.can_edit) {
      setTimeout(function () {
        this.instance = $(`table#${id}`);
        this.editable(this.instance, true);
      }, 500);
    }
  }

  add(table: string, data: any[]) {
    var row = "<tr>";
    for (var i = 0; i < data.length; i++) {
      var td = data[i];
      if (typeof td == "object" || Array.isArray(td)) {
        td = `<pre class="json">${JSON.stringify(td, null, 2)}</pre>`;
      }
      if (!this.can_edit) {
        row += "<td>" + td + "</td>";
      } else {
        row += '<td contenteditable="true">' + td + "</td>";
      }
    }
    if (this.can_edit) {
      row += `<td><span class="table-remove fas fa-trash"></span></td><td> <span class="table-up fas fa-arrow-up"></span> <span class="table-down fas fa-arrow-down"></span> </td>`;
    }
    row += "</tr>";
    document
      .getElementById(table)
      .getElementsByTagName("tbody")[0].innerHTML += row;
  }

  editable($TABLE: JQuery, activate?: boolean) {
    if (activate && $TABLE && $TABLE.length) {
      $(".table-add").click(function () {
        var $clone = $TABLE
          .find("tr.hide")
          .clone(true)
          .removeClass("hide table-line");
        $TABLE.find("table").append($clone);
      });

      $(".table-remove").click(function () {
        $(this).parents("tr").detach();
      });

      $(".table-up").click(function () {
        var $row = $(this).parents("tr");
        if ($row.index() === 1) return; // Don't go above the header
        $row.prev().before($row.get(0));
      });

      $(".table-down").click(function () {
        var $row = $(this).parents("tr");
        $row.next().after($row.get(0));
      });
    }
  }
}

interface ctableOpt {
  editable?: boolean;
}
