<?php

include realpath(__DIR__ . '/core/loader/index.php');

if (isset($_REQUEST['for'])) {
  $_SESSION['for'] = $_REQUEST['for'];
}

if (isset($_GET['clean'])) {
  session_destroy();
  header('Location: index.php');
}

if (isset($_GET['proxy'])) {
  $_SESSION['proxy'] = $_GET['proxy'];
  if (isset($_SESSION['last_page'])) {
    header('Location: ' . $_SESSION['last_page']);
  }
} elseif (isset($_REQUEST['proxy'])) {
  $_SESSION['proxy'] = $_REQUEST['proxy'];
  if (isset($_SESSION['last_page'])) {
    header('Location: ' . $_SESSION['last_page']);
  }
}

if (!isset($_SESSION['for'])) {
  include 'views/index-select.php';

  $output = ob_get_contents();
  ob_clean();
  ob_start();
  exit($parser->fixhtml($output));
}

if (isset($_GET['set_proxy'])) {
  include 'views/proxy.php';
  $output = ob_get_contents();
  ob_clean();
  ob_start();
  exit($parser->fixhtml($output));
}

if (!isset($_SESSION['target_translate'])) {
  include 'index.html';
  $output = ob_get_contents();
  ob_clean();
  ob_start();
  exit($parser->fixhtml($output));
}

if (isset($_SESSION['target_translate'])) {
  $i = $_SESSION['target_translate'];
  $fn = explode('/', $i);
  if (!preg_match("/\.html$/i", $i)) {
    die('File must HTML mime type');
  }
  if (empty($fn)) {
    die('url explode failed');
  }
  $fn = end($fn);
  if (isset($_SESSION['dir'])) {
    $dir = $_SESSION['dir'] . '/';
  } elseif (false !== strpos($i, '/movies/')) {
    $dir = 'movies/';
  } elseif (preg_match('(\/apk\/|revdl)', $i)) {
    $dir = 'apk/';
  } elseif (preg_match('(\/mp3\/)', $i)) {
    $dir = 'mp3/';
  }

  if (isset($_SESSION['tl'])) {
    $tl = $_SESSION['tl'];
  } elseif (isset($_GET['tl'])) {
    $tl = $_GET['tl'];
  } else {
    $tl = 'en';
  }
  if (isset($_SESSION['sl'])) {
    $sl = $_SESSION['sl'];
  } elseif (isset($_GET['sl'])) {
    $sl = $_GET['sl'];
  } else {
    $sl = 'id';
  }

  $c = '<!--translated-->' . $google->translate($i, $sl, $tl);
  $c = preg_replace('/(\<body\>|\<\/body\>)/mi', '', $c);
  $c = trim($c);
  if (preg_match('/(Additional, a 404 error found to handle the request|The server encountered an internal error or misconfiguration and was unable to complete your request|404\. That\'s an error)/m', $c)) {
    if ($core->isDump()) {
      echo $_SESSION['target_translate'] . '<br/>';
    }
    die('Error: (Harap kontak Admin). ');
  } elseif ($core->isDump()) {
    echo $c;
    die();
  }

  $_SESSION['body'] = $c;
  if (!file_exists($dir . $fn)) {
    file_put_contents($dir . $fn, $c . PHP_EOL, LOCK_EX);
    $_SESSION['done_url'] = $dir . fn;
    echo "saved & translated\n";
  } else {
    $exists = file_get_contents($dir . $fn);
    if (false === strpos($exists, '<!--translated-->')) {
      file_put_contents($dir . $fn, $c . PHP_EOL, LOCK_EX);
      echo "Translated\n";
    }
  }
  echo '<hr/>Article Will be sent to ' . $_SESSION['for'] . "\n<hr/>";
  echo "You can change it, must be restart from <a href='index.php?clean'>Here</a>";
  include realpath('sender.php');
} //session target_translate
