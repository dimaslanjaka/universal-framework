<?php

if (!isset($_COOKIE['session_id'])) {
  setcookie('session_id', session_id(), time() + 3600);
}
$Sid = (isset($_COOKIE['session_id']) ? $_COOKIE['session_id'] : session_id());

$day = date('d');

if (0 == $number % 2) {
  $tunnel = 'https://l3n4ar0x-yt2mp3.herokuapp.com';
} else {
  $tunnel = 'https://l3n4r0x-ytdl.herokuapp.com';
}

//$tunnel = 'http://localhost:5000';
if (!isset($_COOKIE['check_server'])) {
  setcookie('check_server', session_id(), time() + 3600 * 24);
  dimas_curl::chain(OPT())->init($tunnel . '/check_log&session=' . $Sid)->UA($_SERVER['HTTP_USER_AGENT'])->ref(get_site_url())->get()->exec();
}

if (isset($_REQUEST['mp3'])) {
  $id = (false === $core->dist ? $_REQUEST['id'] : form::i()->post('id')->notempty()->value);
  $curl = dimas_curl::chain(OPT())->init($tunnel . '/mp3?save=true&session=' . $Sid . '&url=' . $id)->UA($_SERVER['HTTP_USER_AGENT'])->ref(get_site_url())->get()->exec();
  $core->dump($curl);
}

if (isset($_REQUEST['mp4'])) {
  $id = (!$core->dist ? $_REQUEST['id'] : form::i()->post('id')->notempty()->value);
  $curl = dimas_curl::chain(OPT())->init($tunnel . '/api?save=true&session=' . $Sid . '&url=https://www.youtube.com/watch?v=' . $id)->UA($_SERVER['HTTP_USER_AGENT'])->ref(get_site_url())->get()->exec();
  $core->dump($curl);
}

if (isset($_REQUEST['download'])) {
  $url = urldecode($_REQUEST['url']); // . '&session=' . $Sid;
  exit(header('Location: ' . $url));
}

if (isset($_REQUEST['gsess'])) {
  $core->dump(['s' => $Sid]);
}
