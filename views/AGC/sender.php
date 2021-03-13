<?php

$core = new agc();
if (!isset($_POST['title']) && !isset($_POST['body'])) {
  $logtxt = file_get_contents('log.txt');
  echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css" integrity="sha256-dMQYvN6BU9M4mHK94P22cZ4dPGTSGOVP41yVXvXatws=" crossorigin="anonymous" />
<div id="button_mail" class="container">';
  $ex_s = explode('/', $_SESSION['target_translate']);
  $exs = end($ex_s);
  if ($core->isDump) {
    $core->dump([$exs, $logtxt, strpos($logtxt, $exs)]);
  }
  if (false === strpos($logtxt, $exs) || isset($_GET['FORCE'])) {
    echo '<button id="send_mail" class="button" email="' . $_SESSION['for'] . '">Send This To Blogger</button>';
  } else {
    echo 'This AGC Was Sent To Another User, Please Choose Another AGC Target';
  }
  echo '</div>
<script>
$(document).ready(function() {
$("button#send_mail").click(function(){
  $.post("mail.php", {
    title: "' . urlencode($_SESSION['title']) . '",
    body: "' . urlencode($_SESSION['body']) . '"
  }, function(data){
    $("div#button_mail").html(data);
  });
});
});
</script>';
}
