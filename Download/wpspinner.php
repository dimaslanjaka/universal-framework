<?php
//#cURL
$hasilcURL = shell_exec('curl http://l3n4r0x.gq/?wp_auto_spinner=cron');
echo "<pre>$hasilcURL</pre>";
//#wGET
$hasilwget = shell_exec('wget -O /dev/null http://l3n4r0x.gq/?wp_auto_spinner=cron');
echo "<pre>$hasilwget</pre>";
//#Set Perm
$perm = shell_exec('chmod 777 ./wpspinner.php');
echo "<pre>$perm</pre>";

?>