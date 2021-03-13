<?php
class AGCPU
{
  function check()
  {
    if (!function_exists('sys_getloadavg')) {
      function sys_getloadavg()
      {
        $loadavg_file = '/proc/loadavg';
        if (file_exists($loadavg_file)) {
          return explode(chr(32), file_get_contents($loadavg_file));
        }
        return array(0, 0, 0);
      }
    }
    $load = sys_getloadavg();
    $limit = 50; //percent cpu
    if ($load[0] >= $limit) {
      die("Oops Server Busy, this message was automate from Dimas Lanjaka For telling users, there too many processed.");
    }
  }
}
