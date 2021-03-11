<?php
//header('Content-Type: application/json');
header('Content-Type: text/plain; charset=utf-8');

/**
 * @var PDO
 */
$pdo = $data['db'];
$pdo->exec("SET sql_mode='NO_BACKSLASH_ESCAPES'");
$pdo->exec("SET NAMES `utf8` COLLATE `utf8_general_ci`");

if ($_REQUEST['table'] == '*') {
  $showtbl = $pdo->prepare("SHOW TABLES");
  $showtbl->execute();
  $tables = $showtbl->fetchAll(\PDO::FETCH_COLUMN);
} else {
  $tables =  explode(',', $_REQUEST['table']);
}

foreach ($tables as $table) {
  $res = "";
  $res .= "/*---------------------------------------------------------------" .
    "\n  TABLE: `{$table}`" .
    "\n  ---------------------------------------------------------------*/\n\n";
  $res .= "DROP TABLE IF EXISTS `{$table}`;\n";
  $creation = $pdo->prepare("SHOW CREATE TABLE `{$table}`");
  $creation->execute();
  $result = $creation->fetchAll(\PDO::FETCH_KEY_PAIR);
  $res .= $result[$table] . ";\n";
  $select = $pdo->prepare("SELECT * FROM `{$table}`");
  $select->execute();
  $selectdata = $select->fetchAll(PDO::FETCH_ASSOC);

  $num_rows = count($selectdata);
  if ($num_rows > 0) {
    $vals = array();
    $z = 0;
    for ($i = 0; $i < $num_rows; ++$i) {
      $items = $selectdata[$i];
      //var_dump($items);
      $vals[$z] = "(";
      $counter = 0;
      $maxcounter = count($items);
      foreach ($items as $key => $value) {
        //var_dump($key, $value);
        /*
      if (!empty($value)) {
        $vals[$z] .= "'" . escape_mysql_string($value) . "'";
      } else {
        $vals[$z] .= "NULL";
      }
      */
        $vals[$z] .= "'" . escape_mysql_string($value) . "'";
        if ($counter < $maxcounter - 1) {
          $vals[$z] .= ",";
        }
        $counter++;
      }
      $vals[$z] .= ")";
      $z++;
      $res .= "INSERT INTO `{$table}` VALUES ";
      $res .= "  " . implode(";\nINSERT INTO `{$table}` VALUES ", $vals) . ";\n";
    }
  }


  echo $res;
}


function &backup_tables($host, $user, $pass, $name, $tables = '*')
{
  $res = "\n/*---------------------------------------------------------------" .
    "\n  SQL DB BACKUP " . date("d.m.Y H:i") . " " .
    "\n  HOST: {$host}" .
    "\n  DATABASE: {$name}" .
    "\n  TABLES: {$tables}" .
    "\n  ---------------------------------------------------------------*/\n";
  $link = mysql_connect($host, $user, $pass);
  mysql_select_db($name, $link);
  mysql_query("SET NAMES `utf8` COLLATE `utf8_general_ci`", $link); // Unicode

  if ($tables == '*') { //get all of the tables
    $tables = array();
    $result = mysql_query("SHOW TABLES");
    while ($row = mysql_fetch_row($result)) {
      $tables[] = $row[0];
    }
  } else {
    $tables = is_array($tables) ? $tables : explode(',', $tables);
  }

  foreach ($tables as $table) {
    $res .= "\n/*---------------------------------------------------------------" .
      "\n  TABLE: `{$table}`" .
      "\n  ---------------------------------------------------------------*/\n";
    $res .= "DROP TABLE IF EXISTS `{$table}`;\n";
    $res = mysql_query("SHOW CREATE TABLE `{$table}`", $link);
    $row = mysql_fetch_row($res);
    $res .= $row[1] . ";\n";

    $result = mysql_query("SELECT * FROM `{$table}`", $link);
    $num_rows = mysql_num_rows($result);

    if ($num_rows > 0) {
      $vals = array();
      $z = 0;
      for ($i = 0; $i < $num_rows; $i++) {
        $items = mysql_fetch_row($result);
        $vals[$z] = "(";
        for ($j = 0; $j < count($items); $j++) {
          if (isset($items[$j])) {
            $vals[$z] .= "'" . mysql_real_escape_string($items[$j], $link) . "'";
          } else {
            $vals[$z] .= "NULL";
          }
          if ($j < (count($items) - 1)) {
            $vals[$z] .= ",";
          }
        }
        $vals[$z] .= ")";
        $z++;
      }
      $res .= "INSERT INTO `{$table}` VALUES ";
      $res .= "  " . implode(";\nINSERT INTO `{$table}` VALUES ", $vals) . ";\n";
    }
  }
  mysql_close($link);
  return $res;
}
