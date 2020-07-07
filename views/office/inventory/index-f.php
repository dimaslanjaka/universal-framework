<?php
theme()->label('warehouse');

$can = user()->can('inventory');
$office = office();
$list = $office->warehouse->list();
