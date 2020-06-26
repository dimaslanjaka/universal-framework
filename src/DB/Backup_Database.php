<?php

// Report all errors
error_reporting(E_ALL);

/*
 * Define database parameters here
 */
define('DB_USER', '');
define('DB_PASSWORD', '');
define('DB_NAME', '');
define('DB_HOST', '');
define('OUTPUT_DIR', '');
define('TABLES', '*');

/**
 * Instantiate Backup_Database and perform backup.
 */
$backupDatabase = new Backup_Database(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$status = $backupDatabase->backupTables(TABLES, OUTPUT_DIR) ? 'OK' : 'KO';
echo '<br /><br /><br />Backup result: ' . $status;

/**
 * The Backup_Database class.
 */
class Backup_Database
{
  /**
   * Host where database is located.
   */
  public $host = '';

  /**
   * Username used to connect to database.
   */
  public $username = '';

  /**
   * Password used to connect to database.
   */
  public $passwd = '';

  /**
   * Database to backup.
   */
  public $dbName = '';

  /**
   * Database charset.
   */
  public $charset = '';
  /**
   * @var \mysqli
   */
  public $conn;

  /**
   * Constructor initializes database.
   */
  public function Backup_Database($host, $username, $passwd, $dbName, $charset = 'utf8')
  {
    $this->host = $host;
    $this->username = $username;
    $this->passwd = $passwd;
    $this->dbName = $dbName;
    $this->charset = $charset;

    $this->initializeDatabase();
  }

  protected function initializeDatabase()
  {
    $this->conn = mysqli_connect($this->host, $this->username, $this->passwd);
    mysqli_select_db($this->dbName, $this->conn);
    if (!mysqli_set_charset($this->charset, $this->conn)) {
      mysqli_query($this->conn, 'SET NAMES ' . $this->charset);
    }
  }

  /**
   * Backup the whole database or just some tables
   * Use '*' for whole database or 'table1 table2 table3...'.
   *
   * @param string $tables
   */
  public function backupTables($tables = '*', $outputDir = '.')
  {
    try {
      /*
       * Tables to export
       */
      if ('*' == $tables) {
        $tables = [];
        $result = mysqli_query($this->conn, 'SHOW TABLES');
        while ($row = mysqli_fetch_row($result)) {
          $tables[] = $row[0];
        }
      } else {
        $tables = is_array($tables) ? $tables : explode(',', $tables);
      }

      $sql = 'CREATE DATABASE IF NOT EXISTS ' . $this->dbName . ";\n\n";
      $sql .= 'USE ' . $this->dbName . ";\n\n";

      /*
       * Iterate tables
       */
      foreach ($tables as $table) {
        echo 'Backing up ' . $table . ' table...';

        $result = mysqli_query($this->conn, 'SELECT * FROM ' . $table);
        $numFields = mysqli_num_fields($result);

        $sql .= 'DROP TABLE IF EXISTS ' . $table . ';';
        $row2 = mysqli_fetch_row(mysqli_query($this->conn, 'SHOW CREATE TABLE ' . $table));
        $sql .= "\n\n" . $row2[1] . ";\n\n";

        for ($i = 0; $i < $numFields; ++$i) {
          while ($row = mysqli_fetch_row($result)) {
            $sql .= 'INSERT INTO ' . $table . ' VALUES(';
            for ($j = 0; $j < $numFields; ++$j) {
              $row[$j] = addslashes($row[$j]);
              $row[$j] = preg_replace("[^\r]\n", '\\n', $row[$j]);
              if (isset($row[$j])) {
                $sql .= '"' . $row[$j] . '"';
              } else {
                $sql .= '""';
              }

              if ($j < ($numFields - 1)) {
                $sql .= ',';
              }
            }

            $sql .= ");\n";
          }
        }

        $sql .= "\n\n\n";

        echo ' OK' . '<br />';
      }
    } catch (Exception $e) {
      var_dump($e->getMessage());

      return false;
    }

    return $this->saveFile($sql, $outputDir);
  }

  /**
   * Save SQL to file.
   *
   * @param string $sql
   */
  protected function saveFile(&$sql, $outputDir = '.')
  {
    if (!$sql) {
      return false;
    }

    try {
      $handle = fopen($outputDir . '/db-backup-' . $this->dbName . '-' . date('Ymd-His', time()) . '.sql', 'w+');
      fwrite($handle, $sql);
      fclose($handle);
    } catch (Exception $e) {
      var_dump($e->getMessage());

      return false;
    }

    return true;
  }
}
