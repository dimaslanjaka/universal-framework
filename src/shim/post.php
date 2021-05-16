<?php

const POST_DEFAULT_FLAG = 0;
const POST_NOT_EMPTY = 1;
const POST_NOT_NULL = 2;

/**
 * Post getter.
 * Get post data with fallback value.
 *
 * @param string $fallback
 * @param int $flag flag rule for post getter
 *
 * @return void
 */
function getPost($name, $fallback = null, $flag = POST_DEFAULT_FLAG)
{
    if (isPost()) {
        if (isset($_POST[$name])) {
            $thePost = $_POST[$name];
            if (POST_DEFAULT_FLAG != $flag) {
                if (POST_NOT_NULL == $flag) {
                    if (null != $thePost) {
                        return $thePost;
                    }
                } elseif (POST_NOT_EMPTY == $flag) {
                    if (!empty($thePost)) {
                        return $thePost;
                    }
                }
            } else {
                return $thePost;
            }
        }
    }

    return $fallback;
}

/**
 * Check if request method is post.
 *
 * @return bool
 */
function isPost()
{
    return isRequest('post');
}

/**
 * Check request method.
 *
 * @return bool
 */
function isRequest($methodName)
{
    return $_SERVER['REQUEST_METHOD'] == strtoupper($methodName);
}

/**
 * Get request value by name ($_REQUEST).
 */
function getRequest($requestName)
{
    if (isset($_REQUEST[$requestName])) {
        return $_REQUEST[$requestName];
    }

    return null;
}
