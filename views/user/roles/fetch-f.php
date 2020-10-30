<?php

$result = [];
$result = pdo()->get_enum_set_values('roles', 'allow');
\JSON\json::json($result);
exit;
