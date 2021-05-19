<?php

namespace MVC;

class Exception extends \Exception
{
  // Redefine the exception so message isn't optional
  public function __construct($message, $code = 0, Exception $previous = null)
  {
    // some code
    // make sure everything is assigned properly
    parent::__construct($this->generateCallTrace(), $code, $previous);
  }

  // custom string representation of object

  public function generateCallTrace()
  {
    $e = new \Exception();
    $trace = explode("\n", $e->getTraceAsString());
    // reverse array to make steps line up chronologically
    $trace = array_reverse($trace);
    array_shift($trace); // remove {main}
        array_pop($trace); // remove call to this method
        $length = count($trace);
    $result = [];

    for ($i = 0; $i < $length; ++$i) {
      $result[] = ($i + 1) . ')' . substr($trace[$i], strpos($trace[$i], ' ')); // replace '#someNum' with '$i)', set the right ordering
    }

    return nl2br("\t" . implode("\n\t", $result) . "\n\n" . $this->debug_string_backtrace());
  }

  public function debug_string_backtrace()
  {
    if (ob_get_level()) {
      ob_get_clean();
    }
    ob_start();

    echo "debug_print_backtrace:\n\n ";
    debug_print_backtrace();
    echo "\n\n";
    if ($this->is_admin() || isset($_REQUEST['dbg'])) {
      echo "debug_backtrace (administrator only): \n\n ";
      echo '<pre>';
      var_dump(debug_backtrace());
      echo '</pre>';
    }

    $trace = ob_get_contents();
    ob_end_clean();

    // Remove first item from backtrace as it's this function which
    // is redundant.
    //$trace = preg_replace('/^#0\s+' . __FUNCTION__ . "[^\n]*\n/", '', $trace, 1);

    // Renumber backtrace items.
    //$trace = preg_replace('/^#(\d+)/me', '\'#\' . ($1 - 1)', $trace);

    return $trace;
  }

  public function is_admin()
  {
    return is_admin();
  }

  public function __toString()
  {
    return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
  }
}
