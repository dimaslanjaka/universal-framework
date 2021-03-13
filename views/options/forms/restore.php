<?php
require_once __DIR__ . '/../src/init.php';
if (isreq('fdb', 'post') && isAdmin()) {
  try {
    restoreDb(isreq('fdb'));
    $core->dump(['success' => true]);
  } catch (\Throwable $th) {
    $core->dump(['error' => true, 'message' => $th->getMessage()]);
  }
}

function restoreDb(
  $filename,
  $dbHost = DB_HOST,
  $dbUser = DB_USER,
  $dbPass = DB_PASSWORD,
  $dbName = DB_NAME,
  $maxRuntime = 8
) {
  $deadline = time() + $maxRuntime;
  $progressFilename = __DIR__ . '/' . $filename . '_filepointer'; // tmp file for progress
  $errorFilename = __DIR__ . '/' . $filename . '_error'; // tmp file for erro

  $db = mysqli_connect($dbHost, $dbUser, $dbPass) or die('connecting to host: ' . $dbHost . ' failed: ' . mysqli_error($db));
  mysqli_select_db($db, $dbName) or die('select db: ' . $dbName . ' failed: ' . mysqli_error($db));

  ($fp = fopen($filename, 'r')) or die('failed to open file:' . $filename);

  // check for previous error
  if (file_exists($errorFilename)) {
    die('<pre> previous error: ' . file_get_contents($errorFilename));
  }

  // activate automatic reload in browser
  echo '<html><head> <meta http-equiv="refresh" content="' . ($maxRuntime + 2) . '"><pre>';

  // go to previous file position
  $filePosition = 0;
  if (file_exists($progressFilename)) {
    $filePosition = file_get_contents($progressFilename);
    fseek($fp, $filePosition);
  }

  $queryCount = 0;
  $query = '';
  while ($deadline > time() and ($line = fgets($fp, 1024000))) {
    if (substr($line, 0, 2) == '--' or trim($line) == '') {
      continue;
    }

    $query .= $line;
    if (substr(trim($query), -1) == ';') {
      if (!mysqli_query($db, $query)) {
        $error = 'Error performing query \'<strong>' . $query . '\': ' . mysqli_error($db);
        file_put_contents($errorFilename, $error . "\n");
        exit;
      }
      $query = '';
      file_put_contents($progressFilename, ftell($fp)); // save the current file position for
      $queryCount++;
    }
  }

  if (feof($fp)) {
    echo 'dump successfully restored!';
    wp_upgrade();
  } else {
    echo ftell($fp) . '/' . filesize($filename) . ' ' . (round(ftell($fp) / filesize($filename), 2) * 100) . '%' . "\n";
    echo $queryCount . ' queries processed! please reload or wait for automatic browser refresh!';
  }
}
