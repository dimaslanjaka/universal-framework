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
   * Output Directory
   *
   * @var string
   */
  public $outputDir = __DIR__ . '/backup';

  /**
   * Result
   *
   * @var array
   */
  public $result = [];

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
      throw new Exception("Failed to connect to MySQL: " . $this->conn->connect_error, 1);
    }
    if (!mysqli_set_charset($this->conn, $this->charset)) {
      mysqli_query($this->conn, 'SET NAMES ' . $this->charset);
    }
  }

  /**
   * Clean All Backuped Database SQL
   *
   * @return void
   */
  function clean()
  {
    $fullPath = $this->outputDir;
    array_map('unlink', glob("$fullPath*.sql"));
  }

  /**
   * Backup the whole database or just some tables
   * Use '*' for whole database or 'table1 table2 table3...'.
   *
   * @param string $tables
   */
  public function backupTables($tables = '*')
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

      $sql = "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\r\nSET time_zone = \"+00:00\";\r\n\r\n\r\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\r\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\r\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\r\n/*!40101 SET NAMES utf8 */;\r\n--\r\n-- Database: `" . implode(", ", $tables) . "`\r\n--\r\n\r\n\r\n";
      $sql .= 'CREATE DATABASE IF NOT EXISTS ' . $this->dbName . ";\n\n";
      $sql .= 'USE ' . $this->dbName . ";\n\n";

      /*
       * Iterate tables
       */
      foreach ($tables as $table) {
        //echo 'Backing up ' . $table . ' table...';

        $result = mysqli_query($this->conn, 'SELECT * FROM ' . $table);
        $numFields = mysqli_num_fields($result);

        $sql_tbl = 'DROP TABLE IF EXISTS ' . $table . ';';
        $row2 = mysqli_fetch_row(mysqli_query($this->conn, 'SHOW CREATE TABLE ' . $table));
        $sql_tbl .= "\n\n" . $row2[1] . ";\n\n";

        for ($i = 0; $i < $numFields; ++$i) {
          while ($row = mysqli_fetch_row($result)) {
            $sql_tbl .= 'INSERT INTO ' . $table . ' VALUES(';
            for ($j = 0; $j < $numFields; ++$j) {
              $row[$j] = addslashes($row[$j]);
              $row[$j] = preg_replace("[^\r]\n", '\\n', $row[$j]);
              if (isset($row[$j])) {
                $sql_tbl .= '"' . $row[$j] . '"';
              } else {
                $sql_tbl .= '""';
              }

              if ($j < ($numFields - 1)) {
                $sql_tbl .= ',';
              }
            }

            $sql_tbl .= ");\n";
          }
        }

        $sql_tbl .= "\n\n\n";
        file_put_contents($this->outputDir . "/$table.sql", $sql_tbl);
        $sql .= $sql_tbl;
        if (is_admin()) {
          $this->result[$table]['sql'] = $sql_tbl;
        }

        //echo ' OK' . '<br />';
        $this->result[$table]['status'] = "OK";
      }
    } catch (Exception $e) {
      var_dump($e->getMessage());

      return false;
    }

    $this->saveFile($sql, $this->outputDir);
    return $this->result;
  }

  function download($content, $backup_name)
  {
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary");
    header('Content-Length: ' . (function_exists('mb_strlen') ? mb_strlen($content, '8bit') : strlen($content)));
    header("Content-disposition: attachment; filename=\"" . $backup_name . "\"");
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
      $handle = fopen($outputDir . '/' . $this->dbName . '-' . date('Ymd-His', time()) . '.sql', 'w+');
      fwrite($handle, $sql);
      fclose($handle);
    } catch (Exception $e) {
      var_dump($e->getMessage());

      return false;
    }

    return true;
  }
}
