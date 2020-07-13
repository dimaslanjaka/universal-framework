<?php
user()->admin_required('/user/login');

if (user()->is_admin()) {
  if (isset($_REQUEST['getAccess'])) {
    e(user()->access()->get_managed_access());
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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
        $save = user()->access()->save($_POST['access']);
        $return = ['title' => 'Access Management', 'error' => !$save];
        if ($save) {
          $return['message'] = 'Access configuration saved successfully';
        } else {
          $return['message'] = 'Access configuration save failed';
        }
        e($return);
      }
    }
  }
}
