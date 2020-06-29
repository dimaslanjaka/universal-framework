/// <reference types="jquery" />
/// <reference types="datatables.net"/>
/// <reference types="datatables.net-buttons"/>

declare namespace DataTables {
  interface ExtButtonsSettings {
    //refresh: ExtButtonsCollectionSettings;
    refresh: {
      extend: "collection";
      text: '<i class="fas fa-sync"></i>';
      className: "btn btn-info";
      action: `function (e, dt, node, config) {
            dt.clear().draw();
            dt.ajax.reload();
          }`;
    };
  }
}
