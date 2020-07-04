<?php

namespace Office;

class user extends \User\user
{
  /**
   * PDO instance
   *
   * @var \DB\pdo
   */
  private $pdo;
  /**
   * User meta instance
   *
   * @var \User\meta
   */
  public $usermeta;
  function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
    $this->pdo_instance($pdo);
    $this->usermeta = new \User\meta($pdo);
  }
}
