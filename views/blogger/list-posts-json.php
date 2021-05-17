<?php

use JSON\json;

header("Content-type: application/json");
$requestData = $_REQUEST;
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
$blogId = $service->blogId;
$service->recrawl = isset($requestData['refresh-index']);
$posts = $service->getPosts();
$totalData = count($posts);
$totalFiltered = $totalData;

if (isset($requestData['search']['value'])) {
    $searchKeyWord = htmlspecialchars($requestData['search']['value']);
    if (!empty($searchKeyWord)) {
        //$query = mysqli_query($conn, $sql);
        //$totalFiltered = mysqli_num_rows($query);
    }
}

if (!isset($requestData['all'])) {
    $offset = isset($requestData['start-index']) ? $requestData['start-index'] : 0;
    $per_page = isset($requestData['max-results']) ? $requestData['max-results'] : 10;
    json::json([
        'next' => "/blogger/" . basename(__FILE__, '.php') . "?" . http_build_query([
                'start-index' => $offset + $per_page + 1,
                'max-results' => $per_page
            ]),
        "recordsTotal" => intval($totalData), "recordsFiltered" => intval($totalFiltered),
        'data' => array_slice($posts, $offset, $per_page)
    ]);
} else {
    json::json([
        "recordsTotal" => intval($totalData), "recordsFiltered" => intval($totalFiltered),
        'data' => $posts
    ]);
}
