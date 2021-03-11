<?php

/**
 * @var PDO
 */
$pdo = $data['db'];
$subj = $data['subject'] = $_POST['subject'];
if (startsWith($_POST['whatsapp'], '0')) {
  $no = ltrim($_POST['whatsapp'], '0');
} else if (startsWith($_POST['whatsapp'], '62')) {
  $no = ltrim($_POST['whatsapp'], '62');
} else {
  $no = trim($_POST['whatsapp']);
}

$wa = '<a target="_blank" class="btn btn-success" href="https://api.whatsapp.com/send/?phone=62' . $no . '&text=Reply ' . $subj . ': &app_absent=0">Balas Via Whatsapp ' . $no . '</a>';
$msg = $data['msg'] = $_POST['msg'] . <<<EOF
<hr/>
$wa
EOF;

if (empty($msg) || empty($subj) || strlen(trim($_POST['whatsapp'])) < 10) {
  header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
  dumpJSON($data);
  exit;
}

$user = $data['user'] = $_SESSION['user']['username'];
$date = $data['date'] = date('Y-m-d');
$time = $data['time'] = date('H:i:s');
$is_admin = $data['is_admin'] = $_SESSION['user']['level'] == 'Developers' ? '1' : '0';
$is_user = $data['is_user'] =  $_SESSION['user']['level'] != 'Developers' ? '1' : '0';
$sql = "INSERT INTO tiket (`subjek`, `user`, `pesan`, `date`, `time`, `status`, `this_user`, `this_admin`) VALUES ('$subj','$user','$msg', '$date', '$time', 'Pending', '$is_user', '$is_admin')";
$prepare = $pdo->prepare("INSERT INTO tiket (`subjek`, `user`, `pesan`, `date`, `time`, `status`, `this_user`, `this_admin`) VALUES (:sub, :user, :msg, :datadate, :datatime, 'Pending', :is_user, :is_admin)");
$prepare->execute([
  'sub' => $subj,
  'user' => $user,
  'msg' => $msg,
  'datadate' => $date,
  'datatime' => $time,
  'is_user' => $is_user,
  'is_admin' => $is_admin
]);
dumpJSON($data);
