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
  public $sessionCookieName = 'uf';
  public $cookiePath = '/';
  public $cookieDomain = '';
  /**
   * Cookie will only be set if a secure HTTPS connection exists.
   *
   * @var bool
   */
  private $cookieSecure = false;
  /**
   * sid regex expression.
   *
   * @var string
   */
  private $sidRegexp;

  public function __construct(int $timeout = 3600, string $session_folder = null)
  {
    if (!$this->is_session_started()) {
      //$this->configure($timeout, $session_folder);
      //$this->start_timeout($timeout);
      $this->handle($timeout, $session_folder);
    }
  }

  public function is_session_started()
  {
    return PHP_SESSION_ACTIVE == session_status();
  }

  public function handle(int $timeout, string $folder = null)
  {
    $name =  '_' . $timeout . md5(\MVC\helper::getRequestIP() . \MVC\helper::useragent());
    if (empty(trim($folder)) || !$folder) {
      $folder = \Filemanager\file::folder(__DIR__ . '/sessions');
    }
    session_save_path($folder);

    ini_set('session.gc_maxlifetime', $timeout);
    ini_set('session.cookie_lifetime', $timeout);
    ini_set('session.gc_probability', 100);
    ini_set('session.gc_divisor', 100);

    session_id($name);
    ini_set('session.use_strict_mode', 0);

    session_name($name);
    ini_set('session.use_strict_mode', 1);

    $handler = new FileSessionHandler($folder, 'PHPJS');
    session_set_save_handler(
      [$handler, 'open'],
      [$handler, 'close'],
      [$handler, 'read'],
      [$handler, 'write'],
      [$handler, 'destroy'],
      [$handler, 'gc']
    );
    register_shutdown_function('session_write_close');
    session_start();

    $path = ini_get('session.save_path');
    if (!file_exists($path . '/.htaccess')) {
      file::file($path . '/.htaccess', 'deny from all');
    }
    if (!isset($_SESSION['session_started'])) {
      $_SESSION['session_started'] = $this->now();
      $_SESSION['session_timeout'] = ini_get('session.gc_maxlifetime');
      $_SESSION['cookie_timeout'] = ini_get('session.cookie_lifetime');
    }
  }

  private function configure(int $timeout, string $folder = null)
  {
    ini_set('session.autostart', false);
    //increase memory
    ini_set('memory_limit', '256M'); //-1

    // Set the max lifetime
    ini_set('session.gc_maxlifetime', $timeout);

    // Set the session cookie to timeout
    ini_set('session.cookie_lifetime', $timeout);

    //coookie name
    if (empty($this->sessionCookieName)) {
      $this->sessionCookieName = \MVC\helper::clean_special_characters($_SERVER['HTTP_HOST']);
    }
    session_name('WebsiteID');
    ini_set('session.name', 'WebsiteID');

    //set session id
    session_id(md5(\MVC\helper::getRequestIP()));

    /*session_set_cookie_params(
      $timeout,
      $this->cookiePath,
      $this->cookieDomain,
      $this->cookieSecure,
      true // HTTP only; Yes, this is intentional and not configurable for security reasons.
    );*/

    //========== Session save path
    if ($folder && realpath($folder)) {
      $folder = realpath($folder);
    } else {
      $folder = \Filemanager\file::folder(__DIR__ . '/sessions');
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
    //========== Session save path

    // Security is king
    ini_set('session.use_trans_sid', 0);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.use_cookies', 1);
    //ini_set('session.use_only_cookies', 1);

    $bits_per_character = (int) (false !== ini_get('session.sid_bits_per_character')
      ? ini_get('session.sid_bits_per_character')
      : 4);
    $sid_length = (int) (false !== ini_get('session.sid_length')
      ? ini_get('session.sid_length')
      : 40);
    if (($sid_length * $bits_per_character) < 160) {
      $bits = ($sid_length * $bits_per_character);
      // Add as many more characters as necessary to reach at least 160 bits
      $sid_length += (int) ceil((160 % $bits) / $bits_per_character);
      ini_set('session.sid_length', $sid_length);
    }

    // Yes, 4,5,6 are the only known possible values as of 2016-10-27
    switch ($bits_per_character) {
      case 4:
        $this->sidRegexp = '[0-9a-f]';
        break;
      case 5:
        $this->sidRegexp = '[0-9a-v]';
        break;
      case 6:
        $this->sidRegexp = '[0-9a-zA-Z,-]';
        break;
    }

    $this->sidRegexp .= '{' . $sid_length . '}';
  }

  /***
   * Starts a session with a specific timeout and a specific GC probability.
   * @param int $timeout The number of seconds until it should time out.
   * @param int $probability The probablity, in int percentage, that the garbage
   *        collection routine will be triggered right now.
   * @param strint $cookie_domain The domain path for the cookie.
   */
  public function start_timeout($timeout = 5, $probability = 100)
  {
    if ($this->is_session_started()) {
      throw new \MVC\Exception('Session already started', 1);
    }

    // Set the chance to trigger the garbage collection.
    ini_set('session.gc_probability', $probability);
    ini_set('session.gc_divisor', 100); // Should always be 100

    if (!$this->path_defined) {
      $this->configure($timeout, null);
    }

    // Start the session!
    session_start();

    // Renew the time left until this session times out.
    // If you skip this, the session will time out based
    // on the time when it was created, rather than when
    // it was last used.
    if (isset($_COOKIE[session_name()]) && !headers_sent()) {
      setcookie(session_name(), $_COOKIE[session_name()], time() + $timeout, $this->cookiePath, $this->cookieDomain, $this->cookieSecure, true);
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

  private function protect_session(int $timeout)
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
      if ($ago < $this->now()->getTimestamp()) {
        session_regenerate_id(isset($_SERVER['HTTP_LOGOUT']));
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

  /**
   * Regenerates the session ID.
   *
   * @param bool $destroy Should old session data be destroyed?
   */
  private function regenerate(bool $destroy = false)
  {
    $_SESSION['session_last_generate'] = time();
    session_regenerate_id($destroy);
  }
}
