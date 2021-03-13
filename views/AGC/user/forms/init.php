<?php

$userdata = wp_get_current_user();
unset($userdata->data->user_login, $userdata->data->user_pass, $userdata->data->user_nicename);
$usermeta = get_user_meta(get_current_user_id());
unset($usermeta->session_tokens);
$isAdmin = is_user_logged_in() && current_user_can('administrator');
