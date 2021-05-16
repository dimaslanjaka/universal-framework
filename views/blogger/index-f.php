<?php

if (isset($_POST['set-blog'])) {
    $blog = trim($_POST['set-blog']);
    $setBlog['title'] = 'Blogger';
    if (is_url($blog)) {
        $_SESSION['blogger']['url'] = $blog;
        $setBlog['error'] = false;
        $setBlog['message'] = 'Blog url set successful';
    } else {
        $setBlog['error'] = true;
        $setBlog['message'] = 'Blog url invalid';
    }
    e($setBlog);
}
