<?php

$GLOBALS['globals'] = [];

/**
 * Global major manipulator.
 */
class globals
{
    private static $init = null;
    private $name = '';

    public function __construct($name, $value)
    {
        $this->name = $name;
        $GLOBALS[$name] = $value;
        if (!self::$init) {
            self::$init = new self($name, $value);
        }
    }

    public static function init($name, $value)
    {
        if (!self::$init) {
            self::$init = new self($name, $value);
        }

        return self::$init;
    }

    public function once($key, $value)
    {
        if (!$this->has($key)) {
            $this->set($key, $value);
        }

        return $this;
    }

    public function has($key)
    {
        return isset($GLOBALS[$this->name][$key]);
    }

    public function set($key, $value)
    {
        $GLOBALS[$this->name][$key] = $value;
    }

    public function get($key)
    {
        if ($this->has($key)) {
            return $GLOBALS[$this->name][$key];
        }
    }
}
