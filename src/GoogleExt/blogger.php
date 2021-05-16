<?php /** @noinspection PhpSameParameterValueInspection */

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
    private $result_get_post = [];
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

    /**
     * Set Blog By URL
     * @param $url
     * @return Google_Service_Blogger_Blog
     */
    public function byUrl($url)
    {
        $blog = $this->service->blogs->getByUrl($url);
        $this->blogId = $blog->getId();

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

    /**
     * Get All Blogger Posts
     * @param null|string $blogId
     * @param null|string $pageToken
     * @return array
     */
    public function getPosts($blogId = null, $pageToken = null)
    {
        if ($blogId == null) {
            $blogId = $this->blogId;
        }
        $query = [
            'key' => CONFIG['google']['key']
        ];
        if (is_string($pageToken) && !empty($pageToken)) {
            $query['pageToken'] = $pageToken;
        }
        $url = "https://www.googleapis.com/blogger/v3/blogs/$blogId/posts?" . http_build_query($query);
        $response = $this->curl($url);
        if (isset($response['items'])) {
            $this->result_get_post = array_merge($this->result_get_post, $response['items']);
        }
        if (isset($response['nextPageToken'])) {
            return $this->getPosts($blogId, $response['nextPageToken']);
        }
        return $this->result_get_post;
    }

    /**
     * Blogger Curl
     * @param $url
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
