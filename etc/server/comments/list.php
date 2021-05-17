<?php

$list = pdo()->select('comments')->row_array();
if (!\ArrayHelper\helper::isSequent($list)) {
    $list = [$list];
}
e($list);
