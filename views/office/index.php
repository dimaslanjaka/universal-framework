<?php
$office = office();
$list = $office->user->getOffices();

foreach ($list as $offc) {
  echo $offc;
}
