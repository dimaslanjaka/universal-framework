<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="apple-touch-icon" type="image/png" href="https://static.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png" />
  <meta name="apple-mobile-web-app-title" content="CodePen">
  <link rel="shortcut icon" type="image/x-icon" href="https://static.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico" />
  <link rel="mask-icon" type="" href="https://static.codepen.io/assets/favicon/logo-pin-8f3771b1072e3c38bd662872f6b673a722f4b3ca2421637d5596661b4e2132cc.svg" color="#111" />
  <title>CodePen - Bootstrap 4 Contact Form</title>
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
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <body>
    <section class="resume-section p-4 p-lg-5 text-center" id="contact">
      <div class="my-auto">
        <h2 class="mb-4">PHP Mailer</h2>

        <form class="contact-form d-flex flex-column align-items-center" action="<?= (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}/mail.php" ?>" method="POST">
          <div class="form-group w-75">
            <input type="name" class="form-control" placeholder="Subject Email" name="subject" required />
          </div>
          <div class="form-group w-75">
            <input type="email" class="form-control" placeholder="To Email" name="to" value="lukman.fun1@gmail.com" required />
          </div>
          <div class="form-group w-75">
            <input type="email" class="form-control" placeholder="From Email" name="from" value="dimaslanjaka@gmail.com" required />
          </div>
          <div class="form-group w-75">
            <textarea class="form-control" type="text" placeholder="Message" rows="7" name="body" required></textarea>
          </div>
          <button type="submit" class="btn btn-submit btn-info w-75">Submit</button>
        </form>
      </div>
    </section>
    <script defer src="https://use.fontawesome.com/releases/v5.7.2/js/all.js" integrity="sha384-0pzryjIRos8mFBWMzSSZApWtPl/5++eIfzYmTgBBmXYdhvxPc+XcFEk+zJwDgWbP" crossorigin="anonymous"></script>
  </body>
</body>

</html>