<?php

namespace img;

/**
 * Image Cache Engine.
 */
class cache
{
  public static $url;
  public static $api;
  /**
   * Cache file img location.
   *
   * @var string
   */
  public static $cache;
  public static $cache_dir = ROOT . '/tmp/img/';
  private static $caches = [];
  public static $saved;

  public function __construct()
  {
    self::$api = new \Extender\request('https://unsplash.it');
    self::$saved = resolve_file(self::$cache_dir . '/saved.json', '{}');
  }

  /**
   * @return string|false
   */
  public static function imageCache($url, $rewrite = false)
  {
    resolve_file(self::$cache_dir . '/.htaccess', 'deny from all');
    self::$url = $url;
    self::$cache = self::$cache_dir . '/' . md5($url);
    self::$saved = resolve_file(self::$cache_dir . '/saved.json', '{}');

    $read_caches = read_file(self::$saved, []);

    if (is_string($read_caches)) {
      if (is_json($read_caches)) {
        self::$caches = array_merge(self::$caches, json_decode($read_caches, true));
      }
    }

    if (file_exists(self::$cache) && !headers_sent()) {
      header('X-Robots-Tag: noindex, nofollow', true);
      header_remove('x-powered-by');
      header_remove('pragma');
      self::send_cache_header(self::$cache);
      $lastModified = gmdate('D, d M Y H:i:s', filemtime(self::$cache)) . ' GMT';
      header('Cache-Control: private', true);
      /*
       * Send fallback headers
       */
      header('ETag: ' . md5_file(self::$cache));
      header("Last-Modified: $lastModified", true);
      // 1 day expires
      header('Expires: ' . gmdate('D, d M Y H:i:s', ((60 * 60 * 24 * 1) + strtotime($lastModified))), true);

      // get saved image information
      //image/svg+xml
      self::mime_header(mime_content_type(self::$cache));

      $read = read_file(self::$cache);

      if (!empty($read)) {
        return $read;
      } else {
        return self::{__FUNCTION__}($url, true);
      }
    }

    if (!isset(self::$caches[self::$cache]) || (is_bool($rewrite) && $rewrite)) {
      return self::crawl($url);
    }

    return false;
  }

  private static function mime_header($mime)
  {
    if (1 !== preg_match('#image/png|image/.*icon|image/jpe?g|image/.*#', $mime)) {
      header('HTTP/1.1 404 Not Found');
      e($mime);
      exit;
    }
    if (false !== strpos($mime, 'svg')) {
      $mime = 'image/svg+xml';
    }
    header('Content-Type: ' . $mime, true);
  }

  private static function crawl($url)
  {
    if (!self::$api) {
      self::$api = new \Extender\request($url);
    }
    self::$api->set_url($url);
    self::$api->setCookieFile(self::$cache_dir . '/cookies-imageCache.txt');
    self::$api->setCookieJar(self::$cache_dir . '/cookies-imageCache.txt');
    self::$api->setReferrer($url);
    self::$api->setUserAgent($_SERVER['HTTP_USER_AGENT']);

    self::$api->setUrl($url);
    self::$api->set_method('get');
    self::$api->exec();
    if (!self::$api->error) {
      for ($i = 0; $i < 2; ++$i) {
        if (isset(self::$api->responseHeaders['Location'])) {
          self::$api->get(self::$api->responseHeaders['Location']);
        } else {
          break;
        }
      }

      if (false !== strpos(self::$api->responseHeaders['Content-Type'], 'image')) {
        $res[$url] = self::$api->url;
        write_file(self::$saved, $res, true);
        write_file(self::$cache, self::$api->response, true);
        self::mime_header(self::$api->responseHeaders['Content-Type']);
        self::writeCache();

        return self::$api->response;
      } else {
        e(self::$api->responseHeaders['Content-Type']);
      }
    }

    return false;
  }

  /**
   * Send Cache Header for static content.
   *
   * @param string $cache_file_name
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

      // Check if the client already has the requested item
      $check = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) or
        isset($_SERVER['HTTP_IF_NONE_MATCH']);
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

  /**
   * Write Cache.
   *
   * @return void
   */
  public static function writeCache()
  {
    $res[self::$cache] = self::$api->url;
    write_file(self::$saved, $res, true);
    write_file(self::$cache, self::$api->response, true);
    header('Content-Type: ' . self::$api->responseHeaders['Content-Type'], true);
    echo self::$api->response;
  }

  /**
   * * `schema data cache`
   * ```json
   * { "md5": "realURL" }
   * ```
   * Transform url image to cache.
   *
   * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
   */
  public static function url2cache($url)
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
     *
     * @var string save cache name generator
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
    $read_caches = read_file($saved, []);
    if (is_string($read_caches)) {
      self::$caches = array_replace(self::$caches, json_decode($read_caches, true));
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

  public function clean()
  {
    $folder = self::$cache_dir;
  }
}
