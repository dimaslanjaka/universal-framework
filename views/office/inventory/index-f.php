<?php

$can = user()->can('inventory');
$office = office();
$list = $office->warehouse->list();
