<?php

namespace MVC;

class alert
{
  private static $init = null;
  public $result = [];
  public $toastr = '';

  /**
   * Chaining initializer
   *
   * @return alert
   */
  public static function init()
  {
    if (!self::$init) {
      self::$init = new self();
    }

    return self::$init;
  }

  public function add(string $title, string $message)
  {
    $this->result[] = ['title' => ucwords($title), 'message' => $message];

    return $this;
  }

  public function error(string $title, string $message)
  {
    $this->result[] = ['title' => ucwords($title), 'message' => $message, 'error' => true];

    return $this;
  }

  public function success(string $title, string $message)
  {
    $this->result[] = ['title' => ucwords($title), 'message' => $message, 'error' => false];

    return $this;
  }

  public function final(bool $scriptTag = false)
  {
    if (!empty($this->result)) {
      foreach ($this->result as $alert) {
        if (isset($alert['error'])) {
          if ($alert['error']) {
            $this->toastr .= "toastr.error('{$alert['title']}', '{$alert['message']}');";
          } else {
            $this->toastr .= "toastr.success('{$alert['title']}', '{$alert['message']}');";
          }
        } else if (isset($alert['message'])) {
          $this->toastr .= "toastr.info('{$alert['title']}', '{$alert['message']}');";
        }
      }
      if (!$scriptTag) {
        echo $this->toastr;
      } else {
        echo "<script>{$this->toastr}</script>";
      }
    }
  }
}
