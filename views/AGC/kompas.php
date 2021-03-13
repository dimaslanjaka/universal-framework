<?php
//https://www.kompas.com/tag/e-commerce

$agc = new gtrans();
$curl = $agc->cURL(false);
$homepage = 'https://www.kompas.com';
$parse_url = parse_url($homepage);
$paths = '/^\/tag\//m';