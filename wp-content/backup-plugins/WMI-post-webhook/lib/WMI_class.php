<?php
class WMI_post_inserter
{
  protected static $instance = null; // object exemplar reference
  public $root;
  // plugin specific library object: common code stuff, including options data processor
  protected $lib = null;

  // work with user multiple roles class
  protected $user_other_roles = null;

  // plugin's Settings page reference, we've got it from add_options_pages() call
  protected $setting_page_hook = null;
  // URE's key capability
  public $key_capability = 'not allowed';

  protected $main_page_hook_suffix = null;
  protected $settings_hook_suffix = null;
  // URE pages hook suffixes
  protected $ure_hook_suffixes = null;

  function __construct()
  {
    $this->root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : __DIR__;
    if (!ob_get_level()) {
      ob_start();
    }
  }

  public function __call($method, $args)
  {
    if (isset($this->$method)) {
      $func = $this->$method;
      if (function_exists("$func")) {
        return call_user_func_array($func, $args);
      } else if (is_string($func)) {
        return $func;
      }
    }
  }

  public static function session_start()
  {
    if (PHP_SESSION_NONE == session_status()) {
      ini_set('memory_limit', '256M'); //-1
      $session_dir = $this->folder('tmp', $this->root);
      chmod($session_dir, 0777);
      if (is_writable($session_dir)) {
        ini_set('session.gc_probability', 1);
        ini_set('session.save_path', $session_dir);
        ini_set('session.gc_maxlifetime', 3600);
        session_set_cookie_params(3600);
      }
      session_start();
      $now = new DateTime(null, new DateTimeZone('Asia/Jakarta'));
      $date_format = $now->format('Y-m-d H:i:s');
      $timestamp = $now->getTimestamp();
      $_SESSION['start'] = $date_format;
      $current_time = strtotime('now');
      if (isset($_SERVER['detach-sessions']) || isset($_POST['detach-sessions'])) {
        if ($current_time > strtotime('12:00am') && $current_time < strtotime('01:00am')) {
          array_map('unlink', glob("$session_dir/sess_*"));
        }
      }
    }
  }

  public static function get_instance()
  {
    if (self::$instance === null) {
      self::$instance = new WMI_post_inserter();
    }

    return self::$instance;
  }

  function folder($dirname, $root)
  {
    if (strpos($dirname, '/')) {
      $exploder = explode('/', $dirname);
      foreach ($exploder as $d) {
        $this->folder_create($root . '/' . $d);
      }
    }
  }

  /**
   * Create folder recursively
   *
   * @param string $d pathname or dirname
   * @param mixed $root root directory
   * * default $_SERVER['DOCUMENT_ROOT']
   * @param bool $noroot false will return begins with $root
   * @return string
   */
  function folder_create($d, $root = null, $noroot = null)
  {
    if (!$root) {
      $root = $_SERVER['DOCUMENT_ROOT'];
    }
    if (preg_match('/(\/admin\/assets\/data\/.*)/m', $d, $cmatch)) {
      $d = $cmatch[1];
    } else {
      $d = str_replace($root, '', $d);
    }
    $explode = explode('/', rtrim($d, '/'));
    $explode = array_filter((array) $explode);
    $ready = ('WIN' === strtoupper(substr(PHP_OS, 0, 3)) ? '' : '/');
    foreach ($explode as $x) {
      $ready = rtrim($ready, '/');
      $ready .= '/' . $x;
      $status = file_exists($root . $ready);
      if (false === $status) {
        mdir($root . $ready);
      }
    }

    if (!file_exists($d)) {
      if (file_exists($root . $d) && !$noroot) {
        $d = $root . $d;
      }
    }

    return $d;
  }

  /**
   * Check user is logged in
   *
   * @return void
   */
  public function WMI_is_login()
  {
    $_SESSION['WMI_login'] = is_user_logged_in();
    return is_user_logged_in();
  }
}
