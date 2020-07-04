<?php

namespace Office\inventory\warehouse;

class config
{
  public function __construct(string $warehouseName)
  {
    $config = \Filemanager\file::get(__DIR__ . '/config/' . $warehouseName . '.json', true);
  }
}
