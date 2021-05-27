<?php

user()->check_login(function ($session) {
  e($session);
});
