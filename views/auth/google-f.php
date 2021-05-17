<?php

$google = $client = new GoogleExt\client();
$google->auto_login('/auth/google');

/*
$access = $google->userdata();
if ($google->isValid()) {
    $access = $google->fetch_user();
}
$authUrl = $google->createAuthUrl();
if (isset($_REQUEST['info'])) {
    e(['auth' => $authUrl, 'credential' => $access]);
}
*/

//e(CONFIG['google']);
