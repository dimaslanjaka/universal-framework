<?php

namespace DB;

use Exception;

// Report all errors
error_reporting(E_ALL);

/*
 * Define database parameters here
 */
define('DB_USER', CONFIG['database']['user']);
define('DB_PASSWORD', CONFIG['database']['pass']);
define('DB_NAME', CONFIG['database']['dbname']);
define('DB_HOST', CONFIG['database']['host']);
define('TABLES', '*');

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
   * @var \mysqli|null
   */
  public $conn;

  /**
   * Constructor initializes database.
   */
  function __construct($host, $username, $passwd, $dbName, $charset = 'utf8')
  {
    $this->host = $host;
    $this->username = $username;
    $this->passwd = $passwd;
    $this->dbName = $dbName;
    $this->charset = $charset;

    $this->initializeDatabase();
    if ($this->conn == null) {
      throw new Exception("Mysqli Connection Error (null)", 1);
    }
  }

  function initializeDatabase()
  {
    $this->conn = mysqli_connect($this->host, $this->username, $this->passwd);
    mysqli_select_db($this->conn, $this->dbName);
    // Check connection
    if ($this->conn->connect_errno) {
      echo "Failed to connect to MySQL: " . $this->conn->connect_error;
      exit();
    }
    if (!mysqli_set_charset($this->conn, $this->charset)) {
      mysqli_query($this->conn, 'SET NAMES ' . $this->charset);
    }
  }

  /**
   * Backup the whole database or just some tables
   * Use '*' for whole database or 'table1 table2 table3...'.
   *
   * @param string $tables
   */
  public function backupTables($tables = '*', $outputDir = __DIR__ . '/backup')
  {
    try {
      /*
       * Tables to export
       */
      if ('*' == $tables) {
        $tables = [];
        $result = mysqli_query($this->conn, 'SHOW TABLES');
        if ($result != null) {
          while ($row = mysqli_fetch_row($result)) {
            $tables[] = $row[0];
          }
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
