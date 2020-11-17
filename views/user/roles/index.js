$("#dt").DataTable({
  ajax: {
    url: "/user/roles/fetch",
    dataSrc: "",
  },
  order: [],
  columns: [{}],
});
