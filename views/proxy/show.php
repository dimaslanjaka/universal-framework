<?php
$proxies = pdo()->select('proxies')->where(['status' => 'active'])->row_array();
\JSON\json::json($proxies);
