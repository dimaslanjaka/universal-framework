<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>DDoS protection | WMI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <style type="text/css">
    html,
    body,
    table {
      width: 100%;
      height: 100%;
    }

    .info {
      height: 100%;
      text-align: center;
      vertical-align: top;
      padding-top: 5em;
    }

    .sign {
      color: #ccc;
    }

    .sign a {
      color: #ccc;
    }

    .container {
      margin-top: 200px;
      max-width: 450px;
      text-align: center;
      padding: 10px;
      padding-top: 25px;
      background: white;
      transition: all 0.4s;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.45);
      transform: scale(1);
    }

    .container:hover {
      transition: all 0.4s;
      box-shadow: 0 8px 11px rgba(0, 0, 0, 0.5);
      transform: scale(1.2);
    }

    body {
      background: rgba(230, 230, 230, 0.5);
    }

    * {
      word-wrap: break-word;
      max-width: 100%;
    }
  </style>
</head>

<body>
  <div class="info">
    <h5>DDoS protection is activated for your IP <a rel="nofollow noopener" href="http://ip-api.com/json/<?= $remote_ip ?>" target="_new"><?= $remote_ip ?></a></h5>
    <p>Please click bellow to pass protection,</p>
    <a href='<?= \MVC\helper::geturl() ?>'>
      <?= \MVC\helper::geturl() ?>
    </a>


    <p>Or you will be automatically redirected to the requested page after <int id="reftime"><?= $redirect_delay ?></int> seconds.</p>
    <div id="js_info" style="margin-top: 5px">
      <p>To <u>continue working</u> with web-site, please make sure that you have <u>enabled JavaScript</u>.</p>
    </div>
  </div>

  <footer>
    <center>
      <div class="container">
        <a href="https://github.com/dimaslanjaka">
          <img src="https://avatars1.githubusercontent.com/u/12471057?s=400&v=4" style="border-radius: 100%;width:200px;"><br>
          Dimas Lanjaka Github
        </a>
        <h1>Author</h1>
        <p class="sign">
          DDoS protection by <span style="color: #49C73B;">W</span><span style="color: #349EBF;">M</span><span style="color: rgb(185, 8, 23);">I</span><br />
          <a href="mailto:dimaslanjaka@gmail.com">dimaslanjaka@gmail.com</a>
          <noscript>Please enable Javascript to see the requested page.</noscript>
        </p>
      </div>
    </center>
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script type="text/javascript">
    //document.getElementById('js_info').style.display = 'none';
    var date = new Date();
    var days = parseInt('<?= $secure_cookie_days ?>');
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var cookie_name = '<?= $secure_cookie_label ?>';
    var cookie_value = '<?= $secure_cookie_key ?>';

    document.cookie = cookie_name + "=" + escape(cookie_value) + "; expires = " + date.toGMTString() + "; path=/";

    var timeleft = parseInt('<?= $redirect_delay ?>');
    var display = document.querySelector('#reftime');
    startTimer(timeleft, display, function() {
      window.location.reload(1);
    });

    function startTimer(duration, display, callback) {
      if (!display) {
        return;
      }

      var timer = duration,
        minutes, seconds;
      var countdown = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          if (typeof callback == 'function') {
            callback();
          }
          clearInterval(countdown);
        }
      }, 1000);
    }
  </script>
</body>

</html>