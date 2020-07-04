<?php

namespace Office\inventory\warehouse;

class index
{
  /**
   * PDO instance.
   *
   * @var \DB\pdo
   */
  private $pdo;

  public function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }

  /**
   * Get list warehouse.
   *
   * @return array
   */
  public function list()
  {
    if ($this->pdo) {
      $list = $this->pdo->select('warehouses')->row_array();
      if (!\ArrayHelper\helper::isSequent($list)) {
        return [$list];
      }

      return $list;
    }

    return [];
  }
}
