<?php

namespace DB;

use PDOStatement;

class statement extends PDOStatement
{
  protected $_debugValues = null;

  protected function __construct()
  {
    // need this empty construct()!
  }

  public function execute($values = [])
  {
    $this->_debugValues = $values;
    try {
      $t = parent::execute($values);
      // maybe do some logging here?
    } catch (\PDOException $e) {
      // maybe do some logging here?
      throw $e;
    }

    return $t;
  }

  public function _debugQuery($replaced = true)
  {
    $q = $this->queryString;

    if (!$replaced) {
      return $q;
    }

    return preg_replace_callback('/:([0-9a-z_]+)/i', [$this, '_debugReplace'], $q);
  }

  protected function _debugReplace($m)
  {
    $v = $this->_debugValues[$m[1]];
    if (null === $v) {
      return 'NULL';
    }
    if (!is_numeric($v)) {
      $v = str_replace("'", "''", $v);
    }

    return "'" . $v . "'";
  }
}
