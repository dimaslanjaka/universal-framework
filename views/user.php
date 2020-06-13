<?php

use JSON\json;

$user = user();
$result = [
  'error' => true,
  'message' => ucwords('undefined user action request'),
  'title' => strtoupper('User database area'),
];
if ($user->is_login()) {
  user()->update_last_seen();
  if (isset($_REQUEST['change'])) {
    if ('password' == $_REQUEST['change']) {
      if (isset($_REQUEST['value']) && !empty($_REQUEST['value']) && isset($_REQUEST['id'])) {
        $result = $user->update_password($_REQUEST['id'], $_REQUEST['value']);
      }
    } elseif ('role' == $_REQUEST['change']) {
      if (isset($_REQUEST['value']) && !empty($_REQUEST['value']) && isset($_REQUEST['id'])) {
        $result = $user->update_role($_REQUEST['id'], $_REQUEST['value']);
      }
    }
  }
  if ($user->is_admin()) {
    if (isset($_REQUEST['delete']) && !empty($_REQUEST['id']) && isset($_REQUEST['id'])) {
      $result = $user->delete_user_by_id($_REQUEST['id']);
    }
  }
  if (isset($_REQUEST['check'])) {
    if (isset($_REQUEST['user'])) {
      $result['title'] = 'USER LOGIN INFORMATION';
      $result['error'] = !user()->is_login();
      if (user()->is_login()) {
        $result['state'] = 'login';
        $result['message'] = 'user still login';
      } else {
        $result['state'] = 'logout';
        $result['message'] = 'user has been logout';
      }

      $result = array_merge($result, user()->userdata('all'));

      exit(json::json($result));
    }
    if (isset($_REQUEST['simcard'])) {
      $result['title'] = 'SIMCARD LOGIN INFORMATION';
      $result['error'] = !isset($_SESSION['access_token']);
      if (isset($_SESSION['access_token'])) {
        $result['state'] = 'login';
        $result['message'] = 'simcard still login';
      } else {
        $result['state'] = 'logout';
        $result['message'] = 'simcard has been logout';
      }

      return json::json($result);
    }

    return json::json($result);
  }
  if (isset($_REQUEST['history'])) {
    $result = [];
    $history = pdo()->select('history')->where([
      'username' => user()->userdata('username'),
    ])->sort(['date'], 'DESC')->row_array();
    if (!\ArrayHelper\helper::isSequent($history)) {
      $result[] = $history;
    } else {
      $result = $history;
    }
    for ($i = 0; $i < count($result); ++$i) {
      if (isset($result[$i]['pid'])) {
        $pid = $result[$i]['pid'];
        unset($result[$i]['pid']);
        $pkg_info = pdo()->select('pkg')->where(['code' => $pid])->row_array();
        $pkg_info = \ArrayHelper\helper::get($pkg_info, ['name', 'quota', 'price']);
        if (isset($pkg_info['name'])) {
          $result[$i]['name'] = $pkg_info['name'];
        }
        $result[$i] = array_merge($result[$i], $pkg_info);
      }
    }
  }
  if (isset($_REQUEST['status'])) {
    $users = user()->getUsers();
    foreach ($users as $user) {
      $user = \ArrayHelper\helper::unset($user, ['password', 'number', 'role']);
      if ($user['id'] == user()->userdata('id') && !isset($_REQUEST['all'])) {
        continue;
      }
      $last_login = strtotime($user['last_login']);
      $last_seen = strtotime($user['last_seen']);
      $user['status']['diff'] = abs($last_seen - time()) / 60;
      $user['status']['text'] = $user['status']['diff'] < 2 ? 'Online' : 'Offline';
      $user['status']['last_online'] = round($user['status']['diff']) . ' mins ago';
      $result['users'][] = $user;
    }
  }
  $result = \ArrayHelper\helper::unset($result, ['error', 'message', 'title']);
}

return json::json($result);
