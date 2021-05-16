<?php /** @noinspection PhpUnnecessaryLocalVariableInspection */

/** @noinspection PhpPrivateFieldCanBeLocalVariableInspection */

namespace User;

use ArrayHelper\helper;
use Crypto\crypt;
use DB\pdo;
use JSON\json;
use MVC\Exception;
use MVC\router;

$GLOBALS['user_instance'] = null;

/**
 * Universal Framework User Management.
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class user
{
    private static $_instance = null;
    public $admin_pattern = '/^superadmin$/s';
    public $dbname = 'userdata';
    private $id;
    private $username;
    private $password;
    private $role;
    private $user;
    /**
     * PDO instance.
     *
     * @var pdo
     */
    protected $pdo = null;
    private $db = ['user', 'pass', 'dbname', 'host', 'charset'];
    /**
     * Meta instance.
     *
     * @var meta
     */
    private $meta_instance;

    public function __construct($user, $pass, $db, $host = 'localhost', $charset = 'utf8mb4')
    {
        if (!empty($user) && !empty($db)) {
            $this->db = [
                'user' => $user,
                'pass' => $pass,
                'dbname' => $db,
                'host' => $host,
                'charset' => $charset,
            ];
            $this->pdo = new pdo($user, $pass, $db, $host, $charset);
            $this->pdo->connect($user, $pass, $db, $host, $charset);
            $check = $this->pdo->check_table($this->dbname);
            if (!$check) {
                $sql = \Filemanager\file::get(__DIR__ . '/user.sql');
                $this->pdo->query($sql)->exec();

                if (!$this->is_user_exists('dimaslanjaka')) {
                    $this->register('dimaslanjaka', 'admin', 'Administrator', 'superadmin');
                }
            }
        }
        if (!$GLOBALS['user_instance']) {
            $GLOBALS['user_instance'] = $this;
        }
        user::$_instance = $this;
    }

    /**
     * Check username is exists.
     *
     * @return bool
     */
    public function is_user_exists($username)
    {
        $check = $this->pdo->query("SELECT * FROM 'userdata';")->row_array();

        return !empty($check);
    }

    /**
     * Add User To Database.
     *
     * @param string $username
     * @param string $password
     * @param string $name
     * @param string $role
     *
     * @return array
     */
    public function register($username, $password, $name = 'user', $role = 'client')
    {
        if ('GET' == $_SERVER['REQUEST_METHOD']) {
            $username = urldecode($username);
            $password = urldecode($password);
        }
        $username = addslashes($username);
        $password = addslashes($password);
        $crypt = new crypt();
        $password = $crypt->encrypt(CONFIG['security']['salt'], $password);
        $db = $this->dbname;
        $q = "INSERT INTO `$db` (`display_name`, `username`, `password`, `role`) VALUES (:name, :username, :password, :role);";
        $exec = $this->pdo->SQL_Exec($q, ['name' => $name, 'username' => $username, 'password' => $password, 'role' => $role]);
        $result = [];
        if (isset($exec['id'])) {
            $chk = $this->pdo->SQL_Fetch("SELECT * FROM `$db` WHERE `$db`.`username` = :username AND `$db`.`password` = :password", ['username' => $username, 'password' => $password]);
            $result['success'] = true;
            $result = $this->hide_additional(array_merge($result, $chk));
        }

        return $result;
    }

    /**
     * Hidding additional information into backend response.
     *
     * @param array $result
     *
     * @return array
     * @author DimasLanjaka <dimaslanjaka@gmail.com>
     *
     */
    public function hide_additional($result)
    {
        if (isset($result['role'])) {
            unset($result['role']);
        }
        if (isset($result['number'])) {
            unset($result['number']);
        }
        if (isset($result['password'])) {
            unset($result['password']);
        }
        if (isset($result['id'])) {
            unset($result['id']);
        }

        return $result;
    }

    /**
     * Current instance.
     *
     * @return user
     */
    public static function instance()
    {
        return $GLOBALS['user_instance'];
    }

    public static function get_admin_pattern()
    {
        return self::getInstance()->admin_pattern;
    }

    /**
     * Static Chain.
     *
     * @return $this
     */
    public static function getInstance()
    {
        if (null === self::$_instance) {
            if (defined('CONFIG')) {
                self::$_instance = new self(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
            } else {
                self::$_instance = new self(null, null, null, null, null);
            }
        }

        return self::$_instance;
    }

    public static function setInstance(user $user)
    {
        self::$_instance = $user;
    }

    public function db($data)
    {
        if (isset($this->db[$data])) {
            return $this->db[$data];
        }
    }

    /**
     * Access Management.
     *
     * @return access
     */
    public function access()
    {
        return new access($this);
    }

    /**
     * Get All Users.
     *
     * @return array|null
     * @throws Exception
     */
    public function getUsers()
    {
        if (!$this->pdo) {
            throw new Exception('Database not properly configured', 1);
        }
        $result = [];
        $users = $this->pdo->select($this->dbname)->row_array();
        if (!helper::isSequent($users)) {
            $result[] = $users;
        } else {
            $result = $users;
        }

        return $result;
    }

    /**
     * Get PDO Instance.
     *
     * @param pdo $pdo set new instance
     *
     * @return pdo
     */
    public function pdo_instance(pdo $pdo = null)
    {
        if ($pdo) {
            $this->pdo = $pdo;
            self::$_instance = $this;
        }

        return $this->pdo;
    }

    /**
     * Check user can do something.
     *
     * @return array
     * @throws Exception
     */
    public function can($what)
    {
        if ($this->is_login()) {
            $check = $this->meta()->get($this->userdata('id'), 'can');
            if (!empty($check)) {
                return $check;
            }
        }
    }

    /**
     * Check user is login.
     *
     * @return bool
     */
    public function is_login()
    {
        $isLogin = isset($_SESSION['login']['username']) && !empty(trim($_SESSION['login']['username'])) ? true : false;
        if ($isLogin) {
            $this->username = $_SESSION['login']['username'];
            $check = $this->pdo->select('userdata')->where(['username' => $this->username])->row_array();
            if (!empty($check)) {
                foreach ($check as $key => $value) {
                    $this->{$key} = $value;
                }
            }
        }

        return $isLogin;
    }

    /**
     * Get \User\meta instance.
     *
     * @return meta
     * @throws Exception
     */
    public function meta()
    {
        $this->pdo_required();
        if (!$this->meta_instance) {
            $this->meta_instance = new meta($this->pdo);
        }

        return $this->meta_instance;
    }

    /**
     * Check pdo active.
     *
     * @return void
     * @throws Exception
     *
     */
    public function pdo_required()
    {
        if (!$this->pdo) {
            throw new Exception('Active PDO Required');
        }
    }

    /**
     * Get user data.
     *
     * @return array|int|string|null if empty not logged in
     * @noinspection PhpUndefinedMethodInspection
     */
    public function userdata($what)
    {
        if ($this->is_login()) {
            if (class_exists('\Indosat\api')) {
                $class = '\Indosat\api';
                $m3 = new $class();
                $m3->setdata('login', helper::unset($_SESSION['login'], ['password']));
            }
            if ('all' == $what) {
                return helper::unset($_SESSION['login'], ['password']);
            }
            if (isset($_SESSION['login'][$what])) {
                return $_SESSION['login'][$what];
            }
        }

        return null;
    }

    /**
     * If not admin auto redirect.
     *
     * @return void
     */
    public function admin_required($redirect = '/user/login')
    {
        if (!$this->is_admin()) {
            router::safe_redirect($redirect);
            exit;
        }
    }

    /**
     * Check current user is superadmin.
     *
     * @return bool
     */
    public function is_admin()
    {
        if ($this->is_login()) {
            return preg_match($this->admin_pattern, $this->get_role());
        }
    }

    /**
     * Get Current user role.
     *
     * @return string
     */
    public function get_role()
    {
        return isset($_SESSION['login']['role']) ? $_SESSION['login']['role'] : 'UNAUTHORIZED';
    }

    /**
     * Get All Available Roles.
     *
     * @return array
     */
    public function get_roles()
    {
        if (!$this->pdo) {
            throw new Exception('PDO instance required', 1);
        }
        $list = \DB\schema::get_enumset_values($this->pdo, $this->dbname, 'role');

        return $list;
    }

    /**
     * Get user data.
     *
     * @see \User\user::userdata
     */
    public function data($name)
    {
        return $this->userdata($name);
    }

    public function update_last_seen()
    {
        if ($this->is_login()) {
            $currentUsername = $this->userdata('username');
            $run = $this
                ->pdo
                ->query("UPDATE `userdata` SET `last_seen` = NOW() WHERE `username` = '{$currentUsername}';")
                ->exec();

            return $run;
        }
    }

    /**
     * Change password.
     *
     * @param int $id user id want to update
     * @param string $pass new password
     */
    public function update_password($id, $pass)
    {
        if (!$this->pdo) {
            throw new Exception('Database not properly configured', 1);
        }
        if (!is_numeric($id)) {
            throw new Exception('User ID must be instance of integer', 1);
        }
        $db = $this->dbname;
        $crypt = new crypt();
        $pass = $crypt->encrypt(CONFIG['security']['salt'], $pass);
        if (!$this->is_admin()) {
            $q = "UPDATE `$db` SET `password` = :pass WHERE `$db`.`id` = :id AND `$db`.`role` <> 'superadmin' AND `$db`.`role` <> 'admin';";
        } else {
            $q = "UPDATE `$db` SET `password` = :pass WHERE `$db`.`id` = :id;";
        }
        $this->pdo->SQL_Exec($q, ['id' => $id, 'pass' => $pass]);
        $result = [];
        $chk = $this->pdo->SQL_Fetch("SELECT * FROM `$db` WHERE `$db`.`id` = :id AND `$db`.`password` = :pass", ['id' => $id, 'pass' => $pass]);
        if (!empty($chk) && isset($chk['id'])) {
            $result['error'] = false;
            $result['message'] = 'Password changed successfully';
            $result['title'] = 'User information';
        } else {
            $result['error'] = true;
        }
        $result = $this->hide_additional(array_merge($result, $chk));

        return $result;
    }

    public function delete_user_by_id($id)
    {
        $db = $this->dbname;
        $q = "DELETE FROM `$db` WHERE `$db`.`id` = :id";
        $this->pdo->SQL_Exec($q, ['id' => $id]);
    }

    /**
     * Check user is logged in or redirect them.
     *
     * @return $this
     */
    public function login_required($redirect = '/user/login')
    {
        if (!$this->is_login()) {
            router::safe_redirect($redirect);
        }

        return $this;
    }

    /**
     * Get current database name.
     *
     * @return array
     */
    public function get_dbname()
    {
        return $this->pdo->query('select database()')->row_array();
    }

    public function generate_password($password)
    {
        $crypt = new crypt();

        return $crypt->encrypt(CONFIG['security']['salt'], $password);
    }

    public function login($username, $password)
    {
        if (!$this->pdo) {
            throw new Exception('Database not properly configured', 1);
        }
        if ('GET' == $_SERVER['REQUEST_METHOD']) {
            $username = urldecode($username);
            $password = urldecode($password);
        }
        $username = addslashes($username);
        $db = $this->dbname;
        $password = addslashes($password);
        $crypt = new crypt();
        $password = $crypt->encrypt(CONFIG['security']['salt'], $password);

        $query = "SELECT * FROM `$db` WHERE username=:username AND password=:password";
        //var_dump($username, $password, $query);
        $exec = $this->pdo->SQL_Fetch($query, ['username' => $username, 'password' => $password]);
        //var_dump($this->pdo, $exec);
        $result = [];
        if (!empty($exec)) {
            if (isset($exec['id'])) {
                $result['error'] = false;
                $result['success'] = true;
                $result['message'] = 'login successful';
                $result = array_merge($exec, $result);
                $id = $exec['id'];
                $query = "UPDATE `$db` SET `last_login` = now() WHERE `$db`.`id` = $id;";
                foreach ($exec as $key => $value) {
                    $_SESSION['login'][$key] = $value;
                }
                $this->pdo->SQL_Exec($query);
            } else {
                //var_dump($exec);
                $result['error'] = true;
            }
        } else {
            $result['error'] = true;
            $result['message'] = 'Empty response from database';
        }
        $result = $this->hide_additional($result);

        $this->user = $result;
        $this->pdo->resetQuery();
        $result['title'] = 'login information';

        return $result;
    }

    /**
     * Check Login.
     *
     * @param Function $callback
     * @author Dimaslanjaka <dimaslanjaka@gmail.com>
     *
     */
    public function check_login($callback)
    {
        if (isset($_SESSION['login'])) {
            if (isset($_SESSION['login']['id']) && is_numeric($_SESSION['login']['id'])) {
                if (is_callable($callback)) {
                    call_user_func($callback, helper::unset($_SESSION['login'], ['password']));
                }
            }
        } else {
            if (is_callable($callback)) {
                call_user_func($callback, [
                    'error' => true,
                    'message' => 'User Login required. Please relogin from login page',
                    'unauthorized' => true,
                ]);
            }
        }
    }

    /**
     * Update Display Name.
     *
     * @param Number $id
     * @param string $display
     */
    public function update_display_name($id, $display)
    {
        if (!$this->pdo) {
            throw new Exception('Database not properly configured', 1);
        }
        $db = $this->dbname;
        $q = "UPDATE `$db` SET `display_name` = :name WHERE `$db`.`id` = :id;";
        $this->pdo->SQL_Exec($q, ['name' => $display, 'id' => $id]);
        $chk = $this->pdo->SQL_Fetch("SELECT `$db` WHERE `$db`.`id` = :id AND `display_name` = :name;", ['id' => $id, 'name' => $display]);
        $this->json($chk);
    }

    /**
     * JSON formatter.
     *
     * @param array $data
     * @param bool $header
     * @param bool $print
     */
    public function json($data = [], $header = true, $print = true)
    {
        return json::json($data, $header, $print);
    }

    public function update_role($id, $role, $rgx = '/^(admin|client|superadmin)$/s')
    {
        if (!$this->pdo) {
            throw new Exception('Database not properly configured', 1);
        }
        if (!preg_match($rgx, $role)) {
            throw new Exception('Error Processing Change Role Request', 1);
        }
        $chk = [
            'error' => true,
            'message' => 'insufficient privileges',
        ];
        if ($this->is_admin()) {
            $db = $this->dbname;
            $q = "UPDATE `$db` SET `role` = :role WHERE `$db`.`id` = :id;";
            $this->pdo->SQL_Exec($q, ['role' => $role, 'id' => $id]);
            $chk = $this->pdo->SQL_Fetch("SELECT * FROM `$db` WHERE `$db`.`id` = :id AND `role` = :role;", ['id' => $id, 'role' => $role]);
            if (isset($chk['id'])) {
                $chk['error'] = false;
            }
        }

        return $chk;
    }
}
