<?php

function cors()
{
  //header('Content-type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if ('xmlhttprequest' != strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])) {
      return __LINE__ . false;
    }
  }
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Expose-Headers: date,content-type,transfer-encoding,connection,access-control-allow-origin,server,x-xss-protection,x-content-type-options,x-request-id,content-encoding,x-final-url');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    if (isset($_SERVER['HTTP_REFERER'])) {
      $parseRef = parse_url($_SERVER['HTTP_REFERER']);
      $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
      if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
        return __LINE__ . false;
      }
      if ($parseOri['host'] != $parseRef['host']) {
        return __LINE__ . false;
      }
    } else {
      return __LINE__ . false;
    }
  }
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    // may also be using PUT, PATCH, HEAD etc
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  }

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  } else {
    header("Access-Control-Allow-Headers: X-Requested-With");
  }

  return isset($_SERVER['HTTP_ACCEPT']) && isset($_SERVER['HTTP_ORIGIN']) && isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['HTTP_ACCEPT_ENCODING']) && isset($_SERVER['CONTENT_TYPE']) && isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && isset($_SERVER['HTTP_USER_AGENT']) && isset($_SERVER['UNIQUE_ID']);
}

var_dump(cors(), $_SERVER);
