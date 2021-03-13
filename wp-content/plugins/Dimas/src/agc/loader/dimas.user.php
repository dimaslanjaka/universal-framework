<?php

class AGCUSER
{
  public $wpdb;

  public function __construct($wpdb)
  {
    $this->wpdb = $wpdb;
  }

  public function check()
  {
    if (!isset($_COOKIE['subscribed'])) {
      if (!isset($_SESSION['subscribed']) || true !== $_SESSION['subscribed']) {
        include $_SERVER['DOCUMENT_ROOT'] . '/views/AGC/login.php';
        exit;
      }
    }
  }

  public function user_email_exists($mail)
  {
    $wpdb = $this->wpdb;
    $count = $this->wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $wpdb->users WHERE `user_email` = %s", $mail));

    if (1 == $count) {
      return true;
    } else {
      return false;
    }
  }
}