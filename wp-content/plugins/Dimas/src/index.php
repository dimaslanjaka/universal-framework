<?php
if (!session_id() || PHP_SESSION_NONE == session_status()) {
  ini_set('memory_limit', '256M'); //-1
  $session_dir = $_SERVER['DOCUMENT_ROOT'] . '/tmp';
  chmod($session_dir, 0777);
  if (is_writable($session_dir)) {
    ini_set('session.gc_probability', 1);
    ini_set('session.save_path', $session_dir);
    ini_set('session.gc_maxlifetime', 3600);
    session_set_cookie_params(3600);
  }
  session_start();
  $now = new DateTime(null, new DateTimeZone('Asia/Jakarta'));
  $date_format = $now->format('Y-m-d H:i:s');
  $timestamp = $now->getTimestamp();
  $_SESSION['start'] = $date_format;
  $current_time = strtotime('now');
  if (isset($_SERVER['detach-sessions']) || isset($_POST['detach-sessions'])) {
    if ($current_time > strtotime('12:00am') && $current_time < strtotime('01:00am')) {
      array_map('unlink', glob("$session_dir/sess_*"));
    }
  }
}
