<?php

namespace MVC;

use JSON\json;

class uid
{
  public static function verifyUID()
  {
    $last_body = self::removeLastCache();
    //ksort($_SERVER);
    //var_dump(isset($_SERVER['HTTP_UNIQUE_ID']), $_SERVER);
    if (isset($_SERVER['HTTP_UNIQUE_ID'])) {
      if (!isset($_SESSION['uid'])) {
        json::json([
          'error' => true,
          'message' => 'Undefined session request',
          'title' => 'UID Sess',
          'last_body' => $last_body,
        ]);
        exit;
      }
      if ($_SESSION['uid'] != $_SERVER['HTTP_UNIQUE_ID']) {
        json::json([
          'error' => true,
          'message' => 'Undefined request',
          'title' => 'Network',
          'last_body' => $last_body,
        ]);
        exit;
      }
    }
  }

  public static function removeLastCache()
  {
    $last_body = '';
    if (headers_sent()) {
      if (ob_get_level()) {
        $last_body = ob_end_clean();
        ob_start();
      }
    }

    return $last_body;
  }

  public static function checkRequestUID($header_name, $regen_session_timeout = 60)
  {
    //var_dump(\MVC\helper::cors(true));
    if (\MVC\helper::cors()) {
      self::receiveUID($header_name, $regen_session_timeout);
    }
    //var_dump($_SERVER);
  }

  public static function receiveUID($header_name, $regen_session_timeout = 60)
  {
    if (isset($_REQUEST[$header_name]) || isset($_SERVER['HTTP_UID_SIGN'])) {
      header('Content-Type: application/javascript');
      if (!isset($_SESSION['timer_start'])) {
        $_SESSION['timer_start'] = time();
      }
      $res['ago'] = time() - $_SESSION['timer_start'];
      $res['dif'] = 30 * 60; // 1800 secs / 30 mins
      $res['left'] = $res['ago'] < $res['dif'];
      if ($res['ago'] > $regen_session_timeout * 60) {
        // if session timer more than $regen_session_timeout minutes, regenerate session
                //session_regenerate_id(session_id());
      }
      if (isset($_REQUEST['check_file_session'])) {
        $session_path = session_save_path() . '/sess_' . session_id();
        $session_time = fileatime($session_path);
        $res['secs'] = (time() - $session_time);
        $res['path'] = realpath($session_path);
      }
      $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : null;
      $array = $_REQUEST;
      if ($uid) {
        $_SESSION['uid'] = $uid;
        $array = [
          'uid' => $uid,
        ];
      }
      if (isset($_REQUEST['callback'])) {
        //header('Content-Type: application/json');

        echo $_REQUEST['callback'] . '(' . json_encode($array) . ')';
        exit;
      }
    }
  }

  public static function include_uid_js()
  {
    if (!isset($_SESSION['uid'])) {
      echo 'var UIDForce = true;';
    }
    helper::include_asset(__DIR__ . '/themes/assets/js/uid.min.js', __DIR__ . '/themes/assets/js/uid.js');
  }
}
