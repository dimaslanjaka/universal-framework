<?php

if (!user()->is_admin()) {
    safe_redirect('/');
}

if (isset($_REQUEST['coupon'])) {
    $result = ['title' => 'Coupon modificator'];
    if (user()->is_admin()) {
        if (isset($_REQUEST['limit'])) {
            $limit = $_REQUEST['limit'];
            settype($limit, 'integer');
            $coupon = isset($_REQUEST['coupon']) ? $_REQUEST['coupon'] : null;
            if (null !== $coupon) {
                $save = pdo()->update('coupon', ['limit' => $limit], ['code' => $coupon])->exec();
                if (!$save['error']) {
                    $save['message'] = "$coupon was modified limit for $limit successfully";
                }
                $result = array_replace($result, $save);
            }
        }
    }
    e($result);
}
