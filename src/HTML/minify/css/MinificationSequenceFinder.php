<?php

namespace HTML\minify\css;

abstract class MinificationSequenceFinder
{
    public $start_idx;
    public $end_idx;
    public $type;

    public function isValid()
    {
        return false !== $this->start_idx;
    }

    abstract protected function findFirstValue($string);
}
