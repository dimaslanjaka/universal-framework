<?php

namespace User;

class config
{
  /**
   * User\user instance.
   *
   * @var \User\user
   */
  private $user;
  /**
   * PDO instance.
   *
   * @var \DB\pdo
   */
  private $pdo;

  public function __construct(user $user)
  {
    $this->user = $user;
    $this->pdo = $user->pdo_instance();
  }
}
