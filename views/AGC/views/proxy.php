<title>Choose Proxy</title>
<?php
  echo '<meta name="description" content="' . (isset($_SESSION['last_page']) ? $_SESSION['last_page'] : 'Set Proxy') . '"/>';
  ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * {
    word-wrap: break-word
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<!--div id="login"-->
<div class="login-card">

  <div class="card-title">
    <h1>input your proxy</h1>
    <center><small>scroll to bottom, for the available proxy</small></center>
  </div>

  <div class="content">
    <form method="POST" action="#">

      <input id="email" type="text" name="proxy" title="proxy" placeholder="xxx.xxx.xxx.xxx:xxx" required>
      <!--input id="password" type="password" name="password" title="password" placeholder="Password" required>

        <!--div class="level options">
          <div class="checkbox level-left">
            <input type="checkbox" id="checkbox" class="regular-checkbox">
            <label for="checkbox"></label>
            <span>Remember me</span>
          </div>

          <a class="btn btn-link level-right" href="#">Forgot Password?</a>
        </div-->

      <button type="submit" class="btn btn-primary">Set Proxy</button>
    </form>
  </div>
</div>
<!--/div-->
<div class="container text-center">
  <center>
    <h4>Proxy</h4>
    <img id="loading" src="https://martjackassests.azureedge.net/css/themes/mjt02012505/images/main/show_loader.gif" />
    <textarea cols="30" rows="50" id="ajax" readonly wrap></textarea>
  </center>
</div>
<script>
  $.ajax({
    url: "proxy_init.php",
    type: "GET",
    cache: true,
    beforeSend: function() {
      $("#loading").show();
    },
    complete: function() {
      $("#loading").hide();
    },
    success: function(data) {
      $("#ajax").html(data);
    },
    error: function(data) {
      $("#ajax").html("Error Parsing " + data);
    }
  });
  $.ajax({
    url: "proxy_init.php",
    type: "POST",
    dataType: "text",
    data: {
      clean: 123,
      clean: "abc"
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    cache: true
  });
</script>

<link
  href="https://fonts.googleapis.com/css?family=Barlow+Condensed|Bellefair|Encode+Sans+Condensed|Lato|Roboto|Roboto+Condensed|Ubuntu+Condensed"
  rel="stylesheet" />
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css' />
<style class="cp-pen-styles">
  :root {
    --main-bg-color: #F7F7F7;
    --card-bg-color: #00b89c;
    /*--main-gradient : linear-gradient(direction, color-stop1, color-stop2);*/
  }

  textarea {
    border: 0
  }

  html {
    height: 100%;
    width: 100%
  }

  /*
  font-family: 'Bellefair', serif;
font-family: 'Lato', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Roboto Condensed', sans-serif;
font-family: 'Ubuntu Condensed', sans-serif;
font-family: 'Encode Sans Condensed', sans-serif;
font-family: 'Barlow Condensed', sans-serif;
  */
  * {
    max-width: 100%;
    font-family: 'Encode Sans Condensed', sans-serif;
  }

  #login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--main-bg-color);
  }

  #login,
  .login-card {
    background: #fff;
    width: 24rem;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    /*
  max-width: 10000vh;
  max-height: 100vh;*/
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);
  }

  #login,
  .login-card .card-title {
    background-color: var(--card-bg-color);
    padding: 2rem;
  }

  .login-card .card-title small {
    color: #fff;
  }

  #login,
  .login-card .card-title h1 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
  }

  #login,
  .login-card .content {
    padding: 3rem 2.5rem 5rem;
  }

  #login,
  .login-card #email,
  #login .login-card #password {
    display: block;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 1.75rem;
    padding: 0.25rem 0;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    transition: all .5s;
  }

  #login,
  .login-card #email:hover,
  #login .login-card #password:hover {
    border-color: #7a7a7a;
  }

  #login,
  .login-card #email:active,
  #login .login-card #email:focus,
  #login .login-card #password:active,
  #login,
  .login-card #password:focus {
    border-color: #00d1b2;
  }

  #login,
  .login-card .checkbox {
    color: #b5b5b5;
    font-size: 0.8rem;
  }

  #login,
  .login-card .checkbox span {
    margin-left: 0.5rem;
  }

  #login,
  .login-card a {
    font-size: 0.8rem;
  }

  #login,
  .login-card .options {
    color: #b5b5b5;
    margin-bottom: 1.5rem;
  }

  #login,
  .login-card button {
    cursor: pointer;
    font-size: 1.2rem;
    color: #00d1b2;
    border-radius: 4rem;
    display: block;
    width: 100%;
    background: transparent;
    border: 2px solid #00d1b2;
    padding: 0.9rem 0 1.1rem;
    transition: color .5s, border-color .5s;
  }

  #login,
  .login-card button:hover,
  #login .login-card button:focus {
    color: #009e86;
    border-color: #009e86;
  }

  #login,
  .login-card button:active {
    transform: translateY(1px);
  }

  label {
    cursor: pointer;
  }

  .regular-checkbox {
    display: none;
  }

  .regular-checkbox+label {
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    padding: 7px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }

  .regular-checkbox:checked+label {
    background-color: #e9ecee;
  }

  .regular-checkbox:checked+label:after {
    content: '\2714';
    font-size: 11px;
    position: absolute;
    top: 0;
    left: 3px;
    color: #b5b5b5;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
</style>