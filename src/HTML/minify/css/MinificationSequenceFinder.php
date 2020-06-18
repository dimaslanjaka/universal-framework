<?php

namespace HTML\minify\css;

abstract class MinificationSequenceFinder
{
  public $start_idx;
  public $end_idx;
  public $type;
  abstract protected function findFirstValue($string);
  public function isValid()
  {
    return $this->start_idx !== false;
  }
}
