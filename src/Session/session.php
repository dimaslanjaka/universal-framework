<?php

namespace Session;

class session
{
  private $filemanager;

  public function __construct()
  {
    $this->filemanager = new \Filemanager\file();
  }

  public function is_session_started($start = false)
  {
    if (phpversion() > '5.4.0') {
      if (PHP_SESSION_NONE == session_status()) {
        if ($start) {
          session_start();

          return true;
        } else {
          //session not started return false
          return false;
        }
      }
    } else {
      if ('' == session_id()) {
        if ($start) {
          session_start();

          return true;
        } else {
          //session not started return false
          return false;
        }
      }
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
    // Set the max lifetime
    ini_set('session.gc_maxlifetime', $timeout);

    // Set the session cookie to timout
    ini_set('session.cookie_lifetime', $timeout);

    // Set session directory save path
    ini_set('session.save_path', $this->filemanager->_folder_(__DIR__ . '/sessions'));

    // Change the save path. Sessions stored in teh same path
    // all share the same lifetime; the lowest lifetime will be
    // used for all. Therefore, for this to work, the session
    // must be stored in a directory where only sessions sharing
    // it's lifetime are. Best to just dynamically create on.
    $seperator = strstr(strtoupper(substr(PHP_OS, 0, 3)), 'WIN') ? '\\' : '/';
    $path = ini_get('session.save_path') . $seperator . $timeout;
    if (!is_dir(dirname($path))) {
      if (!mkdir(dirname($path), 600)) {
        trigger_error("Failed to create session save path directory '$path'. Check permissions.", E_USER_ERROR);
      }
    }
    if (!file_exists($path)) {
      if (!mkdir($path, 600)) {
        trigger_error("Failed to create session save path directory '$path'. Check permissions.", E_USER_ERROR);
      }
    }
    ini_set('session.save_path', $path);

    // Set the chance to trigger the garbage collection.
    ini_set('session.gc_probability', $probability);
    ini_set('session.gc_divisor', 100); // Should always be 100

    // Start the session!
    if (!session_id() || PHP_SESSION_NONE == session_status()) {
      session_start();
    }

    // Renew the time left until this session times out.
    // If you skip this, the session will time out based
    // on the time when it was created, rather than when
    // it was last used.
    if (isset($_COOKIE[session_name()]) && !headers_sent()) {
      setcookie(session_name(), $_COOKIE[session_name()], time() + $timeout, $cookie_domain);
    }
    $this->protect_session();
  }

  public function start($timeout = 3600, $probability = 1, $cookie_domain = '/')
  {
    if (!session_id() || PHP_SESSION_NONE == session_status()) {
      ini_set('memory_limit', '256M'); //-1
      $session_dir = $this->filemanager->_folder_(__DIR__ . '/sessions/' . $timeout);
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
  }

  public function protect_session()
  {
    //creating htaccess for deny direct access
    $path = ini_get('session.save_path');
    if (!file_exists($path . '/.htaccess')) {
      $this->filemanager->_file_($path . '/.htaccess', 'deny from all');
    }
  }
}
