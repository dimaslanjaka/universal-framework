<?php

use function DI\object;

/**
 * Admin Google Client
 *
 * @return GoogleClient
 */
function gclient()
{
  $client = new GoogleClient();
  $client->gClient->setClientId(GOOGLE_CLIENT_ID);
  $client->gClient->setClientSecret(GOOGLE_CLIENT_SECRET);
  $client->gClient->setDeveloperKey(GOOGLE_CLIENT_KEY);
  $client->gClient->setRedirectUri(WP_HOME . '/crawler/admin');
  $client->gClient->setScopes([Google_Service_Blogger::BLOGGER_READONLY, Google_Service_Blogger::BLOGGER]);
  $client->gClient->setApprovalPrompt('force');
  $client->gClient->setAccessType('offline');

  if (!$client->gClient->getAccessToken() && file_exists($client->tokenFile)) {
    $token = file_get_contents($client->tokenFile);
    $client->gClient->setAccessToken($token);
  }
  if ($client->gClient->getAccessToken() && $client->gClient->getRefreshToken() && $client->gClient->isAccessTokenExpired()) {
    $client->gClient->fetchAccessTokenWithRefreshToken($client->gClient->getRefreshToken());
    $token = $client->gClient->getAccessToken();
    $token['lastRefreshed'] = time();
    _file_($client->tokenFile, $token, true);
  }

  return $client;
}

class GoogleClient
{
  public $tokenFile = __DIR__ . '/' . WP_HOST . '/token.json';
  public $movies;
  public $movies_path = __DIR__ . '/config/movies.json';
  public $CDATA;
  public $CDATA_path;
  /**
   * Google_Client
   *
   * @var \Google_Client
   */
  public $gClient;
  function __construct()
  {
    $this->movies = json_decode(file_get_contents(_file_($this->movies_path, ['blogID' => '', 'bloggerID' => ''])));
    $this->gClient = new \Google_Client();
  }

  function saveConfig()
  {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      if (isreq('movies')) {
        $this->movies = (object) $this->movies;
        if (isreq('bloggerid')) {
          $this->movies->bloggerID = trim(isreq('bloggerid'));
        }
        if (isreq('blogid')) {
          $this->movies->blogID = trim(isreq('blogid'));
        }
        _file_($this->movies_path, $this->movies, true);
      }
    }
  }
  /**
   * Get blogger post by title
   *
   * @param string $title
   * @return Google_Service_Blogger_Post|false
   */
  function getPostByTitle($title)
  {
    $blogger = new \Google_Service_Blogger($this->gClient);
    if (isset($this->movies->{$title})) {
      $cfg = $this->movies->{$title};
      $post = $blogger->posts->get($cfg->blog, $cfg->post, ['fetchBody' => true, 'fetchImages' => true]);
      return $post;
    }
  }

  function listBloggerPosts($blogid)
  {
    $api = http_build_query([
      'key' => GOOGLE_CLIENT_KEY,
      'maxResults' => 100
    ]);
    $url = "https://www.googleapis.com/blogger/v3/blogs/{$blogid}/posts?{$api}";
    $curl = wp_curl(false, false);
    $curl->setReferer(WP_HOME);
    $curl->setReferrer(WP_HOME);
    $curl->get($url);
    if (!$curl->error) {
      $curl->response->url = "https://www.googleapis.com/blogger/v3/blogs/{$blogid}/posts";
      return $curl->response;
    }
  }

  function updateMovies()
  {
    $this->movies = [
      'blogID' => isset($this->movies->blogID) ? $this->movies->blogID : '',
      'bloggerID' => isset($this->movies->bloggerID) ? $this->movies->bloggerID : ''
    ];
    $this->movies = (object) $this->movies;
    if (!empty($this->movies) && isset($this->movies->blogID)) {
      $posts = $this->listBloggerPosts($this->movies->blogID);
      foreach ($posts->items as $singlePost) {
        $this->movies->{$singlePost->title} = [
          'url' => $singlePost->url,
          'post' => $singlePost->id,
          'blog' => $singlePost->blog->id,
          'author' => $singlePost->author->id
        ];
      }
      _file_($this->movies_path, $this->movies, true);
    }
  }

  function ApifetchNext($json, $options = [])
  {
    if (!is_object($json)) {
      throw new Exception('Fetch next page token need object responses');
    }
    if (!isset($json->url)) {
      throw new Exception('Fetch next page token need url property');
    }
    $api = [
      'pagetoken' => $json->nextPageToken,
      'key' => GOOGLE_CLIENT_KEY
    ];
    if (!empty($options)) {
      $api = array_replace($api, $options);
    }
    $api = http_build_query($api);
  }

  function tokenInfo($token = null)
  {
    $curl = wp_curl(0, 0);
    if (!$token) $token = $this->gClient->getAccessToken();
    $curl->get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' . $token['access_token']);
    $token = array_merge((array) $curl->response, (array) $token);
  }
}

function InfoLabel($str)
{
?>
  <div class="alert alert-info fixed-right" style="width: 12em">
    <div class="text-center">
      <?= $str ?>
      <br>
      <button class="btn btn-warning" id="rewrite"><i class="fas fa-pencil"></i>Rewrite</button>
      <script>
        let params = new URLSearchParams(location.search);
        let href = location.protocol + '//' + location.host + location.pathname + '?path=' + encodeURIComponent(params.get('path'));
        if (params.get('rewrite')) {
          setTimeout(() => {
            window.history.go(-1);
          }, 60000);
        }
        href += '&rewrite=1';
        if (typeof document.addEventListener == 'function') document.addEventListener("click", function(e) {
          if (e.target.id == "rewrite") {
            location.href = href;
          }
        });
        if (typeof document.attachEvent == 'function') document.attachEvent('onclick', function(e) {
          if (window.event.srcElement == "rewrite") {
            location.href = href;
          }
        });
      </script>
    </div>
  </div>
<?php
}
