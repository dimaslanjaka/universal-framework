<?php

$pr = new Proxy();
$pr->add_default(2);
$pr->getProxies(true);
$pr->unique();
$pr->check();
