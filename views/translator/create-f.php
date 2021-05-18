<?php

if (isset($_POST['new'])) {
    $body = $_POST['body'];
    $title = $_POST['title'];
    /**
     * Source Language
     */
    $sourceLang = $_POST['sl'];
    $toLang = $_POST['tl'];
    $cacheJson = ROOT . '/tmp/translator/' . md5($title) . '.json';
    $cacheHtml = ROOT . '/tmp/translator/' . md5($title) . '.html';
    $content = <<<HTML
<div id="agc-wrapper">
    <h2 id="agc-title">$title</h2>
    <div id="agc-body">$body</div>
</div>
HTML;
    e($_POST);
}
