<?php
if (!headers_sent()) {
  header('Content-Type: text/html');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="apple-touch-icon" type="image/png" href="https://static.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png" />
  <meta name="apple-mobile-web-app-title" content="CodePen">
  <link rel="shortcut icon" type="image/x-icon" href="https://static.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico" />
  <link rel="mask-icon" type="" href="https://static.codepen.io/assets/favicon/logo-pin-8f3771b1072e3c38bd662872f6b673a722f4b3ca2421637d5596661b4e2132cc.svg" color="#111" />
  <title><?= $title; ?></title>
  <script src="https://use.fontawesome.com/faba194bed.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <style>
    @import url("https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,400i,600,700");

    *,
    :after,
    :before {
      box-sizing: border-box;
      word-wrap: break-word;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    body {
      font: normal 16px/1.2 'Josefin Sans', sans-serif;
      background: #efedff;
    }

    pre {
      white-space: pre-wrap;
      /* Since CSS 2.1 */
      white-space: -moz-pre-wrap;
      /* Mozilla, since 1999 */
      white-space: -pre-wrap;
      /* Opera 4-6 */
      white-space: -o-pre-wrap;
      /* Opera 7 */
      word-wrap: break-word;
      /* Internet Explorer 5.5+ */
    }

    .title {
      font-weight: normal;
      margin: 0 0 30px;
      text-align: center;
    }

    .section {
      padding: 50px 0;
    }

    .section .alert:not(:first-child) {
      margin-top: 15px;
    }

    .alert {
      background-color: #29d2e4;
      border: 1px solid #29d2e4;
      color: #fff;
      padding: 15px 20px;
    }

    .alert .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert .close-icon:before,
    .alert .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .alert.alert-custom {
      background-color: #66615B;
      border: 1px solid #66615B;
    }

    .alert.alert-custom .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert.alert-custom .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert.alert-custom .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert.alert-custom .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert.alert-custom .close-icon:before,
    .alert.alert-custom .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert.alert-custom .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert.alert-custom .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .alert.alert-info {
      background-color: #29d2e4;
      border: 1px solid #29d2e4;
    }

    .alert.alert-info .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert.alert-info .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert.alert-info .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert.alert-info .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert.alert-info .close-icon:before,
    .alert.alert-info .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert.alert-info .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert.alert-info .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .alert.alert-success {
      background-color: #8bc34a;
      border: 1px solid #8bc34a;
    }

    .alert.alert-success .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert.alert-success .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert.alert-success .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert.alert-success .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert.alert-success .close-icon:before,
    .alert.alert-success .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert.alert-success .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert.alert-success .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .alert.alert-warning {
      background-color: #f87d09;
      border: 1px solid #f87d09;
    }

    .alert.alert-warning .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert.alert-warning .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert.alert-warning .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert.alert-warning .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert.alert-warning .close-icon:before,
    .alert.alert-warning .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert.alert-warning .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert.alert-warning .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .alert.alert-danger {
      background-color: #e91e63;
      border: 1px solid #e91e63;
    }

    .alert.alert-danger .alert-icon {
      float: left;
      margin-right: 15px;
    }

    .alert.alert-danger .alert-info {
      margin: 0 10px 0 0;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 14px;
    }

    .alert.alert-danger .alert-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .alert.alert-danger .close-icon {
      float: right;
      color: #000;
      margin-top: 0;
      margin-left: 0;
      width: 21px;
      height: 21px;
      position: relative;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      text-indent: -999px;
      overflow: hidden;
      white-space: nowrap;
    }

    .alert.alert-danger .close-icon:before,
    .alert.alert-danger .close-icon:after {
      content: '';
      position: absolute;
      top: 8px;
      width: 15px;
      height: 2px;
      left: 0;
    }

    .alert.alert-danger .close-icon:before {
      background-color: #fff;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .alert.alert-danger .close-icon:after {
      background-color: #fff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .d-none {
      display: none;
    }
  </style>
  <script>
    window.console = window.console || function(t) {};
  </script>
  <script>
    if (document.location.search.match(/type=embed/gi)) {
      window.parent.postMessage("resize", "*");
    }
  </script>
</head>

<body translate="no">
  <section class="section alert-section">
    <h2 class="title"><?= $title; ?></h2>
    <div class="alert alert-custom d-none">
      <div class="alert-container">
        <div class="alert-icon">
          <i class="fa fa-warning"></i>
        </div>
        <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
          <span>clear</span>
        </button>
        <b class="alert-info">Custom alert:</b> You've got some error prepare for it...
      </div>
    </div>
    <div class="alert alert-info d-none">
      <div class="alert-container">
        <div class="alert-icon">
          <i class="fa fa-info-circle"></i>
        </div>
        <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
          <span>clear</span>
        </button>
        <b class="alert-info">Info alert:</b> You've got some friends nearby, stop looking at your phone and find
        them...
      </div>
    </div>
    <div class="alert alert-success d-none">
      <div class="alert-container">
        <div class="alert-icon">
          <i class="fa fa-check"></i>
        </div>
        <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
          <span>clear</span>
        </button>
        <b class="alert-info">Success alert:</b> Yuhuuu! You've got your $11.99 album from The Weeknd
      </div>
    </div>
    <div class="alert alert-warning d-none">
      <div class="alert-container">
        <div class="alert-icon">
          <i class="fa fa-warning"></i>
        </div>
        <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
          <span>clear</span>
        </button>
        <b class="alert-info">Warning alert:</b> Hey, it looks like you still have the "copyright © 2015" in your
        footer. Please update it!
      </div>
    </div>
    <div class="alert alert-danger">
      <div class="alert-container">
        <div class="alert-icon">
          <i class="fa fa-info-circle"></i>
        </div>
        <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
          <span>clear</span>
        </button>
        <b class="alert-info"><?= $title; ?>:</b> <?= $desc; ?>
      </div>
    </div>
  </section>
</body>

</html>