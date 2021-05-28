<?php

namespace Cookie;

/**
 * Cookie helper.
 */
class helper
{
  public static $domain = '/';
  public static $secure = false;
  public static $password = CONFIG['security']['salt'];

  public static function secure($secure)
  {
    self::$secure = $secure;
  }

  public static function domain($domain)
  {
    self::$domain = $domain;
  }

  /**
   * Get Cookie By Name.
   *
   * @param string cookie value
   * * if value is json, auto convert them into Array
   *
   * @return string|array|null
   */
  public static function get($name, $AllowEmpty = true)
  {
    $ret = null;
    if (isset($_COOKIE[$name])) {
      $ret = $_COOKIE[$name];
    }
    if ($ret) {
      //$ret = json_decode(gzinflate($ret), true);
      //$ret = json_decode(base64_decode($ret), true);
      $ret = aesDecrypt($ret, self::$password);
    }
    if (!$AllowEmpty && empty($ret)) {
      $ret = null;
    }

    return $ret;
  }

  /**
   * Destroy all cookies except php session and spesific cookies name.
   *
   * @return void
   */
  public static function destroy(array $except = [])
  {
    if (isset($_SERVER['HTTP_COOKIE'])) {
      $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
      $i = 0;
      foreach ($cookies as $cookie) {
        ++$i;
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        //var_dump($name);
        // skip session clear
        if (preg_match('/PHPSESSID/s', $name) || in_array($name, $except)) {
          continue;
        }
        setcookie($name, '', time() - 1000);
        setcookie($name, '', time() - 1000, '/');
        setcookie($name, '', time() - 1000, self::get_current_path());
        if (20 == $i) {
          break;
        }
      }
    }
  }

  public static function get_current_path()
  {
    $url_parts = \MVC\helper::parse_url2(self::get_current_url());

    return isset($url_parts['path']) ? $url_parts['path'] : '';
  }

  public static function get_current_url()
  {
    $pageURL = 'http';
    if (isset($_SERVER['HTTPS']) && 'on' == $_SERVER['HTTPS']) {
      $pageURL .= 's';
    }
    $pageURL .= '://';
    if ('80' != $_SERVER['SERVER_PORT']) {
      $pageURL .= $_SERVER['SERVER_NAME']
        . ':'
        . $_SERVER['SERVER_PORT']
        . $_SERVER['REQUEST_URI'];
    } else {
      $pageURL .= $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    }

    return $pageURL;
  }

  public static function all()
  {
    return $_COOKIE;
  }

  public static function reconstruct_url($url)
  {
    $url_parts = \MVC\helper::parse_url2($url);
    $constructed_url = $url_parts['scheme'] . '://' . $url_parts['host'] . (isset($url_parts['path']) ? $url_parts['path'] : '');

    return $constructed_url;
  }

  /**
   * Set cookie by days.
   *
   * @see \Cookie\helper::set() automatically set expire time to day format
   */
  public static function day($name, $value = true, $expire, $path = '/', $domain = '', $secure = false, $httponly = false)
  {
    return self::set($name, $value, time() + 60 * 60 * 24 * $expire, $path, $domain, $secure, $httponly);
  }

  /**
   * Set cookie helper.
   *
   * @param mixed            $value
   * @param int|float|string $expire   1m/1h/1d/1y default m(minute)
   * @param string           $domain   default $_SERVER['HTTP_HOST']
   * @param bool             $secure
   * @param bool             $httponly
   *
   * @return setcookie
   */
  public static function set($name, $value, $expire, $path = '/', $domain = '', $secure = false, $httponly = false)
  {
    if (empty($domain)) {
      $domain = $_SERVER['HTTP_HOST'];
    }
    if (empty($path)) {
      $path = '/';
    }

    if (is_string($expire)) {
      if (endsWith($expire, 'h')) {
        $expire = time() + (toNumber($expire) * 3600);
      } elseif (endsWith($expire, 'd')) {
        $expire = time() + (toNumber($expire) * 86400);
      } elseif (endsWith($expire, 'm')) {
        $expire = time() + (toNumber($expire) * 60);
      } elseif (endsWith($expire, 'y')) {
        $expire = time() + (toNumber($expire) * 31556926); // where 31556926 is total seconds for a year.
      }
    } else {
      $expire = time() + (toNumber($expire) * 60);
    }

    try {
      //$value = gzdeflate(json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), 9);
      //$value = base64_encode(json_encode($value));
      $value = aesEncrypt($value, self::$password);
    } catch (\MVC\Exception $E) {
      $value = $value;
    }

    $valid = !preg_match('/[=,; \t\r\n\013\014]/', $name);
    if ($valid) {
      if (!setcookie($name, $value, $expire, $path, $domain, $secure, $httponly)) {
        return false;
      } else {
        return true;
      }
    } else {
      error_log('Cookie names cannot contain any of the following \'=,; \t\r\n\013\014\' on ' . self::get_current_url());
    }
  }

  /**
   * Set cookie by hours.
   *
   * @see \Cookie\helper::set() automatically set expire time to hours format
   */
  public static function hours($name, $value = true, $expire = 1, $path = '/', $domain = '', $secure = false, $httponly = false)
  {
    return self::set($name, $value, time() + (60 * 60 * $expire), $path, $domain, $secure, $httponly);
  }

  /**
   * one time function when cookie name empty.
   *
   * @param int $minutes minute to be expired
   *
   * @return void
   */
  public static function one($cookie_name, $value, $minutes, callable $callback)
  {
    if (!self::has($cookie_name)) {
      if (is_callable($callback)) {
        call_user_func($callback, $cookie_name, $minutes);
        self::mins($cookie_name, $value, $minutes);
      }
    }
  }

  /**
   * Check cookie exist.
   *
   * @param bool $AllowEmpty if true, will return false if cookie value empty
   *
   * @return bool|null
   *                   `true` indicated exists,
   *                   `null` indicated empty value,
   *                   `false` indicated not set
   */
  public static function has($name, $AllowEmpty = true)
  {
    $ret = false;
    if (isset($_COOKIE[$name])) {
      $ret = true;
    }
    if ((true !== $AllowEmpty) && empty($ret)) {
      $ret = null;
    }

    return $ret;
  }

  /**
   * Set cookie by minutes.
   *
   * @see \Cookie\helper::set() automatically set expire time to minutes format
   */
  public static function mins($name, $value = true, $expire, $path = '/', $domain = '', $secure = false, $httponly = false)
  {
    return self::set($name, $value, time() + (60 * $expire), $path, $domain, $secure, $httponly);
  }

  /**
   * Delete cookie.
   *
   * @return bool true | false | null
   *              * return true if success and exists
   *              * return false if cookie not exists
   *              * return null if $_COOKIE constant not exists
   */
  public static function del($name)
  {
    if (isset($_COOKIE[$name])) {
      unset($_COOKIE[$name]);
      setcookie($name, null, -1, '/');

      return true;
    } else {
      return false;
    }

    return null;
  }

  /** This magic method is called everytime an inaccessible method is called
   * (either by visibility contrains or it doesn't exist)
   * Here we are simulating shared protected methods across "package" classes
   * This method is inherited by all child classes of Package.
   */
  public function __call($method, $args)
  {
    //class name
    $class = get_class($this);

    /* we check if a method exists, if not we throw an exception
     * similar to the default error
     */
    if (method_exists($this, $method)) {
      /** The method exists so now we want to know if the
       * caller is a child of our Package class. If not we throw an exception
       * Note: This is a kind of a dirty way of finding out who's
       * calling the method by using debug_backtrace and reflection.
       */
      $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);
      if (isset($trace[2])) {
        $ref = new \ReflectionClass($trace[2]['class']);
        if ($ref->isSubclassOf(__CLASS__)) {
          return $this->$method($args);
        }
      }
      throw new \Exception("Call to private method $class::$method()");
    } else {
      throw new \Exception("Call to undefined method $class::$method()");
    }
  }
}
