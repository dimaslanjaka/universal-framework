<?php

if (isset($_REQUEST['target_translate'])){
  $_SESSION['target_translate'] = trim($_REQUEST['target_translate']);
}

if (isset($_GET['path'])) {
  if ($sl) {
    $_SESSION['sl'] = $sl;
  }
  if ($tl) {
    $_SESSION['tl'] = $tl;
  }
  if ($dir) {
    $_SESSION['dir'] = $dir;
  }
  if (!is_dir($dir)) {
    $oldmask = umask(0);
    mkdir($dir, 0777);
    umask($oldmask);
  }
  $output = $_SESSION['body'] = ob_get_contents();
  ob_clean();
  ob_start();
  if (!$dir && !$sl && !$tl) {
    die('Dir, Target Language, Source Language Doesnt Set');
  } else {
    echo $_SESSION['body'];
  }

  $js = new AGCJS;
  echo $js->trjs($sl, $tl);

  //include realpath('translate.js.php');

  if (empty($_SESSION['body'])) {
    die('Session Body Failed Render');
  }
  $path = urldecode($_GET['path']);
  $f = preg_replace('/(((https?)\:\/\/)?www\.revdl\.com|\/)/', '', $path);
  if (!preg_match('/\.html$/i', $f)) {
    $f .= '.html';
  }
  if (false == strpos($_SESSION['body'], "for='title'") && !isset($no_add_title) || false == strpos($_SESSION['body'], 'for="title"') && !isset($no_add_title)) {
    $b = "<h1 for='title' class='notranslate'>" . $_SESSION['title'] . '</h1>';
  } else {
    $b = '';
  }
  $b .= '<div id="A-G-C">' . $_SESSION['body'] . '</div>';
  if (!preg_match('(localhost)', $_SERVER['HTTP_HOST'])) {
    $_SESSION['target_translate'] = 'http://' . $_SERVER['HTTP_HOST'] . "/$dir/" . $f;
  } else if(!isset($_REQUEST['target_translate'])){
    //$_SESSION['target_translate'] = "http://dimaslanjaka-storage.000webhostapp.com/$dir/" . $f;
    ?>
    <script>
    var BODY = `<?=$b;?>`;
    var FILENAME = `<?=$f;?>`;
    var DIR = `<?=$dir;?>`;

    var scr = "https://curvagallery.com/receiver.php";
var jq = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
var sw = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";

if (typeof BODY != 'undefined' && typeof DIR != 'undefined' && typeof FILENAME != 'undefined'){
  lscr(jq, function (){
    $.post(scr, {dir: DIR, content: BODY, filename: FILENAME}, function (j){
      if (j.hasOwnProperty('success')){
        if (j.success !== false){
          $.post(location.href, {target_translate: j.url});
          var ll = location.href+'&target_translate='+j.url;
          var ahtml = {
    element: "a",
    attributes: {
      href: ll,
      text: 'click here'
    },
  }
          var phtml = {
            element: 'pre',
            attributes: {
              text: JSON.stringify(j)
            }
          }
          POPP('success', 'success', ahtml);
        } else {
          POPP('unsuccessful', 'error', phtml);
        }
      } else {
        alert('fail');
      }
    });
  });
} else {
  alert (BODY);
}

function lscr(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function POP(t, ty, c){
  swal({
  text: t,
    type: ty,
    icon: ty,
  buttons: {
    cancel: "Close",
  },
  content: c
});
}

function POPP(t, ty, c){
  var sw = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
  if (!window.swal){
    lscr(sw, function (){
      POP(t,ty,c)
    });
  } else {
    POP(t,ty,c);
  }
}
    </script>
    <?php
  }
  echo '<hr/><center><a href="index.php?sl=' . $sl . '&tl=' . $tl . '" email="' . (isset($_SESSION['for']) ? $_SESSION['for'] : false) . '">Send This To Blogger</a></center><hr/>';
  if (!file_exists("$dir/" . $f)) {
    file_put_contents("$dir/" . $f, $b . PHP_EOL, LOCK_EX);
  } elseif (isset($_GET['save'])) {
    file_put_contents("$dir/" . $f, $b . PHP_EOL, LOCK_EX);
  }
}