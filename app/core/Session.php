<?php

class Session
{
  public function __construct()
  {
    if (!isset($_SESSION['user'])) {
      header('Location:' . BASEURL . 'auth');
      die;
    }
  }
}
