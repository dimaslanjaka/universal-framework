<?php

namespace GoogleExt;

use Google_Service_Blogger;

class blogger
{
  private $service;
  public $posts;
  public $blogs;
  public $blogid;

  /**
   * @param \Google\Client|\GoogleExt\client $client
   */
  function __construct($client)
  {
    $this->service = new Google_Service_Blogger($client);
    $this->blogs = $this->service->blogs;
    $this->posts = $this->service->posts;
  }

  function get_blog_byurl(string $url)
  {
    $blog =  $this->service->blogs->getByUrl($url);
    $this->blogid = $blog->getId();
    return $blog;
  }

  function list_posts($limit = 5)
  {
    return $this->posts->listPosts($this->blogid, ["maxResults" => $limit]);
  }

  function set_blog_id($id)
  {
    $this->blogid = $id;
  }
}
