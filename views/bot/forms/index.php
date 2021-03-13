<?php

$sql = "CREATE TABLE IF NOT EXISTS `python` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
$create = "INSERT IGNORE INTO `python` (`id`, `key`, `status`, `user`) VALUES
(99, 'farid-polak', 'active', 'farid');";

if (isset($_REQUEST['key'])) {
  $pdo->SQL_Exec($pdo->sql, $sql);
  $pdo->SQL_Exec($pdo->sql, $create);
  $sel = $pdo->SQL_Fetch($pdo->sql, "SELECT * FROM `python` WHERE `key`='" . $_REQUEST['key'] . "'");
  $active = ($sel['key'] == $_REQUEST['key'] && 'active' == $sel['status']);
  if (isset($_REQUEST['python'])) {
    if (isset($_REQUEST['update'])) {
      if ($active) {
        call_(__DIR__ . '/../web.py', 'py');
      } else {
        $core->dump(['error' => 'key inactive', 'dump' => $sel]);
      }
    }
  }
  if (isset($_REQUEST['proxy'])) {
    call_(__DIR__ . '/../proxy.txt', 'txt');
  }
}

function call_($file, $t)
{
  if ('py' == $t) {
    header('Content-type: text/x-python; charset=utf-8');
  } else {
    header('Content-Type: text/plain; charset=utf-8');
  }
  //header('Content-type: application/x-python-code');
  if (file_exists($file)) {
    echo file_get_contents($file);
    exit;
  }
  //header('Content-Disposition: attachment; filename="' . $file . '"');
}
