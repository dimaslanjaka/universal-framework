<?php

namespace DB;

use JSON\json;
use MVC\Exception;
use PDO as GlobalPDO;
use PDOException;

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
  $env = \MVC\router::get_env();
  if ('development' == $env) {
    $env = '3';
  } else {
    $env = '1';
  }
  define('PDO_DEBUG', $env);
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
   * PDO instance.
   *
   * @var GlobalPDO
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
   * Check table exists.
   *
   * @return bool
   */
  public function check_table(string $table)
  {
    $check = $this->query("SHOW TABLES LIKE '$table';")->row_array();

    return !empty($check);
  }

  /**
   * Set MySQL Timezone
   * @requires superuser access
   * @param string $gmt
   * @return array
   */
  public function setTimezone(string $gmt = '+7:00')
  {
    return $this->query("SET GLOBAL time_zone = '$gmt';
    SET SESSION time_zone = '$gmt';
    SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;")->exec();
  }

  /**
   * Connect PDO.
   *
   * @param string $user
   * @param string $pass
   * @param string $db
   * @param string $host
   * @param string $charset
   *
   * @return \PDO
   */
  public function connect($user, $pass, $db, $host = 'localhost', $charset = 'utf8mb4')
  {
    $this->userdb = $user;
    $this->passdb = $pass;
    $this->namedb = $db;
    $this->hostdb = $host;
    $this->charsetdb = $charset;
    $options = [
      GlobalPDO::ATTR_ERRMODE => GlobalPDO::ERRMODE_EXCEPTION,
      GlobalPDO::ATTR_DEFAULT_FETCH_MODE => GlobalPDO::FETCH_ASSOC,
      GlobalPDO::ATTR_EMULATE_PREPARES => false,
      GlobalPDO::ATTR_CASE => GlobalPDO::CASE_NATURAL,
      GlobalPDO::ATTR_ORACLE_NULLS => GlobalPDO::NULL_EMPTY_STRING,
      GlobalPDO::ATTR_STATEMENT_CLASS => ['\DB\EPDOStatement', []],
    ];

    $pdo = null;
    try {
      $pdo = new GlobalPDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, $options);
    } catch (PDOException $e) {
      exit($e->getMessage());
      $this->SQL_Error($e);
    }
    $this->pdo = $pdo;

    return $pdo;
  }

  /**
   * Switch database.
   *
   * @todo Switch between databases
   *
   * @return $this
   */
  public function switch(string $dbname)
  {
    $this->query('USE ' . $dbname)->exec();

    return $this;
  }

  private $from;
  private $query = '';

  public function query(string $sql)
  {
    $this->query = $this->trim($sql);

    return $this;
  }

  public function prep(array $prep)
  {
    $stmt = $this->pdo->prepare($this->query);
    foreach ($prep as $key => $value) {
      $stmt->bindParam(':' . preg_replace('/^\:/s', '', $key), $value, GlobalPDO::PARAM_STR);
    }
    //return $stmt->execute();
  }

  /**
   * Get where parameter is equals.
   *
   * @return $this
   */
  public function get_where(string $tbl, array $param = [])
  {
    $this->query .= " SELECT * FROM `$tbl` WHERE ";
    foreach ($param as $key => $value) {
      $this->query .= " `$key` = '$value' ";
    }

    return $this;
  }

  /**
   * Reset Query.
   *
   * @return $this
   */
  public function resetQuery()
  {
    $this->query = '';

    return $this;
  }

  /**
   * SELECT tableName.
   *
   * @param string $tbl table_name
   * @param string $row separated with comma
   *                    * Ex: name, date
   *
   * @return $this
   */
  public function select(string $tbl, string $row = '*')
  {
    $this->from = $tbl;
    $this->query .= " SELECT $row FROM $tbl ";

    return $this;
  }

  /**
   * Search database by row and keyword.
   */
  public function search(array $data, string $separated = 'OR')
  {
    $i = 0;
    foreach ($data as $key => $value) {
      if (0 == $i) {
        $this->query .= " WHERE $key LIKE '%$value%' ";
      } else {
        $this->query .= " $separated $key LIKE '%$value%' ";
      }
      ++$i;
    }

    return $this;
  }

  public function adv_search(array $data = ['OR' => ['key' => 'keyword', 'key2' => 'keyword2'], 'AND' => ['key' => 'keyword', 'key2' => 'keyword2']])
  {
    if (isset($data['OR'], $data['or'])) {
      $or = isset($data['OR']) ? $data['OR'] : $data['or'];
      $i = 0;
      foreach ($or as $key => $value) {
        if (0 == $i) {
          $this->query .= " WHERE $key LIKE '%$value%' ";
        } else {
          $this->query .= " OR $key LIKE '%$value%' ";
        }
      }
      ++$i;
    }
  }

  public function insert($tbl, array $data = [])
  {
    $this->query .= 'INSERT INTO ';
    $dbkey = " `$tbl` ( ";
    $dbval = ' VALUES( ';
    $keys = array_keys($data);
    $values = array_values($data);
    for ($i = 0; $i < count($data); ++$i) {
      if ($i == count($data) - 1) { // if last iteration
        $dbkey .= " `{$keys[$i]}` ) ";
        $this->query .= $dbkey;
        $dbval .= " '{$values[$i]}' ) ";
        $this->query .= $dbval;
      } else {
        $dbkey .= " `{$keys[$i]}`, ";
        $dbval .= " '{$values[$i]}', ";
      }
    }

    return $this;
  }

  public function update(string $tbl, array $data, array $is_equals)
  {
    $this->query .= " UPDATE `$tbl` SET ";
    foreach ($data as $key => $value) {
      $this->query .= " `$key`='$value' ";
    }
    $this->query .= ' WHERE ';
    foreach ($is_equals as $key => $value) {
      $this->query .= " `$key` = '$value' ";
    }

    return $this;
  }

  public function sum(string $tbl, array $data, array $is_equals)
  {
    $this->query .= " UPDATE `$tbl` SET ";
    foreach ($data as $key => $value) {
      if (!is_numeric($value)) {
        throw new Exception("$value must be instance of number, instead of " . gettype($value), 1);
      }
      $this->query .= " `$key`=$key + $value ";
    }
    $this->query .= ' WHERE ';
    foreach ($is_equals as $key => $value) {
      $this->query .= " `$key` = '$value' ";
    }

    return $this;
  }

  /**
   * PDO Instance.
   *
   * @return GlobalPDO
   */
  public function pdo()
  {
    return $this->pdo;
  }

  public function insert_update($tbl, array $data, array $onduplicate)
  {
    $this->query .= ' INSERT INTO ';
    $dbkey = " `$tbl` ( ";
    $dbval = ' VALUES( ';
    $keys = array_keys($data);
    $values = array_values($data);
    for ($i = 0; $i < count($data); ++$i) {
      $V = $values[$i];
      $V = str_replace('\'', '\\\'', $V);
      if ($i == count($data) - 1) { // if last iteration
        $dbkey .= " `{$keys[$i]}` ) ";
        $this->query .= $dbkey;
        $dbval .= " '{$V}' ) ";
        $this->query .= $dbval;
      } else {
        $dbkey .= " `{$keys[$i]}`, ";
        $dbval .= " '{$V}', ";
      }
    }
    $this->query .= ' ON DUPLICATE KEY UPDATE ';
    $dup_keys = array_keys($onduplicate);
    $dup_values = array_values($onduplicate);
    for ($i = 0; $i < count($onduplicate); ++$i) {
      if ($i == count($onduplicate) - 1) { // last iteration
        $this->query .= " `{$dup_keys[$i]}` = '{$dup_values[$i]}' ";
      } else {
        $this->query .= " `{$dup_keys[$i]}` = '{$dup_values[$i]}', ";
      }
    }
    //var_dump($this->query);

    return $this;
  }

  public function replace(string $tbl, array $data)
  {
    $this->query .= ' REPLACE INTO ';
    $dbkey = " `$tbl` ( ";
    $dbval = ' VALUES( ';
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

  public function execute(array $value = [])
  {
    $result = ['query' => $this->query, 'error' => true];
    /**
     * @var statement
     */
    $stmt = $this->pdo->prepare($this->query);
    $exec = $stmt->execute($value);
    if ($exec) {
      $result['error'] = false;
    }

    return $result;
  }

  /**
   * Automated Executor.
   *
   * @return array
   */
  public function exec(array $value = [])
  {
    $exec = $this->SQL_Exec($this->trim($this->query), $value);
    $this->resetQuery();

    return $exec;
  }

  public function exec2(array $value)
  {
    $result = ['error' => true];
    /**
     * @var EPDOStatement
     */
    $stmt = $this->pdo->prepare($this->query);
    $bind = [];
    $i = 0;
    foreach ($value as $key => $value) {
      switch (gettype($value)) {
        case 'int':
          $type = GlobalPDO::PARAM_INT;
          break;
        case 'number':
          $type = GlobalPDO::PARAM_INT;
          break;
        case 'boolean':
          $type = GlobalPDO::PARAM_BOOL;
          break;
        case 'bool':
          $type = GlobalPDO::PARAM_BOOL;
          break;

        default:
          $type = GlobalPDO::PARAM_STR;
          break;
      }
      if (!isset($type)) {
        throw new Exception('Error Processing Code: var(type) not exists, and value instance of ' . gettype($value), 1);
      }
      $bind[$i][$key]['key'] = ":$key";
      $bind[$i][$key]['value'] = $value;
      $bind[$i][$key]['type'] = $type;
      $stmt->bindValue(":$key", $value, $type);
      ++$i;
    }
    try {
      $exec = $stmt->execute($value);
      if ($exec) {
        $result['error'] = false;
      }
      //$user = $stmt->fetch();
    } catch (PDOException $e) {
      $message = "{$e->getMessage()}
      <br>Code: {$stmt->errorCode()}
      <br>Info: " . serialize($stmt->errorInfo());
      $json = json::json($bind, false, false);
      if (PDO_DEBUG == 3) {
        $message .= "
        <br/>Query: {$this->query}
        <br/>Callback Query: {$stmt->queryString}
        <br/>Debug: {$stmt->_debugQuery()}
        <br/>{$stmt->debugDumpParams()}
        <br><pre>{$json}</pre>
        ";
      }
      throw new PDOException($message, (int) $e->getCode());
    }
  }

  public function trim(string $str)
  {
    return trim(preg_replace('/\s+/s', ' ', $str));
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

  /**
   * Order by row [ASC=ascending or DESC=descending].
   *
   * @param string $order
   *
   * @return $this
   */
  public function sort(array $by, $order = 'ASC')
  {
    $this->query .= ' ORDER BY ';
    for ($i = 0; $i < count($by); ++$i) {
      $this->query .= " {$by[$i]} ";
      if (!($i == count($by) - 1)) {
        $this->query .= ',';
      }
    }
    $this->query .= " $order ";

    return $this;
  }

  public function or($is_equals = [], $not_equals = [])
  {
    $this->query .= ' OR ';
    if (!empty($is_equals)) {
      $this->equals($is_equals);
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

  /**
   * If array data is equals.
   */
  public function equals(array $is_equals)
  {
    if (!empty($is_equals)) {
      $i = count($is_equals);
      foreach ($is_equals as $key => $value) {
        if ('NULL' == $value || null === $value) {
          $this->query .= " `$key` IS NULL ";
        } elseif ($value) {
          //$value = "'$value'";
          $this->query .= " `$key` = '$value' ";
        }
        if ($i > 1) { // if condition more than 1, add AND command
          $this->query .= ' AND ';
        }
        --$i;
      }
    }

    return $this;
  }

  /**
   * Get query result.
   *
   * @todo check before execution
   *
   * @return array
   *
   * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
   */
  public function getQuery(array $data_value = [])
  {
    $query = $this->query;
    if (!empty($data_value)) {
      foreach ($data_value as $key => $value) {
        $query = str_replace(":$key", $this->pdo->quote($value), $this->query);
      }
    }

    $query = str_replace("\n", ' ', $query);
    $this->query = '';

    return $query;
  }

  /**
   * Get last inserted id.
   *
   * @param GlobalPDO $pdo
   */
  public function SQL_LastID()
  {
    return $this->pdo->lastInsertId();
  }

  /**
   * PDO Error.
   *
   * @param PDOException $e
   * @param mixed        $query
   */
  public function SQL_Error($e, $query = null)
  {
    $result = ['error' => true];
    if (headers_sent()) {
      $result[] = '<pre>';
    }

    if (defined('PDO_DEBUG')) {
      if (headers_sent()) {
        $result[] = 'SQL Error: ' . $e->getMessage() . "\n\n";
      } else {
        $result['message'] = $e->getMessage();
      }

      if (PDO_DEBUG >= '2') {
        if (headers_sent()) {
          $result[] = "$query\n\n";
        } else {
          $result['query'] = $query;
        }
      }

      if (PDO_DEBUG == '3') {
        // Print details like script name and line.
        if (headers_sent()) {
          print_r($e);
        } else {
          $result['dump'] = $e;
        }
      }
    } else {
      if (headers_sent()) {
        $result[] = 'SQL Error! Please contact the administrator.';
      } else {
        $result['message'] = 'SQL Error! Please contact the administrator.';
      }
    }
    $result['title'] = __CLASS__ . '::' . __FUNCTION__;

    if (headers_sent()) {
      $result[] = '</pre>';
      echo implode("\n", $result);
    } else {
      json::json($result);
    }

    // Stop on error.
    exit;
  }

  public function SQL_Fetch($query, $values = false)
  {
    if (!$this->pdo) {
      throw new \MVC\Exception('Database not properly configured', 1);
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
    } catch (PDOException $e) {
      //var_dump('error true');
      $this->SQL_Error($e, $query);
    }
  }

  /**
   * Check before insert
   * * always equals validation.
   *
   * @return $this
   */
  public function insert_not_exists(string $tbl, array $data, array $where = null)
  {
    $keys = array_keys($data);
    $vals = array_values($data);
    $valstr = $keystr = $is_equals = '';
    for ($i = 0; $i < count($data); ++$i) {
      $value = $vals[$i];
      if (!preg_match('/^\:/s', $value)) {
        $value = $this->pdo->quote($value);
      }
      $keystr .= " `{$keys[$i]}` ";
      $valstr .= " $value ";
      $is_equals .= " `{$keys[$i]}`=$value ";
      if ($i == count($data) - 1) { //last iteration
        //$keystr .= ')';
        //$valstr .= ')';
      } else {
        $keystr .= ', ';
        $valstr .= ', ';
        $is_equals .= ' AND ';
      }
    }
    if (null !== $where) {
      $is_equals = '';
      foreach ($where as $key => $value) {
        $is_equals .= " $key = $value ";
      }
    }
    //var_dump($data);
    $this->query .= " INSERT INTO $tbl ($keystr) ";
    $this->query .= " SELECT * FROM (SELECT $valstr) AS tmp
    WHERE NOT EXISTS (
      SELECT $keystr FROM $tbl WHERE $is_equals
    );";

    return $this;
  }

  public function parms($string, $data)
  {
    $indexed = $data == array_values($data);
    foreach ($data as $k => $v) {
      if (is_string($v)) {
        $v = "'$v'";
      }
      if ($indexed) {
        $string = preg_replace('/\?/', $v, $string, 1);
      } else {
        $string = str_replace(":$k", $v, $string);
      }
    }

    return $string;
  }

  /**
   * Get result as array.
   *
   * @param bool $value
   *
   * @return array
   */
  public function row_array($value = false)
  {
    $exec = $this->SQL_MultiFetch($this->trim($this->query), $value);
    $this->query = '';

    return $exec;
  }

  /**
   * Multi fetch pdo.
   *
   * @param bool|array $values
   * @param bool       $assoc  always association array return
   *
   * @return void|array
   */
  public function SQL_MultiFetch(string $query, $values = false, $assoc = false)
  {
    if (!$this->pdo) {
      throw new \MVC\Exception('Database not properly configured', 1);
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

      if (1 == count($arr) && !$assoc) {
        $arr = $arr[0];
      }

      return $arr;
    } catch (PDOException $e) {
      $this->SQL_Error($e, $query);
    }
  }

  public function SQL_Exec($query, $values = false)
  {
    $result = ['query' => $query, 'error' => false, 'title' => 'Database Management'];
    try {
      if (!$values) {
        $status = $this->pdo->exec($query);
        //var_dump($status);
        if (!$status && 00000 != (int) $this->pdo->errorCode()) {
          $result['error'] = true;
          $result['code'] = $this->pdo->errorCode();
          $result['message'] = $this->pdo->errorInfo();
        }
      } else {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($values);
        $count = 0 == (int) $stmt->rowCount() ? true : false;
        $result['error'] = $count;
        $stmt = null;
      }
      if (preg_match('/^insert/s', strtolower($query))) {
        $result['id'] = $this->SQL_LastID($this->pdo);
      }
    } catch (PDOException $e) {
      $this->SQL_Error($e, $query);
    }

    return $result;
  }

  public function show_creation(string $table)
  {
    return $this->query("SHOW CREATE TABLE `$table`")->row_array();
  }
}
