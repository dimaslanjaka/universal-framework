<?php
user()->admin_required('/user/login');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (user()->is_admin()) {
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
  }
}

/*
$read = \Filemanager\scan::scandir(ROOT . '/views');
$flist = [];
foreach ($read as $files) {
  $flist[] = \MVC\helper::get_url_path($files['path']);
}

e($flist);
*/