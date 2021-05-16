<?php

namespace img;

/**
 * Image Cache Engine.
 */
class cache
{
  public static $saved;
  public static $url;
  public static $api;
  public static $cache;
  public static $cache_dir = ROOT . '/tmp/img/';

  public function __construct()
  {
    self::$api = new \Extender\request('https://unsplash.it');
  }

    public function clean()
    {
        $folder = self::$cache_dir;
    }

  public static function imageCache(string $url, bool $rewrite = false)
  {
    resolve_file(self::$cache_dir . '/.htaccess', 'deny from all');
    if (!self::$api) {
      self::$api = new \Extender\request('https://unsplash.it');
    }
    self::$url = $url;
    self::$api->setCookieFile(self::$cache_dir . '/cookies.txt');
    self::$api->setCookieJar(self::$cache_dir . '/cookies.txt');
    self::$api->setReferrer($url);
    self::$api->setUserAgent($_SERVER['HTTP_USER_AGENT']);
    $saved = resolve_file(self::$cache_dir . '/saved.json', '{}');
    self::$saved = $saved;
    $res = read_file($saved, []);
    if (is_string($res) && is_json($res)) {
      $res = json_decode($res, true);
    }

    self::$api->setUrl($url);
    $url = self::$api->url;
    $cache = self::$cache_dir . '/' . md5($url);
    self::$cache = $cache;
    if (file_exists($cache) && !headers_sent()) {
      header_remove('x-powered-by');
      header_remove('pragma');
      self::send_cache_header($cache);
      $lastModified = gmdate('D, d M Y H:i:s', filemtime($cache)) . ' GMT';
      header('Cache-Control: private');
      /*
       * Send fallback headers
       */
      //header('Content-type: image/jpeg');
      header('ETag: ' . md5_file($cache));
      header("Last-Modified: $lastModified");
      // 1 day expires
      header('Expires: ' . gmdate('D, d M Y H:i:s', ((60 * 60 * 24 * 1) + strtotime($lastModified))));
    }

    if (!isset($res[$url]) || (is_bool($rewrite) && $rewrite)) {
      self::$api->set_method('get');
      self::$api->exec();
      for ($i = 0; $i < 2; ++$i) {
        if (isset(self::$api->responseHeaders['Location'])) {
          self::$api->get(self::$api->responseHeaders['Location']);
        } else {
          break;
        }
      }
      $res[$url] = self::$api->url;
      write_file($saved, $res, true);
      write_file($cache, self::$api->response, true);
      header('Content-Type: ' . self::$api->responseHeaders['Content-Type'], true);
      echo self::$api->response;
    } elseif (file_exists($cache)) {
      header('Content-Type: ' . mime_content_type($cache), true);
      $read = read_file($cache);
      if (!empty($read)) {
        echo $read;
      } else {
        return self::{__FUNCTION__}($url, true);
      }
    } else {
      self::$api->set_url($res[$url])->set_method('get')->exec();
      self::writeCache();
    }
  }

  /**
   * Transform url image to cache
   * * `schema data cache`
   * ```json
   * { "md5": "realURL" }
   * ```.
   *
   * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
   */
  public static function url2cache(string $url)
  {
    if (!self::$api) {
      self::$api = new \Extender\request('https://unsplash.it');
    }
    /**
     * @var string Anonymize url into md5
     *
     * @todo Fix unecessary characters from url
     */
    $md5 = md5($url);
      /**
       * @return string domain or default
       * @var string save cache name generator
       *
       */
    $savedname = function () {
      global $url;
      $savedname = \MVC\helper::url2host($url);
      if (!$savedname) {
        $savedname = 'default';
      }

      return $savedname;
    };
    /**
     * @var string Save location schema image
     */
    $saved = __DIR__ . "/data/$savedname.json";
    self::$saved = $saved;
    $res = read_file($saved, []);
    if (is_string($res)) {
      $res = json_decode($res, true);
    }
    if (isset($res[$md5])) {
      self::$url = $res[$md5];
    } elseif (\MVC\helper::is_url($url)) {
      $res[$md5] = self::$url = $url;
      $saved = __DIR__ . "/data/$savedname.json";
    }

    self::$api->setUrl(self::$url);
    $url = self::$api->url;
    $cache = ROOT . '/tmp/img/' . md5($url);
    self::$cache = $cache;

    if (!file_exists($cache)) {
      self::$api->set_method('get');
      self::$api->exec();
      for ($i = 0; $i < 10; ++$i) {
        if (isset(self::$api->responseHeaders['Location'])) {
          self::$api->get(self::$api->responseHeaders['Location']);
        } else {
          break;
        }
      }

      write_file($saved, $res, true);
      write_file($cache, self::$api->response, true);
    }

    return '/img/cache?hash=' . md5($url);
  }

  /**
   * Write Cache.
   *
   * @return void
   */
  public static function writeCache()
  {
    $res[self::$url] = self::$api->url;
    write_file(self::$saved, $res, true);
    write_file(self::$cache, self::$api->response, true);
    header('Content-Type: ' . self::$api->responseHeaders['Content-Type'], true);
    echo self::$api->response;
  }

  /**
   * Send Cache Header for static content.
   *
   * @param [type] $cache_file_name
   * @param bool   $check_request
   *
   * @return void
   */
  public static function send_cache_header($cache_file_name, $check_request = false)
  {
    if (headers_sent()) {
      return;
    }
    $mtime = @filemtime($cache_file_name);

    if ($mtime > 0) {
      $gmt_mtime = gmdate('D, d M Y H:i:s', $mtime) . ' GMT';
      $etag = sprintf('%08x-%08x', crc32($cache_file_name), $mtime);

      header('ETag: "' . $etag . '"', true);
      header('Last-Modified: ' . $gmt_mtime, true);
      header('Cache-Control: private', true);
      // we don't send an "Expires:" header to make clients/browsers use if-modified-since and/or if-none-match

      if ($check_request) {
        if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && !empty($_SERVER['HTTP_IF_NONE_MATCH'])) {
          $tmp = explode(';', $_SERVER['HTTP_IF_NONE_MATCH']); // IE fix!
          if (!empty($tmp[0]) && strtotime($tmp[0]) == strtotime($gmt_mtime)) {
            header('HTTP/1.1 304 Not Modified');

            return false;
          }
        }

        if (isset($_SERVER['HTTP_IF_NONE_MATCH'])) {
          if (str_replace(['\"', '"'], '', $_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
            header('HTTP/1.1 304 Not Modified');

            return false;
          }
        }
      }
    }

    return true;
  }
}
