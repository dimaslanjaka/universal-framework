<?php

namespace MVC;

class captcha extends router
{
    public $key = null;
    private $request_headers = [];
    private $cors = null;

    public function __construct()
    {
        $_SESSION['md5-useragent'] = md5($_SERVER['HTTP_USER_AGENT']);
        $this->key = 'captcha' . md5(\MVC\helper::get_client_ip() . $_SERVER['HTTP_USER_AGENT']);
        $this->cors = \MVC\helper::cors();

        if (!function_exists('getallheaders')) {
            foreach ($_SERVER as $name => $value) {
                /* RFC2616 (HTTP/1.1) defines header fields as case-insensitive entities. */
                if ('http_' == strtolower(substr($name, 0, 5))) {
                    $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                }
            }
            $this->request_headers = $headers;
        } else {
            $this->request_headers = getallheaders();
        }
    }

    /**
     * Receiver (Create captcha).
     *
     * @param string $header_name javascript function name in header format
     *
     * @return void
     */
    public function receiver($header_name = 'hname')
    {
        return $this->receiver2($header_name);
    }

    public function receiver2($header_name = null)
    {
        if (!$this->cors) {
            return;
        }
        if (!$header_name) {
            $header_name = str_rot13(\MVC\helper::getRequestIP());
        }
        $allow = isset($this->request_headers[$header_name]);

        if ($allow) {
            $header = $this->request_headers[$header_name];
            $header_match = str_rot13($header) == $_SESSION['md5-useragent'];
            if ($header_match) {
                if (isset($_REQUEST['callback'])) {
                    header('Content-Type: application/javascript');
                    $create = $this->create();
                    $gen = json_encode(['captcha' => str_rot13($create)]);
                    echo "{$_REQUEST['callback']}($gen)";
                    exit;
                }
            }
        }
    }

    /**
     * Create captcha ids.
     *
     * @return void
     */
    public function create()
    {
        $random_alpha = md5(rand());
        $captcha_code = (string)substr($random_alpha, 0, 6);
        \Cookie\helper::mins($this->key, $captcha_code, 1, '/');

        return $captcha_code;
    }

    /**
     * Validate coupon codes.
     *
     * @return void
     */
    public function validate($captcha)
    {
        if (\Cookie\helper::has($this->key)) {
            return \Cookie\helper::get($this->key) == $captcha;
        } else {
            if (\MVC\helper::cors()) {
                exit(\JSON\json::json(['message' => "Session {$this->key} not exists", 'error' => true]));
            } else {
                throw new Exception("Session {$this->key} not exists", 1);
            }
        }
    }

    public function jpeg($captcha_code)
    {
        $target_layer = imagecreatetruecolor(70, 30);
        $captcha_background = imagecolorallocate($target_layer, 255, 160, 119);
        imagefill($target_layer, 0, 0, $captcha_background);
        $captcha_text_color = imagecolorallocate($target_layer, 0, 0, 0);
        imagestring($target_layer, 5, 5, 5, str_rot13($captcha_code), $captcha_text_color);
        header('Content-type: image/jpeg');
        imagejpeg($target_layer);
    }

    private function delete_headers($http_code = 200)
    {
        if (ob_get_level()) {
            ob_end_clean();
            ob_start();
        }
        http_response_code($http_code);
    }
}
