<?php

header("Content-type: application/json");
$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);
$blogUrl = 'https://web-manajemen.blogspot.com';
if (isset($_SESSION['blogger']['url'])) {
    $blogUrl = $_SESSION['blogger']['url'];
} else {
    e(['error' => true, 'message' => 'Blog url empty']);
}
$blog = $service->byUrl($blogUrl);
$blogId = $blog->getId();
$posts = $service->getPosts();
