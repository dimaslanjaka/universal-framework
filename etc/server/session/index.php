<?php

$session = $_SESSION;

$result = ['user' => [], 'sess_max' => [], 'sess_start' => []];
$result['user'] = \ArrayHelper\helper::unset($session['login'], ['password']);
if (isset($session['session_started'])) {
  $result['sess_start'] = $session['session_started']->format('c');
}
if (isset($session['cookie_timeout'])) {
  $result['sess_max'] = $session['cookie_timeout'];
}

$telkomsel = $im3 = [];
if (user()->is_admin()) {
  $result['sessions'] = $session;
  if (isset($session['im3'])) {
    $im3 = $session['im3'];
  }
  if (isset($session['telkomsel'])) {
    $telkomsel = $session['telkomsel'];
  }
} else {
}

if (isset($session['im3'])) {
  $im3 = \ArrayHelper\helper::get($session['im3'], ['msisdn']);
}
if (isset($session['telkomsel'])) {
  $telkomsel = \ArrayHelper\helper::get($session['telkomsel'], ['msisdn']);
}

$result['im3'] = $im3;
$result['telkomsel'] = $telkomsel;

e($result);
