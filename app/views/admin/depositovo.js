/**
 * untuk mengurangi penggunaan api, dibuat cache mode agar lebih awet
 */
var td = localStorage.getItem("ovo-summary").toString().trim();
if (td === null) {
  fetchSummary();
}
$("#summary-body").html(td);
$("#summary-refresh").on("click", function (e) {
  e.preventDefault();
  fetchSummary();
});

function fetchSummary() {
  $.get("/public/admin/balanceovo", function (data) {
    td = "";
    data.forEach((element) => {
      var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      var uniqid = randLetter + Date.now();
      td += `
      <tr>
      <th scope="row">${element.payment_method}</th>
      <td>${element.card_no}</td>
      <td id="saldo-${uniqid}">${element.card_balance}</td>
      </tr>`;
    });
    localStorage.setItem("ovo-summary", td.trim());
    $("#summary-body").html(td);
  });
}
