<?php

namespace GoogleExt;

class Posts
{
  public $selfLink; //String
  public $totalItems; //int
}
class Pages
{
  public $selfLink; //String
  public $totalItems; //int
}
class Locale
{
  public $country; //String
  public $language; //String
  public $variant; //String
}

class Serializer
{
  /**
   * Status deserialized.
   *
   * @var string
   */
  public $deserializedBy = 'curl';
  public $customMetaData; //array( undefined )
  public $description; //String
  /**
   * Blog ID.
   *
   * @var string
   */
  public $id; //String
  public $kind; //String
  public $name; //String
  public $published; //Date
  public $selfLink; //String
  public $status; //array( undefined )
  public $updated; //Date
  public $url; //String
  /**
   * Blogger Posts.
   *
   * @var Posts
   */
  public $posts; //Posts
  /**
   * Blogger Pages.
   *
   * @var Pages
   */
  public $pages; //Pages
  /**
   * Blogger Locale.
   *
   * @var Locale
   */
  public $locale; //Locale
}

class Google_Service_Blogger_Blog2 extends Serializer
{
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

  /**
   * Get blog id.
   *
   * @return string
   */
  public function getId()
  {
    return $this->id;
  }
}
