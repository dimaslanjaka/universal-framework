<?php

namespace GoogleExt;

class Blog
{
  public $id; //String
}
class Image
{
  public $url; //String
}
class Author
{
  public $id; //String
  public $displayName; //String
  public $url; //String
  /**
   * Image.
   *
   * @var Image
   */
  public $image; //Image
}
class Replies
{
  public $totalItems; //String
  public $selfLink; //String
}
class Blogger_Post
{
  public $kind; //String
  public $id; //String
  /**
   * Blog.
   *
   * @var Blog
   */
  public $blog; //Blog
  public $published; //Date
  public $updated; //Date
  public $url; //String
  public $selfLink; //String
  public $title; //String
  public $content; //String
  /**
   * Author.
   *
   * @var Author
   */
  public $author; //Author
  /**
   * Replies.
   *
   * @var Replies
   */
  public $replies; //Replies
  public $labels;  //array( String )
  public $etag; //String
  public $deserializedBy = 'curl';

  public function __construct($deserializedJson)
  {
    $this->set($deserializedJson);
    $this->deserializedBy = 'config';
  }

  public function set($data)
  {
    foreach ($data as $key => $value) {
      $this->{$key} = $value;
    }
  }

  public function __toString()
  {
    return $this->id;
  }
}
