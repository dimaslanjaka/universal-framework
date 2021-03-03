$.get("/public/admin/balanceovo", function (data) {
  console.log(data);
  var td = "";
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
  $("#summary-body").html(td);
});
