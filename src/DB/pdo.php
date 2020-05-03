<?php

namespace DB;

/*
 function SQL_Connect    ($user, $pass, $db, $host = "localhost", $charset = "utf8mb4");
 function SQL_Exec       ($pdo, $query, $values = false);
 function SQL_Fetch      ($pdo, $query, $values = false);
 function SQL_MultiFetch ($pdo, $query, $values = false);
 function SQL_LastID     ($pdo);
 function SQL_Error      ($e, $query);

 ------------------------------------------------------------

 Define PDO_DEBUG for detailed error messages.

 PDO_DEBUG values:

  1: Print the error message.
  2: Print also the SQL Statement.
  3: Print SQL Statement and traceback with detailed information where the error occurs.

 Example: define ("PDO_DEBUG", "2");

*/

if (!defined('PDO_DEBUG')) {
  define('PDO_DEBUG', 1);
}
/**
 * Database Management.
 *
 * @author DimasLanjaka <dimaslanjaka@gmail.com>
 */
class pdo
{
  protected $userdb;
  protected $passdb;
  protected $namedb;
  protected $hostdb;
  protected $charsetdb;
  /**
   * PDO instance
   *
   * @var \PDO
   */
  protected $pdo;

  public function __construct($user = null, $pass = null, $db = null, $host = 'localhost', $charset = 'utf8mb4')
  {
    if (!empty($user) && !empty($db)) {
      $this->connect($user, $pass, $db, $host, $charset);
    } else {
      exit('Database wrong ' . json_encode(func_get_args()));
    }
  }

  /**
   * Connect PDO.
   *
   * @param string $user
   * @param string $pass
   * @param string $db
   * @param string $host
   * @param string $charset
   */
  public function connect($user, $pass, $db, $host = 'localhost', $charset = 'utf8mb4')
  {
    $this->userdb = $user;
    $this->passdb = $pass;
    $this->namedb = $db;
    $this->hostdb = $host;
    $this->charsetdb = $charset;
    $options = [
      \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
      \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
      \PDO::ATTR_EMULATE_PREPARES => false,
      \PDO::ATTR_CASE => \PDO::CASE_NATURAL,
      \PDO::ATTR_ORACLE_NULLS => \PDO::NULL_EMPTY_STRING,
    ];
    $pdo = null;
    try {
      $pdo = new \PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, $options);
    } catch (\PDOException $e) {
      exit($e->getMessage());
      $this->SQL_Error($e);
    }
    $this->pdo = $pdo;

    return $pdo;
  }

  private $from;
  private $query = '';

  public function select($tbl, $row = '*')
  {
    $this->from = $tbl;
    $this->query .= " SELECT $row FROM $tbl ";

    return $this;
  }

  public function insert($tbl, $data = [])
  {
  }

  public function replace(string $tbl, array $data)
  {
    $this->query .= " REPLACE INTO ";
    $dbkey =  " $tbl( ";
    $dbval = " VALUES( ";
    $keys = array_keys($data);
    $values = array_values($data);
    for ($i = 0; $i < count($data); ++$i) {
      if ($i == count($data) - 1) { // if last iteration
        $dbkey .= " `{$keys[$i]}` ) ";
        $this->query .= $dbkey;
        $dbval .= " `{$values[$i]}` ) ";
        $this->query .= $dbval;
      } else {
        $dbkey .= " `{$keys[$i]}`, ";
        $dbval .= " `{$values[$i]}`, ";
      }
    }

    return $this;
  }

  function exec($value = false)
  {
    return $this->SQL_Exec($this->query, $value);
  }

  public function where($is_equals = [], $not_equals = [], $param = null)
  {
    $this->query .= ' WHERE ';
    if (!empty($is_equals)) {
      $this->equals($is_equals);
    }
    if ($param && empty($param)) {
      $this->query .= " $param ";
    }

    return $this;
  }

  public function and($is_equals = [], $not_equals = [])
  {
    $this->query .= ' AND ';
    if (!empty($is_equals)) {
      $this->equals($is_equals);
    }

    return $this;
  }

  public function equals(array $is_equals)
  {
    if (!empty($is_equals)) {
      foreach ($is_equals as $key => $value) {
        if ('NULL' == $value || null === $value) {
          $value = 'NULL';
        } elseif ($value) {
          $value = "'$value'";
        }
        $this->query .= " `$key` = $value ";
      }
    }
  }

  public function getQuery()
  {
    return $this->query;
  }

  /**
   * Get last inserted id.
   *
   * @param \PDO $pdo
   */
  public function SQL_LastID()
  {
    return $this->pdo->lastInsertId();
  }

  /**
   * PDO Error.
   *
   * @param \PDOException $e
   * @param mixed         $query
   */
  public function SQL_Error($e, $query = null)
  {
    echo '<pre>';

    if (defined('PDO_DEBUG')) {
      echo 'SQL Error: ' . $e->getMessage() . "\n\n";

      if (PDO_DEBUG >= '2') {
        echo "$query\n\n";
      }

      if (PDO_DEBUG == '3') {
        // Print details like script name and line.
        print_r($e);
      }
    } else {
      echo 'SQL Error! Please contact the administrator.';
    }

    echo '</pre>';

    // Stop on error.
    exit;
  }

  public function SQL_Fetch($query, $values = false)
  {
    if (!$this->pdo) {
      throw new \Exception('Database not properly configured', 1);
    }
    try {
      if (!$values) {
        return $this->pdo->query($query)->fetch();
      } else {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($values);
        $arr = $stmt->fetch();
        $this->query = $this->parms($query, $values);
        //var_dump($this->query);
        $stmt = null;

        return $arr;
      }
    } catch (\PDOException $e) {
      //var_dump('error true');
      $this->SQL_Error($e, $query);
    }
  }

  function parms($string, $data)
  {
    $indexed = $data == array_values($data);
    foreach ($data as $k => $v) {
      if (is_string($v)) $v = "'$v'";
      if ($indexed) $string = preg_replace('/\?/', $v, $string, 1);
      else $string = str_replace(":$k", $v, $string);
    }
    return $string;
  }

  public function row_array($value = false)
  {
    return $this->SQL_MultiFetch($this->query, $value);
  }

  public function SQL_MultiFetch($query, $values = false)
  {
    if (!$this->pdo) {
      throw new \Exception('Database not properly configured', 1);
    }
    try {
      $stmt = $this->pdo->prepare($query);
      if (!$values) {
        $stmt->execute();
      } else {
        $stmt->execute($values);
      }
      $arr = $stmt->fetchAll();
      $stmt = null;

      return $arr;
    } catch (\PDOException $e) {
      $this->SQL_Error($e, $query);
    }
  }

  public function SQL_Exec($query, $values = false)
  {
    $result = [];
    try {
      if (!$values) {
        $this->pdo->exec($query);
      } else {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($values);
        $stmt = null;
      }
      if (preg_match('/^insert/s', strtolower($query))) {
        $result['id'] = $this->SQL_LastID($this->pdo);
      }
    } catch (\PDOException $e) {
      $this->SQL_Error($e, $query);
    }

    return $result;
  }
}
