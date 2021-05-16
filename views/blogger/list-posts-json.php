<?php

use JSON\json;

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
$service->recrawl = isset($_REQUEST['refresh']);
$posts = $service->getPosts();
$offset = isset($_REQUEST['start-index']) ? $_REQUEST['start-index'] : 0;
$per_page = isset($_REQUEST['max-results']) ? $_REQUEST['max-results'] : 10;
json::json([
    'next' => "/blogger/" . basename(__FILE__, '.php') . "?" . http_build_query([
            'start-index' => $offset + $per_page + 1,
            'max-results' => $per_page
        ]),
    'items' => array_slice($posts, $offset, $per_page)
]);
