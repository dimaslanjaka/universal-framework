<?php
const POST_DEFAULT_FLAG = 0;
const POST_NOT_EMPTY = 1;
const POST_NOT_NULL = 2;

/**
 * Post getter.
 * Get post data with fallback value
 *
 * @param string $name
 * @param string $fallback
 * @param int $flag flag rule for post getter
 * @return void
 */
function getPost(string $name, string $fallback = null, int $flag = POST_DEFAULT_FLAG)
{
  if (isPost()) {
    if (isset($_POST[$name])) {
      $thePost = $_POST[$name];
      if ($flag != POST_DEFAULT_FLAG) {
        if ($flag == POST_NOT_NULL) {
          if ($thePost != null) return $thePost;
        } else if ($flag == POST_NOT_EMPTY) {
          if (!empty($thePost)) return $thePost;
        }
      } else {
        return $thePost;
      }
    }
  }
  return $fallback;
}

/**
 * Check if request method is post
 *
 * @return boolean
 */
function isPost()
{
  return isRequest('post');
}

/**
 * Check request method
 *
 * @param string $methodName
 * @return boolean
 */
function isRequest(string $methodName)
{
  return $_SERVER['REQUEST_METHOD'] == strtoupper($methodName);
}

/**
 * Get request value by name ($_REQUEST)
 */
function getRequest(string $requestName)
{
  if (isset($_REQUEST[$requestName])) {
    return $_REQUEST[$requestName];
  }
  return null;
}
