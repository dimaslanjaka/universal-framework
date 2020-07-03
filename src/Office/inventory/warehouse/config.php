<?php

namespace Office\inventory\warehouse;

class config
{

  function __construct(string $warehouseName)
  {
    $config = \Filemanager\file::get(__DIR__ . '/config/' . $warehouseName . '.json', true);
  }
}
