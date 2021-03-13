<?php
include realpath(__DIR__ .'/AGC/core/loader/index.php');

if (isset($_POST["kirim-email"])){
$from = (isset($_REQUEST['from']) ? $_REQUEST['from'] : false);
$to = (isset($_REQUEST['to']) ? $_REQUEST['to'] : false);
$subject = (isset($_REQUEST['subject']) ? $_REQUEST['subject'] : false);
$body = (isset($_REQUEST['msg']) ? $_REQUEST['msg'] : false);

if ($from && $to && $subject && $body){
$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'dimascyber008@gmail.com',
        'password' => 'tvyjcdoawjrkvwxx'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    $msg['error'] = $mail->getMessage();
} else {
    $msg['success'] = 'Message successfully sent!';
}
} else {
  $msg['error'] = 'subject, email recipients, and messages empty';
}
echo json_encode($msg);
} else {

}