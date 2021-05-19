<?php

namespace DB;

use ArrayAccess;
use MVC\Exception;
use PDO;

/**
 * Simple PDO.
 *
 * @see https://github.com/mareimorsy/DB
 */
class DB
{
  private static $instance = null;
  private $dbh = null;
  private $table;
  private $columns;
  private $sql;
  private $bindValues;
  private $getSQL;
  private $where;
  private $orWhere;
  private $whereCount = 0;
  private $isOrWhere = false;
  private $rowCount = 0;
  private $limit;
  private $orderBy;
  private $lastIDInserted = 0;

  // Initial values for pagination array
  private $pagination = ['previousPage' => null, 'currentPage' => 1, 'nextPage' => null, 'lastPage' => null, 'totalRows' => null];

  private function __construct($config = ['host' => '', 'database' => '', 'username' => '', 'password' => ''])
  {
    try {
      $this->dbh = new PDO('mysql:host=' . $config['host'] . ';dbname=' . $config['database'] . ';charset=utf8', $config['username'], $config['password']);
      $this->dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    } catch (Exception $e) {
      exit('Error establishing a database connection.');
    }
  }

  public static function getInstance($config = ['host' => '', 'database' => '', 'username' => '', 'password' => ''])
  {
    if (!self::$instance) {
      self::$instance = new DB($config);
    }

    return self::$instance;
  }

  public function query($query, $args = [], $quick = false)
  {
    $this->resetQuery();
    $query = trim($query);
    $this->getSQL = $query;
    $this->bindValues = $args;

    if (true == $quick) {
      $stmt = $this->dbh->prepare($query);
      $stmt->execute($this->bindValues);
      $this->rowCount = $stmt->rowCount();

      return $stmt->fetchAll();
    } else {
      if (0 === strpos(strtoupper($query), 'SELECT')) {
        $stmt = $this->dbh->prepare($query);
        $stmt->execute($this->bindValues);
        $this->rowCount = $stmt->rowCount();

        $rows = $stmt->fetchAll(PDO::FETCH_CLASS, 'MareiObj');
        $collection = [];
        $collection = new MareiCollection();
        $x = 0;
        foreach ($rows as $key => $row) {
          $collection->offsetSet($x++, $row);
        }

        return $collection;
      } else {
        $this->getSQL = $query;
        $stmt = $this->dbh->prepare($query);
        $stmt->execute($this->bindValues);

        return $stmt->rowCount();
      }
    }
  }

  private function resetQuery()
  {
    $this->table = null;
    $this->columns = null;
    $this->sql = null;
    $this->bindValues = null;
    $this->limit = null;
    $this->orderBy = null;
    $this->getSQL = null;
    $this->where = null;
    $this->orWhere = null;
    $this->whereCount = 0;
    $this->isOrWhere = false;
    $this->rowCount = 0;
    $this->lastIDInserted = 0;
  }

  public function exec()
  {
    //assimble query
    $this->sql .= $this->where;
    $this->getSQL = $this->sql;
    $stmt = $this->dbh->prepare($this->sql);
    $stmt->execute($this->bindValues);

    return $stmt->rowCount();
  }

  public function delete($table_name, $id = null)
  {
    $this->resetQuery();

    $this->sql = "DELETE FROM `{$table_name}`";

    if (isset($id)) {
      // if there is an ID
      if (is_numeric($id)) {
        $this->sql .= ' WHERE `id` = ?';
        $this->bindValues[] = $id;
      // if there is an Array
      } elseif (is_array($id)) {
        $arr = $id;
        $count_arr = count($arr);
        $x = 0;

        foreach ($arr as $param) {
          if (0 == $x) {
            $this->where .= ' WHERE ';
            ++$x;
          } else {
            if ($this->isOrWhere) {
              $this->where .= ' Or ';
            } else {
              $this->where .= ' AND ';
            }

            ++$x;
          }
          $count_param = count($param);

          if (1 == $count_param) {
            $this->where .= '`id` = ?';
            $this->bindValues[] = $param[0];
          } elseif (2 == $count_param) {
            $operators = explode(',', '=,>,<,>=,>=,<>');
            $operatorFound = false;

            foreach ($operators as $operator) {
              if (false !== strpos($param[0], $operator)) {
                $operatorFound = true;
                break;
              }
            }

            if ($operatorFound) {
              $this->where .= $param[0] . ' ?';
            } else {
              $this->where .= '`' . trim($param[0]) . '` = ?';
            }

            $this->bindValues[] = $param[1];
          } elseif (3 == $count_param) {
            $this->where .= '`' . trim($param[0]) . '` ' . $param[1] . ' ?';
            $this->bindValues[] = $param[2];
          }
        }
        //end foreach
      }
      // end if there is an Array
      $this->sql .= $this->where;

      $this->getSQL = $this->sql;
      $stmt = $this->dbh->prepare($this->sql);
      $stmt->execute($this->bindValues);

      return $stmt->rowCount();
    } // end if there is an ID or Array
    // $this->getSQL = "<b>Attention:</b> This Query will update all rows in the table, luckily it didn't execute yet!, use exec() method to execute the following query :<br>". $this->sql;
    // $this->getSQL = $this->sql;
    return $this;
  }

  public function update($table_name, $fields = [], $id = null)
  {
    $this->resetQuery();
    $set = '';
    $x = 1;

    foreach ($fields as $column => $field) {
      $set .= "`$column` = ?";
      $this->bindValues[] = $field;
      if ($x < count($fields)) {
        $set .= ', ';
      }
      ++$x;
    }

    $this->sql = "UPDATE `{$table_name}` SET $set";

    if (isset($id)) {
      // if there is an ID
      if (is_numeric($id)) {
        $this->sql .= ' WHERE `id` = ?';
        $this->bindValues[] = $id;
      // if there is an Array
      } elseif (is_array($id)) {
        $arr = $id;
        $count_arr = count($arr);
        $x = 0;

        foreach ($arr as $param) {
          if (0 == $x) {
            $this->where .= ' WHERE ';
            ++$x;
          } else {
            if ($this->isOrWhere) {
              $this->where .= ' Or ';
            } else {
              $this->where .= ' AND ';
            }

            ++$x;
          }
          $count_param = count($param);

          if (1 == $count_param) {
            $this->where .= '`id` = ?';
            $this->bindValues[] = $param[0];
          } elseif (2 == $count_param) {
            $operators = explode(',', '=,>,<,>=,>=,<>');
            $operatorFound = false;

            foreach ($operators as $operator) {
              if (false !== strpos($param[0], $operator)) {
                $operatorFound = true;
                break;
              }
            }

            if ($operatorFound) {
              $this->where .= $param[0] . ' ?';
            } else {
              $this->where .= '`' . trim($param[0]) . '` = ?';
            }

            $this->bindValues[] = $param[1];
          } elseif (3 == $count_param) {
            $this->where .= '`' . trim($param[0]) . '` ' . $param[1] . ' ?';
            $this->bindValues[] = $param[2];
          }
        }
        //end foreach
      }
      // end if there is an Array
      $this->sql .= $this->where;

      $this->getSQL = $this->sql;
      $stmt = $this->dbh->prepare($this->sql);
      $stmt->execute($this->bindValues);

      return $stmt->rowCount();
    } // end if there is an ID or Array
    // $this->getSQL = "<b>Attention:</b> This Query will update all rows in the table, luckily it didn't execute yet!, use exec() method to execute the following query :<br>". $this->sql;
    // $this->getSQL = $this->sql;
    return $this;
  }

  public function insert($table_name, $fields = [])
  {
    $this->resetQuery();

    $keys = implode('`, `', array_keys($fields));
    $values = '';
    $x = 1;
    foreach ($fields as $field => $value) {
      $values .= '?';
      $this->bindValues[] = $value;
      if ($x < count($fields)) {
        $values .= ', ';
      }
      ++$x;
    }

    $this->sql = "INSERT INTO `{$table_name}` (`{$keys}`) VALUES ({$values})";
    $this->getSQL = $this->sql;
    $stmt = $this->dbh->prepare($this->sql);
    $stmt->execute($this->bindValues);
    $this->lastIDInserted = $this->dbh->lastInsertId();

    return $this->lastIDInserted;
  }

  //End insert function

  public function lastId()
  {
    return $this->lastIDInserted;
  }

  public function table($table_name)
  {
    $this->resetQuery();
    $this->table = $table_name;

    return $this;
  }

  public function select($columns)
  {
    $columns = explode(',', $columns);
    foreach ($columns as $key => $column) {
      $columns[$key] = trim($column);
    }

    $columns = implode('`, `', $columns);

    $this->columns = "`{$columns}`";

    return $this;
  }

  public function where()
  {
    if (0 == $this->whereCount) {
      $this->where .= ' WHERE ';
      ++$this->whereCount;
    } else {
      $this->where .= ' AND ';
    }

    $this->isOrWhere = false;

    // call_user_method_array('where_orWhere', $this, func_get_args());
    //Call to undefined function call_user_method_array()
    //echo print_r(func_num_args());
    $num_args = func_num_args();
    $args = func_get_args();
    if (1 == $num_args) {
      if (is_numeric($args[0])) {
        $this->where .= '`id` = ?';
        $this->bindValues[] = $args[0];
      } elseif (is_array($args[0])) {
        $arr = $args[0];
        $count_arr = count($arr);
        $x = 0;

        foreach ($arr as $param) {
          if (0 == $x) {
            ++$x;
          } else {
            if ($this->isOrWhere) {
              $this->where .= ' Or ';
            } else {
              $this->where .= ' AND ';
            }

            ++$x;
          }
          $count_param = count($param);
          if (1 == $count_param) {
            $this->where .= '`id` = ?';
            $this->bindValues[] = $param[0];
          } elseif (2 == $count_param) {
            $operators = explode(',', '=,>,<,>=,>=,<>');
            $operatorFound = false;

            foreach ($operators as $operator) {
              if (false !== strpos($param[0], $operator)) {
                $operatorFound = true;
                break;
              }
            }

            if ($operatorFound) {
              $this->where .= $param[0] . ' ?';
            } else {
              $this->where .= '`' . trim($param[0]) . '` = ?';
            }

            $this->bindValues[] = $param[1];
          } elseif (3 == $count_param) {
            $this->where .= '`' . trim($param[0]) . '` ' . $param[1] . ' ?';
            $this->bindValues[] = $param[2];
          }
        }
      }
      // end of is array
    } elseif (2 == $num_args) {
      $operators = explode(',', '=,>,<,>=,>=,<>');
      $operatorFound = false;
      foreach ($operators as $operator) {
        if (false !== strpos($args[0], $operator)) {
          $operatorFound = true;
          break;
        }
      }

      if ($operatorFound) {
        $this->where .= $args[0] . ' ?';
      } else {
        $this->where .= '`' . trim($args[0]) . '` = ?';
      }

      $this->bindValues[] = $args[1];
    } elseif (3 == $num_args) {
      $this->where .= '`' . trim($args[0]) . '` ' . $args[1] . ' ?';
      $this->bindValues[] = $args[2];
    }

    return $this;
  }

  public function orWhere()
  {
    if (0 == $this->whereCount) {
      $this->where .= ' WHERE ';
      ++$this->whereCount;
    } else {
      $this->where .= ' OR ';
    }
    $this->isOrWhere = true;
    // call_user_method_array ( 'where_orWhere' , $this ,  func_get_args() );

    $num_args = func_num_args();
    $args = func_get_args();
    if (1 == $num_args) {
      if (is_numeric($args[0])) {
        $this->where .= '`id` = ?';
        $this->bindValues[] = $args[0];
      } elseif (is_array($args[0])) {
        $arr = $args[0];
        $count_arr = count($arr);
        $x = 0;

        foreach ($arr as $param) {
          if (0 == $x) {
            ++$x;
          } else {
            if ($this->isOrWhere) {
              $this->where .= ' Or ';
            } else {
              $this->where .= ' AND ';
            }

            ++$x;
          }
          $count_param = count($param);
          if (1 == $count_param) {
            $this->where .= '`id` = ?';
            $this->bindValues[] = $param[0];
          } elseif (2 == $count_param) {
            $operators = explode(',', '=,>,<,>=,>=,<>');
            $operatorFound = false;

            foreach ($operators as $operator) {
              if (false !== strpos($param[0], $operator)) {
                $operatorFound = true;
                break;
              }
            }

            if ($operatorFound) {
              $this->where .= $param[0] . ' ?';
            } else {
              $this->where .= '`' . trim($param[0]) . '` = ?';
            }

            $this->bindValues[] = $param[1];
          } elseif (3 == $count_param) {
            $this->where .= '`' . trim($param[0]) . '` ' . $param[1] . ' ?';
            $this->bindValues[] = $param[2];
          }
        }
      }
      // end of is array
    } elseif (2 == $num_args) {
      $operators = explode(',', '=,>,<,>=,>=,<>');
      $operatorFound = false;
      foreach ($operators as $operator) {
        if (false !== strpos($args[0], $operator)) {
          $operatorFound = true;
          break;
        }
      }

      if ($operatorFound) {
        $this->where .= $args[0] . ' ?';
      } else {
        $this->where .= '`' . trim($args[0]) . '` = ?';
      }

      $this->bindValues[] = $args[1];
    } elseif (3 == $num_args) {
      $this->where .= '`' . trim($args[0]) . '` ' . $args[1] . ' ?';
      $this->bindValues[] = $args[2];
    }

    return $this;
  }

  // private function where_orWhere()
  // {

  // }

  public function get()
  {
    $this->assimbleQuery();
    $this->getSQL = $this->sql;

    $stmt = $this->dbh->prepare($this->sql);
    $stmt->execute($this->bindValues);
    $this->rowCount = $stmt->rowCount();

    $rows = $stmt->fetchAll(PDO::FETCH_CLASS, 'MareiObj');
    $collection = [];
    $collection = new MareiCollection();
    $x = 0;
    foreach ($rows as $key => $row) {
      $collection->offsetSet($x++, $row);
    }

    return $collection;
  }

  // Quick get

  private function assimbleQuery()
  {
    if (null !== $this->columns) {
      $select = $this->columns;
    } else {
      $select = '*';
    }

    $this->sql = "SELECT $select FROM `$this->table`";

    if (null !== $this->where) {
      $this->sql .= $this->where;
    }

    if (null !== $this->orderBy) {
      $this->sql .= $this->orderBy;
    }

    if (null !== $this->limit) {
      $this->sql .= $this->limit;
    }
  }

  public function QGet()
  {
    $this->assimbleQuery();
    $this->getSQL = $this->sql;

    $stmt = $this->dbh->prepare($this->sql);
    $stmt->execute($this->bindValues);
    $this->rowCount = $stmt->rowCount();

    return $stmt->fetchAll();
  }

  public function limit($limit, $offset = null)
  {
    if (null == $offset) {
      $this->limit = " LIMIT {$limit}";
    } else {
      $this->limit = " LIMIT {$limit} OFFSET {$offset}";
    }

    return $this;
  }

  /**
   * Sort result in a particular order according to a column name.
   *
   * @param string $field_name the column name which you want to order the result according to
   * @param string $order      it determins in which order you wanna view your results whether 'ASC' or 'DESC'
   *
   * @return object it returns DB object
   */
  public function orderBy($field_name, $order = 'ASC')
  {
    $field_name = trim($field_name);

    $order = trim(strtoupper($order));

    // validate it's not empty and have a proper valuse
    if (null !== $field_name && ('ASC' == $order || 'DESC' == $order)) {
      if (null == $this->orderBy) {
        $this->orderBy = " ORDER BY $field_name $order";
      } else {
        $this->orderBy .= ", $field_name $order";
      }
    }

    return $this;
  }

  public function paginate($page, $limit)
  {
    // Start assimble Query
    $countSQL = "SELECT COUNT(*) FROM `$this->table`";
    if (null !== $this->where) {
      $countSQL .= $this->where;
    }
    // Start assimble Query

    $stmt = $this->dbh->prepare($countSQL);
    $stmt->execute($this->bindValues);
    $totalRows = $stmt->fetch(PDO::FETCH_NUM)[0];
    // echo $totalRows;

    $offset = ($page - 1) * $limit;
    // Refresh Pagination Array
    $this->pagination['currentPage'] = $page;
    $this->pagination['lastPage'] = ceil($totalRows / $limit);
    $this->pagination['nextPage'] = $page + 1;
    $this->pagination['previousPage'] = $page - 1;
    $this->pagination['totalRows'] = $totalRows;
    // if last page = current page
    if ($this->pagination['lastPage'] == $page) {
      $this->pagination['nextPage'] = null;
    }
    if (1 == $page) {
      $this->pagination['previousPage'] = null;
    }
    if ($page > $this->pagination['lastPage']) {
      return [];
    }

    $this->assimbleQuery();

    $sql = $this->sql . " LIMIT {$limit} OFFSET {$offset}";
    $this->getSQL = $sql;

    $stmt = $this->dbh->prepare($sql);
    $stmt->execute($this->bindValues);
    $this->rowCount = $stmt->rowCount();

    $rows = $stmt->fetchAll(PDO::FETCH_CLASS, 'MareiObj');
    $collection = [];
    $collection = new MareiCollection();
    $x = 0;
    foreach ($rows as $key => $row) {
      $collection->offsetSet($x++, $row);
    }

    return $collection;
  }

  public function count()
  {
    // Start assimble Query
    $countSQL = "SELECT COUNT(*) FROM `$this->table`";

    if (null !== $this->where) {
      $countSQL .= $this->where;
    }

    if (null !== $this->limit) {
      $countSQL .= $this->limit;
    }
    // End assimble Query

    $stmt = $this->dbh->prepare($countSQL);
    $stmt->execute($this->bindValues);

    $this->getSQL = $countSQL;

    return $stmt->fetch(PDO::FETCH_NUM)[0];
  }

  public function QPaginate($page, $limit)
  {
    // Start assimble Query
    $countSQL = "SELECT COUNT(*) FROM `$this->table`";
    if (null !== $this->where) {
      $countSQL .= $this->where;
    }
    // Start assimble Query

    $stmt = $this->dbh->prepare($countSQL);
    $stmt->execute($this->bindValues);
    $totalRows = $stmt->fetch(PDO::FETCH_NUM)[0];
    // echo $totalRows;

    $offset = ($page - 1) * $limit;
    // Refresh Pagination Array
    $this->pagination['currentPage'] = $page;
    $this->pagination['lastPage'] = ceil($totalRows / $limit);
    $this->pagination['nextPage'] = $page + 1;
    $this->pagination['previousPage'] = $page - 1;
    $this->pagination['totalRows'] = $totalRows;
    // if last page = current page
    if ($this->pagination['lastPage'] == $page) {
      $this->pagination['nextPage'] = null;
    }
    if (1 == $page) {
      $this->pagination['previousPage'] = null;
    }
    if ($page > $this->pagination['lastPage']) {
      return [];
    }

    $this->assimbleQuery();

    $sql = $this->sql . " LIMIT {$limit} OFFSET {$offset}";
    $this->getSQL = $sql;

    $stmt = $this->dbh->prepare($sql);
    $stmt->execute($this->bindValues);
    $this->rowCount = $stmt->rowCount();

    return $stmt->fetchAll();
  }

  public function PaginationInfo()
  {
    return $this->pagination;
  }

  public function getSQL()
  {
    return $this->getSQL;
  }

  public function getCount()
  {
    return $this->rowCount;
  }

  public function rowCount()
  {
    return $this->rowCount;
  }
}

// End Marei DB Class

//Start Marei Object Class
class MareiObj
{
  public function toJSON()
  {
    return json_encode($this, JSON_NUMERIC_CHECK);
  }

  public function toArray()
  {
    return (array) $this;
  }

  public function __toString()
  {
    header('Content-Type: application/json;charset=utf-8');

    return json_encode($this, JSON_NUMERIC_CHECK);
  }
}

// End Marei Object Class

//Start Marei collection class
class MareiCollection implements ArrayAccess
{
  public function offsetSet($offset, $value)
  {
    $this->$offset = $value;
  }

  public function list($field)
  {
    $list = [];
    foreach ($this as $item) {
      $list[] = $item->{$field};
    }

    return $list;
  }

  public function first($offset = 0)
  {
    return isset($this->$offset) ? $this->$offset : null;
  }

  public function last($offset = null)
  {
    $offset = count($this->toArray()) - 1;

    return isset($this->$offset) ? $this->$offset : null;
  }

  public function toArray()
  {
    // return (array) get_object_vars($this);
    $array = [];
    foreach ($this as $mareiObj) {
      $array[] = (array) $mareiObj;
    }

    return $array;
  }

  public function offsetExists($offset)
  {
    return isset($this->$offset);
  }

  public function offsetUnset($offset)
  {
    unset($this->$offset);
  }

  public function offsetGet($offset)
  {
    return isset($this->$offset) ? $this->$offset : null;
  }

  public function item($key)
  {
    return isset($this->$key) ? $this->$key : null;
  }

  public function __toString()
  {
    header('Content-Type: application/json;charset=utf-8');
    // return json_encode(get_object_vars($this));
    return $this->toJSON();
  }

  public function toJSON()
  {
    return json_encode($this->toArray(), JSON_NUMERIC_CHECK);
  }
}
// End Marei Collection Class
