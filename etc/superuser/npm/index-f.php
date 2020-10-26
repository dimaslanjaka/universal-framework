<?php
if (!user()->is_admin()){
  safe_redirect('/');
}