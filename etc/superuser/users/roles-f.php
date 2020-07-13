<?php

user()->admin_required('/user/login');

if (user()->is_admin()) {
  if (isset($_REQUEST['getAccess'])) {
    e(user()->access()->get_managed_access());
  }

  if ('POST' == $_SERVER['REQUEST_METHOD']) {
    if (isset($_POST['userdata'])) {
      if (isset($_POST['userdata']['role'])) {
        $Roles = array_merge(['superadmin'], array_values(array_filter($_POST['userdata']['role'])));
        $modify = \DB\schema::modify_enumset_values(pdo(), 'userdata', 'role', $Roles);
        if (isset($modify['error'])) {
          if (!$modify['error']) {
            $modify['message'] = 'User role updated successfully';
            $modify['reload'] = 1;
          } else {
            $modify['message'] = 'User role update failed';
          }
        }

        e($modify);
      }
    }
    if (isset($_POST['access'])) {
      if (!empty($_POST['access'])) {
        //e($_POST['access']);
        $data = array_unique_recursive($_POST['access']);

        $save = user()->access()->save($data);
        $return = ['title' => 'Access Management', 'error' => !$save];
        if ($save) {
          $return['message'] = 'Access configuration saved successfully';
        } else {
          $return['message'] = 'Access configuration save failed';
        }
        $return['reload'] = 1;
        e($return);
      }
    }
  }
}
