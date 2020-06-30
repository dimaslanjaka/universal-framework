<?php

$google = new Google\client();
$google->setCredentials(
    CONFIG['google']['client'],
    CONFIG['google']['secret'],
    CONFIG['google']['key']
);
$google->set_offline(true);
$google->set_scope([
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]);
$google->setRedirectUri($google->getOrigin('/auth/google'));
$google->auto_login();

$access = $google->userdata();
if ($google->isValid()) {
    $access = $google->fetch_user();
}
$authUrl = $google->createAuthUrl();
if (isset($_REQUEST['info'])) {
    e(['auth' => $authUrl, 'credential' => $access]);
}

//e(CONFIG['google']);
