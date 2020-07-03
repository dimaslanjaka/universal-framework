<?php

namespace Office\inventory\warehouse;

class index
{
  /**
   * PDO instance
   *
   * @var \DB\pdo
   */
  private $pdo;
  function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }
  /**
   * Get list warehouse
   *
   * @return array
   */
  function list()
  {
    if ($this->pdo) {
      $list =  $this->pdo->select('warehouses')->row_array();
      if (!\ArrayHelper\helper::isSequent($list)) {
        return [$list];
      }
      return $list;
    }
    return [];
  }
}
