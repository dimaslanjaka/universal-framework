<?php

//include realpath(__DIR__ . '/core/loader/index.php');

if (isset($_POST['body']) && isset($_POST['title']) && 'POST' === $_SERVER['REQUEST_METHOD']) {
  if (isset($_SESSION['for']) && filter_var($_SESSION['for'], FILTER_VALIDATE_EMAIL) && false !== strpos($_SESSION['for'], '@blogger.com')) {
    $to = $_SESSION['for'];
  } else {
    exit('String: ' . $_SESSION['for'] . ' Isnt Valid Email, Or Email Required');
  }

  $title = urldecode($_POST['title']);
  $body = agcparser::getInstance()->parsingview(urldecode($_POST['body']))->combine()->__toString() or die("Body Required, Contact <a href='mailto:dimaslanjaka@gmail.com'>Admin</a>");
  if ($body) {
    $body .= '<script src="https://codepen.io/dimaslanjaka/pen/aQRrbR.js"></script>';
  }

  $from = 'dimascyber008@gmail.com';
  $subject = $title;
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
  $dimas = new dimas();
  if (PEAR::isError($mail)) {
    echo '<p>PEAR::isError: ' . $mail->getMessage() . '</p><pre>' . $dimas->cj($headers) . '</pre>';
  } else {
    try {
      echo '<p>Message successfully sent!</p>';
      file_put_contents(ROOT . '/views/AGC/log.txt', $_SESSION['target_translate'] . "\r\n", LOCK_EX | FILE_APPEND);
      unses('body');
      unses('body_translated');
      unses('translating');
      if (isset($_SESSION['target'])) {
        $parse = parse_url($_SESSION['target']);
        $exp = explode('/', $_SESSION['target_translate']);
        $FN = str_replace('.html', '', end($exp));
        $headers['body'] = $body;
        if (isset($parse['host'])) {
          _file_(ROOT . '/views/AGC/sents/' . $parse['host'] . '/' . $FN . '.json', $dimas->cj($headers), true);
        }
      }
      //session_destroy();
      unses('body');
      unses('title');
      unses('target_translation');
      unses('body_translated');
    } catch (Exception $e) {
      echo $e->getMessage();
    }
  }
}
exit;
