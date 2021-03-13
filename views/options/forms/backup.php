<?php
require_once __DIR__ . '/../src/init.php';
if (isreq('backup', 'post') && isAdmin()) {
  try {
    backupDb();
    $core->dump(['success' => true]);
  } catch (\Throwable $th) {
    $core->dump(['error' => true, 'message' => $th->getMessage()]);
  }
}

function backupDb($filename = null, $dbHost = DB_NAME, $dbUsername = DB_USER, $dbPassword = DB_PASSWORD, $dbName = DB_NAME, $tables = '*')
{
  if (!$filename) {
    $filename = __DIR__ . '/db-' . date('d M Y') . '.sql';
  }
  //Database Connector
  $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

  //initialize global return
  $return = '';

  /*
   * Get ALL tables
   */
  if ('*' == $tables) {
    $tables = [];
    $result = $db->query('SHOW TABLES');
    while ($row = $result->fetch_row()) {
      $tables[] = $row[0];
    }
  } else {
    $tables = is_array($tables) ? $tables : explode(',', $tables);
  }

  //Loop tables
  foreach ($tables as $table) {
    $result = $db->query("SELECT * FROM $table");
    $numColumns = $result->field_count;

    $return .= "DROP TABLE `$table`;";

    $result2 = $db->query("SHOW CREATE TABLE $table");
    $row2 = $result2->fetch_row();
    $row2 = str_replace("'0000-00-00 00:00:00'", 'CURRENT_TIMESTAMP', $row2);

    $return .= "\n\n" . $row2[1] . ";\n\n";

    for ($i = 0; $i < $numColumns; ++$i) {
      while ($row = $result->fetch_row()) {
        $return .= "INSERT INTO $table VALUES(";
        for ($j = 0; $j < $numColumns; ++$j) {
          $row[$j] = addslashes($row[$j]);
          $row[$j] = str_replace("\n", '\\n', $row[$j]);
          if (isset($row[$j])) {
            $return .= '"' . $row[$j] . '"';
          } else {
            $return .= '""';
          }
          if ($j < ($numColumns - 1)) {
            $return .= ',';
          }
        }
        $return .= ");\n";
      }
    }
    $return .= "\n\n\n";
  }

  //save
  $handle = fopen($filename, 'w+');
  fwrite($handle, $return);
  fclose($handle);
}
