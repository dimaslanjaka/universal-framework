<?php

if (!user()->is_admin()) {
  exit(header('Location: /'));
}
