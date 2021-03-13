<?php

if (isset($_r['set-session'])) {
  if (isset($_r['set-session']['key']) && isset($_r['set-session']['value'])) {
    if (!is_array($_r['set-session']['key']) && !is_array($_r['set-session']['value'])) {
      $_SESSION[$_r['set-session']['key']] = $_r['set-session']['value'];
    } else {
      for ($i = 0; $i < count($_r['set-session']['key']); ++$i) {
        $_SESSION[$_r['set-session']['key'][$i]] = $_r['set-session']['value'][$i];
      }
    }
  }
}
