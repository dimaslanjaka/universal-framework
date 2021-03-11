<?php

/**
 * @var PDO
 */
$pdo = $data['db'];
$msg = $data['msg'] = $_POST['msg'];
$subj = $data['subject'] = $_POST['subject'];
if (empty($msg) || empty($subj)) {
  header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
  dumpJSON($data);
  exit;
}
$user = $data['user'] = $_SESSION['user']['username'];
$date = $data['date'] = date('Y-m-d');
$time = $data['time'] = date('H:i:s');
$is_admin = $data['is_admin'] = $_SESSION['user']['level'] == 'Developers' ? '1' : '0';
$is_user = $data['is_user'] =  $_SESSION['user']['level'] != 'Developers' ? '1' : '0';
$data['sql'] = "INSERT INTO tiket (`subjek`, `user`, `pesan`, `date`, `time`, `status`, `this_user`, `this_admin`) VALUES ('$subj','$user','$msg', '$date', '$time', 'Pending', '$is_user', '$is_admin')";
$pdo->exec($data['sql']);

dumpJSON($data);
