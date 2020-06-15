<?php

if (!user()->is_admin()) {
  redirect('/im3');
}
