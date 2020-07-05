<?php

namespace User;

class coupon extends user
{
  public $coupon = null;

  public function __construct($user = 'root', $pass = '', $db = 'darkit', $host = 'localhost', $charset = 'utf8mb4')
  {
    parent::__construct($user, $pass, $db, $host, $charset);
  }

  public function set_pdo(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }

  public function pdo_required()
  {
    if (!$this->pdo_instance() || empty($this->pdo_instance())) {
      if ('any' == \MVC\helper::HeaderAccept() && !\MVC\helper::cors()) {
        throw new \MVC\Exception('PDO Required', 1);
      } else {
        \JSON\json::json(['error' => true, 'message' => '\DB\pdo instance is required', 'title' => __CLASS__]);
        exit;
      }
    }

    return $this;
  }

  public function create(string $coupon, int $limit)
  {
    $this->pdo_required();
    $check = $this->pdo_instance()->select('coupon')->where(['code' => $coupon])->row_array();
    $result = ['error' => true];
    if (isset($check['code'])) {
      $result['message'] = "Account `$coupon` already exists";
    } else {
      $insert = $this->pdo_instance()->insert_not_exists('coupon', ['code' => $coupon, 'limit' => $limit])->exec();
      $result = array_replace($result, $insert);
      if (!$result['error']) {
        $result['message'] = 'Coupon account created';
        $result['data'] = $this->pdo_instance()->select('coupon')->where(['code' => $coupon])->row_array();
      }
    }
    $result['title'] = 'Coupon Creation';

    return $result;
  }

  public function coupon_login(string $coupon)
  {
    $this->pdo_required();
    $result = ['title' => 'Coupon Login', 'error' => true];
    $login = $this->pdo_instance()
      ->select('coupon')
      ->where(['code' => $coupon])
      ->row_array();
    \Session\session::set_session('coupon', $login);
    $result = array_replace($result, $login);
    if (!isset($login['limit'])) {
      $result['error'] = true;
      $result['message'] = 'Coupon not registered';
    } else {
      $limit = $login['limit'] - $login['success'];
      if ($limit < 1) {
        $result['error'] = true;
        $result['message'] = 'Coupon was reached limit';
        //$this->logout();
      } else {
        $result['error'] = false;
        $result['message'] = 'Coupon login successfully';
        /**
         * Update token.
         */
        $uid = session_id();
        $uid .= '_' . $this->gen_token(strlen($uid));
        \Session\session::set_session('coupon_token', $uid);
        $this->pdo_instance()
          ->update(
            'coupon',
            ['token' => $uid],
            ['code' => $this->coupon_data('code')]
          )->exec();
      }
    }
    //$result = array_replace($result, $this->coupon());

    return $result;
  }

  /**
   * Coupon login check.
   *
   * @return boolean
   */
  public function is_login(bool $token = true)
  {
    if ($token) {
      return \Session\session::has('coupon_token', false) && !empty($this->coupon_data('code'));
    }

    return !empty($this->coupon_data('code'));
  }

  public function logout()
  {
    \Session\session::unses([
      'coupon_token', 'coupon_admin', 'coupon', 'im3', 'telkomsel', 'msisdn', 'tokenid',
    ]);
    \Cookie\helper::destroy();
  }

  public function is_admin()
  {
    return \Cookie\helper::has(str_rot13('coupon_admin'), false);
  }

  public function admin_required()
  {
    if (!$this->is_admin()) {
      exit(\JSON\json::json(['error' => true, 'message' => 'admin required']));
    }
  }

  public function set_admin($data, int $expire = 15, string $cookie_path)
  {
    \Cookie\helper::mins(str_rot13('coupon_admin'), $data, $expire, $cookie_path, $_SERVER['HTTP_HOST']);
  }

  /**
   * Is localhost ?
   */
  public function is_local()
  {
    if (defined('LOCAL')) {
      return LOCAL;
    }
    return \MVC\helper::isLocal();
  }

  /**
   * Validate coupon token with current session zone divisor.
   *
   * @param callable $callback return callback(true|false, $result)
   *
   * @return boolean|mixed
   */
  public function coupon_validate(callable $callback = null)
  {
    $this->pdo_required();
    $result = ['title' => 'Coupon validate', 'error' => true];
    if ($this->is_admin() || $this->is_local()) {
      $result['session'] = \Session\session::all();
    }
    if ($this->is_login()) {
      $result['status'] = 'login';
      $coupon = $this->coupon();
      $dbtoken = null;
      if (isset($coupon['token'])) {
        $dbtoken = $coupon['token'];
      }

      $result['data'] = $coupon;
      $result['token']['db'] = $dbtoken;
      $result['token']['session'] = \Session\session::get('coupon_token');

      if (\Session\session::get('coupon_token') == $dbtoken) {
        $limit = $this->coupon_limit();
        $result['limit'] = $limit;
        if ($limit > 0) {
          $result['error'] = false;
        } else {
          $result['message'] = 'Token limit was reached';
        }
      } else {
        $result['message'] = 'Token coupon doesnt match';
      }
    } else {
      $result['message'] = 'Coupon login required';
    }
    if (is_callable($callback)) {
      return call_user_func($callback, (false === $result['error']), $result);
    }

    return false === $result['error']; //check if valid (true)
  }

  /**
   * Add Success 1 to database.
   *
   * @param string $coupon_code
   *
   * @return void
   */
  public function add_success(string $coupon_code)
  {
    $this->pdo_required();
    $this->pdo_instance()->query("UPDATE `coupon` SET `success`= `success`+1 WHERE `code` = '{$coupon_code}'")->exec();
  }

  public function add_log(string $msisdn, string $coupon_code)
  {
    $this->pdo_required();
    $regex = '/^0|^\+62/s';
    $msisdn = preg_replace($regex, '62', trim($msisdn));
    $this->pdo_instance()->insert('coupon_log', ['msisdn' => $msisdn, 'coupon' => $coupon_code])->exec();
  }

  /**
   * Get current coupon limit value.
   *
   * @return int
   */
  public function coupon_limit()
  {
    $coupon = $this->coupon();
    $ret = 0;
    if (isset($coupon['limit'], $coupon['success'])) {
      $ret = $coupon['limit'] - $coupon['success'];
    }
    if ($ret < 1) {
      $this->logout();
    }

    return $ret;
  }

  /**
   * Get current coupon datas.
   *
   * @return array
   */
  public function coupon()
  {
    $this->pdo_required();
    if (!$this->is_login()) {
      return null;
    }
    $ret = [];
    try {
      $ret = $this->pdo_instance()->select('coupon')->where(['code' => $this->coupon_data('code')])->row_array();
      \Session\session::set_session('coupon', $ret);
    } catch (\Throwable $th) {
      //ev($this->pdo_instance());
      //throw $th;
    }

    return $ret;
  }

  public function coupon_data(string $key)
  {
    if (isset($_SESSION['coupon'][$key])) {
      return $_SESSION['coupon'][$key];
    }
  }

  public function redirect(string $path)
  {
    //\MVC\router::safe_redirect($path);
    if (!headers_sent()) {
      header('Location: ' . $path);
    } else {
      echo 'Your access was blocked. please visit <a href="' . $path . '">Here ' . md5($path) . '</a>';
    }
    exit;
  }

  /**
   * Generate token.
   *
   * @param int $length
   *
   * @return string
   */
  public function gen_token(int $length = 10)
  {
    $token = '';
    $codeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $codeAlphabet .= 'abcdefghijklmnopqrstuvwxyz';
    $codeAlphabet .= '0123456789';
    $max = strlen($codeAlphabet); // edited

    for ($i = 0; $i < $length; ++$i) {
      $token .= $codeAlphabet[random_int(0, $max - 1)];
    }

    return $token;
  }

  public function e($data)
  {
    exit(\JSON\json::json($data));
  }
}
