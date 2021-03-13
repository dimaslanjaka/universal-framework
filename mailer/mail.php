<?php
require __DIR__ . '/vendor/autoload.php';
$to = isset($_REQUEST['to']) ? trim($_REQUEST['to']) : 'lukman.fun1@gmail.com';
$subject = isset($_REQUEST['subject']) ? trim($_REQUEST['subject']) : 'Subject Mail';
$body = isset($_REQUEST['body']) ? trim($_REQUEST['body']) : 'Body Mail';
$from = isset($_REQUEST['from']) ? trim($_REQUEST['from']) : 'dimascyber008@gmail.com';

$body = "$body\n#end";

$headers = [
  'From' => $from,
  'To' => $to,
  'Subject' => $subject,
  'MIME-Version' => '1.0',
  'Content-Type' => 'text/html; charset=UTF-8',
];

$smtp = Mail::factory('smtp', [
  'host' => 'ssl://smtp.gmail.com',
  'port' => '465',
  'auth' => true,
  'username' => 'dimascyber008@gmail.com',
  'password' => 'oacjnzwovgejrdjb',
]);

$mail = $smtp->send($to, $headers, $body);
$result = [];
if (PEAR::isError($mail)) {
  $result['error'] = true;
  $result['message'] = $mail->getMessage();
  $result['header'] = json_encode($headers);
} else {
  try {
    $result['success'] = true;
    $result['message'] = 'Message successfully sent';
  } catch (Exception $e) {
    $result['error'] = true;
    $result['message'] = $e->getMessage();
  }
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
