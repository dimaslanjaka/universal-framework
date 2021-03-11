$(document).ready(function () {
  //var firstName = $("#firstName").text();
  //var lastName = $("#lastName").text();
  //var intials = $("#firstName").text().charAt(0) + $("#lastName").text().charAt(0);
  //var profileImage = $("#profileImage").text(intials);
  var pi = $("[id^='profileImage']");
  for (let index = 0; index < pi.length; index++) {
    const element = pi[index];
    var nama = element.getAttribute("data-name").split(" ");
    var intials = nama[0].charAt(0) + nama[1].charAt(0);
    element.textContent = intials;
    $(element).addClass("profileImage");
  }
});
