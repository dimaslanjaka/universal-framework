<?php

use Curl\Curl;

$google = blogger_client();

function reload_session()
{
  if (isses('blogId')) {
?>
    <script>
      setInterval(() => {
        reLoad();
      }, 60000);
      reLoad();

      function reLoad() {
        ajax.post('/AGC/blogger/init', {
          'set-blog': '<?= isses('blogId'); ?>'
        });
      }
    </script>
  <?php
  }
}
/**
 * Request validation.
 *
 * @param wpgoogle $google
 * @param Function $callback
 *
 * @return void
 */
function requestValidate($google, $callback = false)
{
  if (!$google->token) {
    if (is_callable($callback)) {
      return call_user_func($callback, $google->auth_url());
    } else {
      return $google->auth_url();
    }
  }
  $curl = new Curl();
  $curl->get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' . $google->token['access_token']);

  if (is_callable($callback)) {
    $arg = $curl->response;
    if ($curl->error) {
      $arg = $curl->errorMessage;
    }

    return call_user_func($callback, $arg);
  } else {
    if ($curl->error) {
      return $curl->errorMessage;
    }

    return $curl->response;
  }
}
/**
 * Validate Token.
 *
 * @param wpgoogle $google
 *
 * @return requestValidate
 */
function validateToken($google)
{
  return requestValidate($google, function ($response) {
    global $google;
    if ($response && !isURL($response)) {
      $scope = isset($response->scope) ? $response->scope : null;
      $isBlogScope = preg_match('/auth\/blogger\b/m', $scope);
      if ($isBlogScope) {
        if ($google->auth_request) {
          $google->update_token();
        }

        return true;
      } else {
        return login($response);
      }
    } elseif (isURL($response)) {
      //return wp_redirect2($response);
      return $response;
    } else {
      return false;
    }
  });
}

/**
 * get user meta bloggerId.
 *
 * @param function $callback error handler
 *
 * @return string bloggerId
 */
function validateBloggerId($callback)
{
  if (!getBloggerId()) {
    if (is_callable($callback)) {
      return call_user_func($callback);
    }
  }

  return getBloggerId();
}
/**
 * Get Blogger User ID.
 *
 * @param Function $error
 *
 * @return void
 */
function getBloggerId($error = null)
{
  if (!is_user_logged_in()) {
    return ['error' => true, 'type' => 'login'];
  }
  $bloggerId = get_user_meta(get_current_user_id(), 'bloggerId', true);
  if (!$bloggerId) {
    if (is_callable($error)) {
      return call_user_func($error, $bloggerId);
    }
  }

  return $bloggerId;
}
/**
 * get blogger blog id
 *
 * @return mixed
 */
function getBlogId()
{
  return isses('blogId');
}

function get_blogger_list($google = null, $error = null)
{
  if (!is_user_logged_in()) {
    throw new Exception('login required');
  }
  $user = wp_get_current_user();
  $folder_config = _file_(ROOT . '/assets/config/user/blogger/' . $user->user_email . '/blog.json');
  $blogList = file_get_contents($folder_config);
  if (empty($blogList) || isreq('reindex-blog')) {
    $blogger = new Google_Service_Blogger($google->client);
    $bloggerId = getBloggerId();
    if ($bloggerId) {
      $blogList = $blogger->blogs->listByUser($bloggerId);
      if ($blogList) {
        _file_($folder_config, $blogList, true);
      }

      return $blogList;
    }
  }

  return json_decode($blogList);
}


function setUserId()
{
  if (isset($_POST['bid']) && is_user_logged_in()) {
    update_user_meta(get_current_user_id(), 'bloggerId', $_POST['bid']);
  } elseif (!is_user_logged_in()) {
    return login();
  }
  global $google; ?>
  <div class="card mb-3">
    <div class="card-body">
      <p class="card-text">
        <h4>Please input your blogger ID to continue</h4>
        <form method="post" action="/AGC/blogger/index">
          <div class="form-group">
            <label for="" class="tx-danger">Blogger ID required!</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">https://www.blogger.com/profile/</span>
              </div>
              <input type="number" class="form-control" placeholder="175557xxxxxxx" aria-label="BloggerID" aria-describedby="basic-addon1" name="bid" value="<?= get_user_meta(get_current_user_id(), 'bloggerId', true); ?>">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_BloggerID" title="How to obtain Blogger ID (click)">
            <i class="fas fa-question"></i>
          </button>
        </form>
      </p>
    </div>
  </div>
<?php
}

function setBlogId()
{
  if (isreq('set-blog-id', 'post')) {
    sess('bloggerId', isreq('set-blog-id', 'post'));
  } ?>
  <div class="card mb-3">
    <div class="card-body">
      <p class="card-text">
        <h4>Please input your blog ID Manual</h4>
        <p>
          Google is having problems, so we want you to enter BLOG ID manually.
        </p>
        <form method="post" action="/AGC/blogger/index">
          <div class="form-group">
            <label for="" class="tx-danger">Blog ID required!</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">https://www.blogger.com/blogger.g?blogID=</span>
              </div>
              <input type="number" class="form-control" placeholder="277105xxxxxxxxxxxx" aria-label="BlogID" aria-describedby="basic-addon1" name="set-blog-id" value="<?= isses('blogId'); ?>">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button> <span data-toggle="tooltip" title="How to obtain Blog ID (click)"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_BlogID">
              <i class="fas fa-question"></i>
            </button></span>
        </form>
      </p>
    </div>
  </div>
<?php
}

function login()
{
  $google = blogger_client(); ?>
  <div class="az-signin-wrapper">
    <div class="az-card-signin">
      <h1 class="az-logo">A<span>G</span>C</h1>
      <div class="az-signin-header">
        <h2>Blogger access required!</h2>
        <h4>Please sign in to continue</h4>
        <form action="/AGC/login" method="POST" id="ajax" class="d-none" disabled>
          <input type="hidden" name="login">
          <div class="form-group">
            <label>Email</label>
            <input type="text" name="email" class="form-control" placeholder="demo@<?= $_SERVER['SERVER_NAME']; ?>">
          </div><!-- form-group -->
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control" placeholder="Enter your password">
          </div><!-- form-group -->
          <button class="btn btn-az-primary btn-block">Sign In</button>
        </form>
        <div class="text-center">
          <hr class="hr-text" data-content="LOGIN USING">
          <a href="<?= $google->auth_url(); ?>" class="icon-button google-plus btn btn-danger" data-toggle="tooltip-primary" title="login using google"><i class="fab fa-google"></i><span></span></a>
        </div>

        <div class="alert alert-info mt-2" role="alert">
          This authentication using following scopes : <br />
          <?php
          $c = parse_url2($google->auth_url());
          $e = preg_split('/\s/m', $c['query']['scope']);
          foreach ($e as $x) {
            if (strpos($x, 'youtube')) {
              $x .= ' <i class="fab fa-youtube"></i>';
            } elseif (strpos($x, 'blogger')) {
              $x .= ' <i class="fab fa-blogger"></i>';
            } else {
              $x .= ' <i class="fas fa-user"></i>';
            }

            echo $x . '<br/>';
          } ?>
        </div>
      </div><!-- az-signin-header -->
      <div class="az-signin-footer d-none">
        <p aria-disabled=""><a href="forgot">Forgot password ?</a></p>
        <p aria-disabled="">Don't have an account ? <a href="signup">Create an Account</a></p>
      </div><!-- az-signin-footer -->
    </div><!-- az-card-signin -->
  </div><!-- az-signin-wrapper -->
<?php
  //precom(parse_url2($google->auth_url()));
}
