<?php
if (!isLocalhost()) {
  reCaptcha();
}
sess('title', 'Article Process');
