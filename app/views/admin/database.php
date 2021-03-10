<?php
header('Content-Type: application/json');
/**
 * @var PDO
 */
$pdo = $data['db'];

$setn = $pdo->exec("SET NAMES `utf8` COLLATE `utf8_general_ci`");
$showtbl = $pdo->prepare("SHOW TABLES");
$showtbl->execute();
$result = $showtbl->fetchAll(\PDO::FETCH_COLUMN);
var_dump($result);

function &backup_tables($host, $user, $pass, $name, $tables = '*')
{
  $data = "\n/*---------------------------------------------------------------" .
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
    $data .= "\n/*---------------------------------------------------------------" .
      "\n  TABLE: `{$table}`" .
      "\n  ---------------------------------------------------------------*/\n";
    $data .= "DROP TABLE IF EXISTS `{$table}`;\n";
    $res = mysql_query("SHOW CREATE TABLE `{$table}`", $link);
    $row = mysql_fetch_row($res);
    $data .= $row[1] . ";\n";

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
      $data .= "INSERT INTO `{$table}` VALUES ";
      $data .= "  " . implode(";\nINSERT INTO `{$table}` VALUES ", $vals) . ";\n";
    }
  }
  mysql_close($link);
  return $data;
}
