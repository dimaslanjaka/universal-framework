<?php

/** @noinspection PhpSameParameterValueInspection */

namespace GoogleExt;

use Exception;
use Filemanager\file;
use Google\Client as Google_Client;
use Google_Service_Blogger;
use Google_Service_Blogger_Blog;

class blogger
{
  public $posts;
  public $blogs;
  public $blogId;
  private $service;
  private $configFolder = __DIR__ . '/config/blogger';
  /**
   * @var bool Recrawl cache curl
   */
  public $recrawl = false;

  /**
   * @param Google_Client|client $client
   */
  public function __construct($client)
  {
    $this->service = new Google_Service_Blogger($client);
    $this->blogs = $this->service->blogs;
    $this->posts = $this->service->posts;
  }

  private $blogCacheId;
  private $blogConfig;

  /**
   * Set Blog By URL.
   *
   * @param $url
   *
   * @return Google_Service_Blogger_Blog|Google_Service_Blogger_Blog2
   */
  public function byUrl($url)
  {
    $parse = parse_url2($url);
    if (isset($parse['host'])) {
      $this->blogCacheId = md5($parse['host']);
      $this->blogConfig = $this->configFolder . '/' . $this->blogCacheId . '.json';
      // if config exists
      if (!file_exists($this->blogConfig)) {
        $blog = $this->service->blogs->getByUrl($url);
        file::write($this->blogConfig, json_encode($blog));
        $this->blogId = $blog->getId();
      } else {
        $blog = new Google_Service_Blogger_Blog2(file::get($this->blogConfig, true));
        $this->blogId = $blog->getId();
      }
    } else {
      e(['error' => true, 'message' => 'blog hostname empty']);
    }

    return $blog;
  }

  public function listPosts($limit = 5)
  {
    return $this->posts->listPosts($this->blogId, ['maxResults' => $limit]);
  }

  public function setBlogId($id)
  {
    $this->blogId = $id;
  }

  private $postsConfig;
  private $postsCacheId;
  /**
   * Posts.
   *
   * @var Blogger_Post[]
   */
  private $result_get_post = [];

  /**
   * Get All Blogger Posts.
   *
   * @param bool $force recrawl
   *
   * @return Blogger_Post[]
   */
  public function getPosts($force = false)
  {
    $this->postsCacheId = $this->blogId;
    $this->postsConfig = $this->configFolder . '/' . $this->postsCacheId . '/posts.json';
    $exists = file_exists($this->postsConfig);
    if ($exists) {
      $posts = file::get($this->postsConfig, true);
      if (is_array($posts)) {
        foreach ($posts as $post) {
          $this->result_get_post[] = new Blogger_Post($post);
        }
      }
    }
    if (!$exists || $force) {
      $this->fetchPosts();
      // if posts not empty, cache them
      if (!empty($this->result_get_post)) {
        file::write($this->postsConfig, json_encode($this->result_get_post));
      }
    }

    return $this->result_get_post;
  }

  private function fetchPosts($pageToken = null)
  {
    $query = [
      'key' => CONFIG['google']['key'],
    ];
    if (is_string($pageToken) && !empty($pageToken)) {
      $query['pageToken'] = $pageToken;
    }
    $blogId = $this->blogId;
    $url = "https://www.googleapis.com/blogger/v3/blogs/$blogId/posts?" . http_build_query($query);
    $response = $this->curl($url);

    if (isset($response['items'])) {
      //$this->result_get_post = array_replace($this->result_get_post, $response['items']);
      foreach ($response['items'] as $item) {
        $this->result_get_post[] = new Blogger_Post($item);
      }
    } else {
      e($response);
    }
    if (isset($response['nextPageToken'])) {
      return $this->fetchPosts($response['nextPageToken']);
    }

    return $this->result_get_post;
  }

  /**
   * Blogger Curl.
   *
   * @param $url
   *
   * @return array
   */
  private function curl($url)
  {
    $cacheId = md5($url);
    $cacheFile = ROOT . '/tmp/curl/' . __CLASS__ . '/' . __FUNCTION__ . '/' . $cacheId;
    if (file_exists($cacheFile) && !$this->recrawl) {
      //$cacheModified = filemtime($cacheFile);
      //$minute = floor((time() - $cacheModified) / (60));
      //echo $minute . PHP_EOL;
      return json_decode(file_get_contents($cacheFile), true);
    }

    try {
      $ch = curl_init($url);

      curl_setopt($ch, CURLOPT_HTTPGET, 1);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $resp = curl_exec($ch);
      file::write($cacheFile, $resp);
      curl_close($ch);

      return json_decode($resp, true);
    } catch (Exception $ex) {
      return ['error' => true, 'message' => $ex->getMessage()];
    }
  }
}
