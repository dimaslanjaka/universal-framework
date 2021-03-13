//var url_refresh = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ACCESS_TOKEN&id_token=IDTOKEN';
if ($('#modal-unsubscribe').length) {
  $('#modal-unsubscribe').modal('show');
  $('#info-user').html($('#profile-info').html());
}

if ($('#view-email').length) {
  $('#view-email').on('mouseover', function () {
    var x = document.getElementById($(this).attr('view-for'));
    x.type = "text";
  });
  $('#view-email').on('mouseout', function () {
    var x = document.getElementById($(this).attr('view-for'));
    x.type = "password";
  });
}

var checkbox = document.getElementById('check5')

checkbox.addEventListener('change', function(event) {
  var result = '';
  if (event.target.checked) {
    var blogger = document.getElementById('email5');
    var result_html = document.getElementById('result-ajax');
    if (blogger && blogger.value != '') {
      $.post('/AGC/user/dashboard', { 'blogger_email': blogger.value }, function(e){
        result += "Blogger email saved.<br>";
        result_html.innerHTML = result;
      });
    }
    setTimeout(function() {
      result_html.innerHTML = '';
      setTimeout(function() {
        event.target.checked = false;
      }, 500);
    }, 5000);
  }
});