<?php

namespace Office;

class user extends \User\user
{
  /**
   * PDO instance.
   *
   * @var \DB\pdo
   */
  private $pdo;
  /**
   * User meta instance.
   *
   * @var \User\meta
   */
  public $usermeta;

  public function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
    $this->pdo_instance($pdo);
    $this->usermeta = new \User\meta($pdo);
  }

  /**
   * Get office list of current logged in user.
   *
   * @requires `\User\user::is_login` check login before doing this
   *
   * @return array
   */
  public function getOffices()
  {
    return $this->usermeta->get($this->userdata('id'), 'office');
  }
}
