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
  function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }

  function set_instance(\User\user $user)
  {
    //$this = $user;
  }
}
