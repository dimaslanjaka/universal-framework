<?php

class dimas_user extends dimas
{
  public $user_id;

  public function __construct($o)
  {
    parent::__construct($o);
    if ($this->islogin(false)) {
      $this->user_id = get_current_user_id();
      $this->set_user_session();
      if ($this->isCompany(false)) {
        $company_log = $_SERVER['DOCUMENT_ROOT'] . '/log/' . $this->company();
        if (!file_exists($company_log)) {
          $this->folder($company_log);
        }
      }
    }

    $user_id = isset($_SESSION['userID']) && !$this->islogin() ? $_SESSION['userID'] : null;
    if ($user_id) {
      remove_filter('wp_authenticate_user', 'verify_recaptchav3');
      $curr_user = new WP_User($user_id->ID, $user_id->data->user_login);
      //print_r($curr_user); // This trace is showed below.
      wp_set_auth_cookie($user_id->ID);
      do_action('wp_login', $user_id->data->user_login);
    }
  }

  public static function user_init($o)
  {
    return new self($o);
  }

  public function set_user($user_id)
  {
    $this->user = get_userdata($user_id);

    return $this;
  }

  public function avatar()
  {
    if ($this->islogin(false)) {
      return get_avatar_url($this->user_id);
    } else {
      return 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://listimg.pinclipart.com/picdir/s/214-2148614_cancer-research-special-interest-group-user-icon-material.png';
    }
  }

  public function email()
  {
    return $this->user->user_email;
  }

  public function fname()
  {
    return $this->user->first_name;
  }

  public function lname()
  {
    return $this->user->last_name;
  }

  public function dname()
  {
    return $this->user->display_name;
  }

  public function username()
  {
    return $this->user->user_login;
  }

  public function id()
  {
    return $this->user->ID;
  }

  public function set_user_session()
  {
    if ($this->user){
        if (isset($this->user->roles[0])){
            $_SESSION['level'] = $this->user->roles[0];
          }
        $_SESSION['user_login'] = $this->user->user_login;
        $_SESSION['display_name'] = $this->user->display_name;
        $_SESSION['user_id'] = $_SESSION['login'] = $this->user->ID;
        $_SESSION['capability'] = $this->user->allcaps;
        $_SESSION['perusahaan'] = get_user_meta($this->user->ID, 'perusahaan', true);}
  }

  public function islogin()
  {
    return is_user_logged_in();
  }

  public function islogout($redirect = false)
  {
    if (!$this->islogin(false)) {
      if ($redirect) {
        $this->header_redirect('/login', 1);
      } else {
        $this->dump(['error' => 'You must login first']);
      }
    }
  }

  public function isadmin()
  {
    return current_user_can('superadmin');
  }

  public function isdirektur()
  {
    return current_user_can('direktur');
  }

  public function getUIP()
  {
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
      $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
      $_SERVER['HTTP_CLIENT_IP'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    $req_ip = (isset($_REQUEST['set-ip']) && filter_var($_REQUEST['set-ip'], FILTER_VALIDATE_IP) ? $_REQUEST['set-ip'] : false);
    if ($req_ip) {
      setcookie('ip', $req_ip, time() + 3600);
      exit(json_encode($_REQUEST['set-ip']));
    }
    $client = (isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : false); //@
  $forward = (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : false); //@
  $forward2 = (isset($_SERVER['HTTP_X_FORWARDED']) ? $_SERVER['HTTP_X_FORWARDED'] : false);
    $remote = $_SERVER['REMOTE_ADDR'];
    $forward3 = (isset($_SERVER['HTTP_FORWARDED']) ? $_SERVER['HTTP_FORWARDED'] : false);
    $cluster = (isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) ? $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'] : false);
    $cookie = (isset($_COOKIE['ip']) ? $_COOKIE['ip'] : false);

    if (filter_var($client, FILTER_VALIDATE_IP)) {
      $ip = $client;
    } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
      $ip = $forward;
    } elseif (filter_var($forward3, FILTER_VALIDATE_IP)) {
      $ip = $forward3;
    } elseif (filter_var($forward2, FILTER_VALIDATE_IP)) {
      $ip = $forward2;
    } elseif (filter_var($cookie, FILTER_VALIDATE_IP)) {
      $ip = $cookie;
    } else {
      $ip = $remote;
      _scriptJS();
    }
    //var_dump($client, $forward, $forward2, $forward3, $remote, $cluster, $cookie);

    return $ip;
  }

  public function user_email_exists($mail)
  {
    $wpdb = $this->wpdb;
    $count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $wpdb->users WHERE `user_email` = %s", $mail));

    if (1 == $count) {
      return true;
    } else {
      return false;
    }
  }

  public function recaptcha_verify($user_or_email, $password)
  {
    if (isset($_POST['g-recaptcha-response'])) {
      $response = $_POST['g-recaptcha-response'];
      $remoteip = $this->getUIP();
      $secret = $this->recaptcha_s;
      $g_response = json_decode(file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $response . '&remoteip=' . $remoteip), true);
      if (isset($g_response['success']) && true === $g_response['success']) {
        update_option('login_nocaptcha_working', true);

        return $user_or_email;
      } else {
        return $g_response;
      }
    }
  }

  public function company()
  {
    return get_user_meta($this->user_id, 'perusahaan', true);
  }

  public function phone()
  {
    return get_user_meta($this->user_id, 'phone', true);
  }

  public function isCompany($redirect = true)
  {
    $set = (isset($_SESSION['perusahaan']) ? $_SESSION['perusahaan'] : (!empty($this->company) ? $this->company() : null));
    if ($set) {
      return true;
    } elseif ($redirect) {
      $this->logout();
      $this->header_redirect($_SERVER['HTTP_REFERER']);
    }
  }

  public function get_all_clients($company)
  {
    $args = [
      'role' => 'client',
      'orderby' => 'user_nicename',
      'order' => 'ASC',
    ];
    $users = get_users($args);
    $us = [];
    foreach ($users as $user) {
      $user_company = get_user_meta($user->ID, 'perusahaan', true);
      if (trim($user_company) == $company) {
        $us[] = $user;
      }
    }

    return $us;
  }

  public function all_caps()
  {
    $admin_role_set = get_role('administrator')->capabilities;

    return $admin_role_set;
  }
}

class user_utility
{
  public static function i()
  {
    return new self();
  }

  public function update_user($user_id)
  {
    update_user_meta($user_id, 'phone', (isset($_POST['phone']) ? $_POST['phone'] : '0'));
    update_user_meta($user_id, 'address', (isset($_POST['address']) ? $_POST['address'] : '-'));
    update_user_meta($user_id, 'city', (isset($_POST['city']) ? $_POST['city'] : '-'));
    update_user_meta($user_id, 'province', (isset($_POST['province']) ? $_POST['province'] : '-'));
    update_user_meta($user_id, 'postalcode', (isset($_POST['postalcode']) ? $_POST['postalcode'] : '-'));
    update_user_meta($user_id, 'perusahaan', (isset($_POST['perusahaan']) ? $_POST['perusahaan'] : '-'));
  }

  public function build_user()
  {
    $r = [];
    $username = isset($_POST['username']) && !empty($_POST['username']) && !username_exists(trim($_POST['username']));
    $email = isset($_POST['email']) && !empty($_POST['email']) && !email_exists(trim($_POST['email']));
    $role = isset($_POST['role']) && !empty($_POST['role']) && $this->role_exists(trim($_POST['role']));
    if ($username && $email && $role) {
      $r['nickname'] = trim($_POST['username']);
      $r['display_name'] = trim($_POST['username']);
      $r['user_login'] = trim($_POST['username']);
      $r['user_nicename'] = trim($_POST['username']);
      $r['user_email'] = trim($_POST['email']);
      $r['role'] = $role;
      if (isset($_POST['fname'])) {
        $_POST['fname'] = ucwords(trim(strtolower($_POST['fname'])));
        $r['nickname'] = trim($_POST['fname']);
        $r['display_name'] = trim($_POST['fname']);
        $r['first_name'] = trim($_POST['fname']);
        if (isset($_POST['lname'])) {
          $r['display_name'] = trim($_POST['fname']) . ' ' . trim($_POST['lname']);
          $r['last_name'] = trim($_POST['lname']);
        }
      }

      return $r;
    } else {
      return json::i()->err(['error' => 'unknown error', 'reasons' => ['email' => $email, 'username' => $username, 'role' => $role]]);
    }
  }

  public function register()
  {
    $udata = $this->build_user();
    if ($udata && (is_object($udata) || is_array($udata))) {
      $user_id = wp_insert_user($udata);
      $this->update_user($user_id);
      $o['success'] = 'User Created Successfully';
      $o['reset'] = true;
      $o['refresh'] = true;
    } else {
      $o['error'] = 'user creation failed';
    }

    return $o;
  }

  public function role_exists($role)
  {
    if (!empty($role)) {
      return $GLOBALS['wp_roles']->is_role($role);
    }

    return false;
  }

  public function islogin($redirect = false)
  {
    if (!is_user_logged_in()) {
      if ($redirect) {
        return dimas::i()->header_redirect('/login')->quit();
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public function login_required()
  {
    return $this->islogin(true);
  }

  public function isadmin()
  {
    return is_user_admin();
  }
}
