<?php

namespace Office\inventory\warehouse;

class config
{
    public function __construct($warehouseName)
    {
        $config = \Filemanager\file::get(__DIR__ . '/config/' . $warehouseName . '.json', true);
    }
}
