<?php

user()->admin_required('/user/login');

if (user()->is_admin()) {

  if (isset($_REQUEST['getAccess'])) {
    e(user()->access()->get_managed_access());
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
