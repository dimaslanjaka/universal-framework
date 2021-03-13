<?php

if (isreq('key') && isreq('val')) {
  sess(isreq('key'), isreq('val'));
}

$core->dump($_SESSION);
