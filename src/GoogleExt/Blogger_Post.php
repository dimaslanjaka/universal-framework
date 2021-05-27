<?php

namespace GoogleExt;

class Blog
{
  public $id; //String
}
class Image
{
  public $src;
  public $rel;
  public $width;
  public $height;
  public $url;
}
class Author
{
  public $name; //String
  public $email; //String
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

class Attributes
{
  public $scheme; //String
  public $term; //String
  public $rel; //String
  public $type; //String
  public $href; //String
}

class Category
{
  /**
   * Attributes
   *
   * @var Attributes
   */
  public $attributes;
}

class Link
{
  /**
   * Attributes
   *
   * @var Attributes
   */
  public $attributes;
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
  /**
   * Post contents.
   *
   * @var string
   */
  public $content;
  /**
   * Author.
   *
   * @var Author
   */
  public $author;
  /**
   * Replies.
   *
   * @var Replies
   */
  public $replies;
  /**
   * Labels.
   *
   * @var string[]
   */
  public $labels;
  /**
   * Etag.
   *
   * @var string
   */
  public $etag;
  public $draft = false;
  public $deserializedBy = 'curl';
  /**
   * Categories.
   *
   * @var Category[]
   */
  public $category;
  /**
   * Links Blogger.
   *
   * @var Link[]
   */
  public $link;

  public function __construct($deserializedJson)
  {
    $this->set($deserializedJson);
    $this->deserializedBy = 'config';
  }

  public function set($data)
  {
    foreach ($data as $key => $value) {
      if ($key == 'entry') {
        $this->set($data[$key]);
      } else {
        if (is_array_object($value)) {
          $mod = (array) $value;
          if (isset($mod['@attributes'])) {
            $mod['attributes'] = $mod['@attributes'];
            unset($mod['@attributes']);
            $value = $mod;
          }
          $fixmod = isset($mod[0]) ? $mod[0] : (isset($mod['$t']) ? $mod['$t'] : null);
          if (in_array($key, ['id', 'published', 'updated'])) {
            if ($fixmod !== null) {
              if ($key != 'id') {
                // set published and updated
                $value = $fixmod;
              } else {
                if (strpos($fixmod, 'blog-') !== false) {
                  // get blog id
                  if (preg_match('/blog-([\d]+)/', $fixmod, $matches)) {
                    if (isset($matches[1])) {
                      $this->blog = new Blog();
                      $this->blog->id = $matches[1];
                    }
                  }

                  // get post id
                  if (preg_match('/post-([\d]+)/', $fixmod, $matches)) {
                    if (isset($matches[1])) {
                      $value = $this->id = $matches[1];
                    }
                  }
                }
              }
            }
          } else if (in_array($key, ['title', 'content'])) {
            if ($fixmod !== null) {
              $value = $fixmod;
            }
          } else if ($key == 'author') {
            if (isset($fixmod['name']['$t'])) {
              $fixmod['name'] = $fixmod['name']['$t'];
            }
            if (isset($fixmod['email']['$t'])) {
              $fixmod['email'] = $fixmod['email']['$t'];
            }
            if (isset($fixmod['uri']['$t'])) {
              $fixmod['uri'] = $fixmod['uri']['$t'];
            }
            if (isset($fixmod['gd$image'])) {
              $fixmod['image'] = $fixmod['gd$image'];
              unset($fixmod['gd$image']);
            }
            $value = $fixmod;
          }
        }

        $this->{$key} = $value;
      }
    }
  }

  public function __toString()
  {
    return $this->id;
  }
}
