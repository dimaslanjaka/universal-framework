<?php

namespace Session;

use DateTime;
use Filemanager\file;

if (!defined('ROOT')) {
  define('ROOT', __DIR__);
}

class session
{
  private $path_defined = null;

  public function __construct(int $timeout = 3600, string $session_folder = null)
  {
    if (!$this->is_session_started()) {
      if (null !== $session_folder) {
        $this->set_session_path($timeout, $session_folder);
      }
      $this->start_timeout($timeout);
    }
  }

  public function is_session_started()
  {
    return PHP_SESSION_ACTIVE == session_status();
  }

  public function set_session_path(int $timeout, string $folder = null)
  {
    if (!$this->is_session_started()) {
      if (null !== $folder && !empty($folder) && $real_folder = realpath($folder)) {
        $folder = $real_folder;
      }
      if (empty($folder) || null === $folder) {
        $folder = file::folder(__DIR__ . '/sessions');
      }
      // Set session directory save path
      ini_set('session.save_path', $folder);

      // Change the save path. Sessions stored in teh same path
      // all share the same lifetime; the lowest lifetime will be
      // used for all. Therefore, for this to work, the session
      // must be stored in a directory where only sessions sharing
      // it's lifetime are. Best to just dynamically create on.
      $seperator = strstr(strtoupper(substr(PHP_OS, 0, 3)), 'WIN') ? '\\' : '/';
      $dir = isset($_SERVER['HTTP_USER_AGENT']) ? md5($_SERVER['HTTP_USER_AGENT']) : \MVC\helper::getRequestIP();
      if (!$dir) {
        $dir = 'null';
      }
      $path = ini_get('session.save_path') . $seperator . $timeout . $dir;
      $path = file::folder($path);
      if (!is_dir(dirname($path))) {
        if (!mkdir(dirname($path), 0777, true)) {
          trigger_error("Failed to create session save path directory '$path'. Check permissions.", E_USER_ERROR);
        }
      }
      if (!file_exists($path)) {
        if (!mkdir($path, 0777, true)) {
          trigger_error("Failed to create session save path directory '$path'. Check permissions.", E_USER_ERROR);
        }
      }
      ini_set('session.save_path', $path);
      $this->path_defined = $path;
    }
  }

  /***
   * Starts a session with a specific timeout and a specific GC probability.
   * @param int $timeout The number of seconds until it should time out.
   * @param int $probability The probablity, in int percentage, that the garbage
   *        collection routine will be triggered right now.
   * @param strint $cookie_domain The domain path for the cookie.
   */
  public function start_timeout($timeout = 5, $probability = 100, $cookie_domain = '/')
  {
    if ($this->is_session_started()) {
      return;
    }
    // Set the max lifetime
    ini_set('session.gc_maxlifetime', $timeout);

    // Set the session cookie to timeout
    ini_set('session.cookie_lifetime', $timeout);

    if (!$this->path_defined) {
      $this->set_session_path($timeout, null);
    }

    // Set the chance to trigger the garbage collection.
    ini_set('session.gc_probability', $probability);
    ini_set('session.gc_divisor', 100); // Should always be 100

    // save cookie session into clientside
    //ini_set('session.use_only_cookies', true);

    // set referer session for only from this webserver/domain
    //ini_set('session.referer_check', $_SERVER['HTTP_HOST']);

    /* set cache limiter
    public:
      Expires: pageload + 3 hours
      Cache-Control: public, max-age=10800

    private:
      Expires: Thu, 19 Nov 1981 08:52:00 GMT
      Cache-Control: private, max-age=10800, pre-check=10800

    nocache:
      Expires: Thu, 19 Nov 1981 08:52:00 GMT
      Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
      Pragma: no-cache

    private_no_expire:
      Cache-Control: private, max-age=10800, pre-check=10800
     */
    //session_cache_limiter('nocache');

    // set alogarithm session
    //ini_set('session.hash_function', 'sha256');

    // Secure session_set_cookie_params
    //session_set_cookie_params(0, $cookie_domain, $_SERVER['HTTP_HOST'], true, true);

    // set current session id
    //session_id(md5(\MVC\helper::getRequestIP()));

    // Start the session!
    session_start();

    // Renew the time left until this session times out.
    // If you skip this, the session will time out based
    // on the time when it was created, rather than when
    // it was last used.
    if (isset($_COOKIE[session_name()]) && !headers_sent()) {
      setcookie(session_name(), $_COOKIE[session_name()], time() + $timeout, $cookie_domain);
    }
    $this->protect_session($timeout);
  }

  public function dump()
  {
    exit(\JSON\json::json(
      [
        'sessions' => [
          'active' => PHP_SESSION_NONE == session_status(),
          'id' => session_id(),
          'folder' => \MVC\helper::fixSlash(ini_get('session.save_path')),
          'session.gc_maxlifetime' => ini_get('session.gc_maxlifetime'),
          'session.cookie_lifetime' => ini_get('session.cookie_lifetime'),
          'session.gc_probability' => ini_get('session.gc_probability'),
          'session.gc_divisor' => ini_get('session.gc_divisor'),
          'session.hash_function' => ini_get('session.hash_function'),
        ],
      ]
    ));
  }

  public static function has($key, bool $empty = true)
  {
    $return = isset($_SESSION[$key]);
    if ($return && !$empty) {
      $return = $return && !empty($return);
    }

    return $return;
  }

  public static function get($key)
  {
    if (isset($_SESSION[$key])) {
      return $_SESSION[$key];
    }
  }

  public static function gets(array $keys)
  {
    $result = [];
    foreach ($keys as $key) {
      if (isset($_SESSION[$key])) {
        $result[] = $_SESSION[$key];
      }
    }

    return $result;
  }

  public static function all()
  {
    return $_SESSION;
  }

  private static $_instance = null;

  public static function getInstance()
  {
    if (null === self::$_instance) {
      self::$_instance = new self();
    }

    return self::$_instance;
  }

  /**
   * Unset Session.
   *
   * @param array|string|Number $name
   */
  public static function unses($name)
  {
    if (is_array($name)) {
      foreach ($name as $n) {
        if (isset($_SESSION[$n])) {
          unset($_SESSION[$n]);
        }
      }
    } elseif (is_string($name)) {
      if (isset($_SESSION[$name])) {
        unset($_SESSION[$name]);
      }
    }
  }

  /*public function start($timeout = 3600, $probability = 1, $cookie_domain = '/')
  {
  if (!$this->is_session_started()) {
  ini_set('memory_limit', '256M'); //-1
  $session_dir = file::folder(__DIR__ . '/sessions/' . $timeout);
  chmod($session_dir, 0777);
  if (is_writable($session_dir)) {
  ini_set('session.gc_probability', $probability);
  ini_set('session.save_path', $session_dir);
  ini_set('session.gc_maxlifetime', $timeout);
  session_set_cookie_params($timeout);
  }
  session_start();
  $now = new \DateTime(null, new \DateTimeZone('Asia/Jakarta'));
  $date_format = $now->format('Y-m-d H:i:s');
  $timestamp = $now->getTimestamp();
  $_SESSION['session_start'] = $date_format;
  $current_time = strtotime('now');
  if (isset($_REQUEST['detach-sessions'])) {
  if ($current_time > strtotime('12:00am') && $current_time < strtotime('01:00am')) {
  array_map('unlink', glob("$session_dir/sess_*"));
  }
  }
  if (isset($_COOKIE[session_name()]) && !headers_sent()) {
  setcookie(session_name(), $_COOKIE[session_name()], time() + $timeout, $cookie_domain);
  }
  }
  $this->protect_session();

  return $this;
  }*/

  public function protect_session(int $timeout)
  {
    //creating htaccess for deny direct access
    $path = ini_get('session.save_path');
    if (!file_exists($path . '/.htaccess')) {
      file::file($path . '/.htaccess', 'deny from all');
    }
    if (!isset($_SESSION['session_started'])) {
      $_SESSION['session_started'] = $this->now();
      $_SESSION['session_timeout'] = ini_get('session.gc_maxlifetime');
      $_SESSION['cookie_timeout'] = ini_get('session.cookie_lifetime');
    } elseif (isset($_SESSION['session_started'])) {
      /**
       * @var DateTime
       */
      $started = $_SESSION['session_started'];
      $ago = $started->getTimestamp() + $timeout;
      $_SESSION['session_expires_in'] = date('D M j G:i:s O Y', $ago);
      if ($ago < $this->now()->getTimestamp() || isset($_SERVER['HTTP_LOGOUT'])) {
        // Session ID must be regenerated when
        //  - User logged in
        //  - User logged out
        //  - Certain period has passed
        //$this->regenerate($timeout);
        //exit(var_dump('expired'));
        session_regenerate_id(false);
      }
    }
    if (isset($_SESSION['login'])) {
      if (isset($_REQUEST['dump-session']) && isset($_SESSION['login']['role'])) {
        if (preg_match('/admin/s', $_SESSION['login']['role'])) {
          $this->dump();
        }
      }
    }
  }

  public function now()
  {
    $now = new \DateTime(null, new \DateTimeZone('Asia/Jakarta'));

    return $now;
  }

  public function is_sess($session_name, $not_found = null)
  {
    if (isset($_SESSION[$session_name])) {
      return $_SESSION[$session_name];
    }

    return $not_found;
  }

  public function sess($key, $val)
  {
    $_SESSION[$key] = $val;
  }

  public static function set_session($data, $value = null)
  {
    if (\ArrayHelper\helper::is_iterable($data)) {
      foreach ($data as $key => $val) {
        $_SESSION[$key] = $val;
      }
    }
    if (is_string($data)) {
      $_SESSION[$data] = $value;
    }
  }
}
