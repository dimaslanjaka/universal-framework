<?php

$inventory = new \Office\loader(pdo());
$list = $inventory->warehouse->list();
//$inventory->set_instance(user());
//e($inventory->user->is_login(), $_SESSION['login']);
