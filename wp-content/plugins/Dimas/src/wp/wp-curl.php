<?php

/**
 * Step 1: prepare($url, $headers, $query) method for initialize url, headers and queries.
 * Step 2: exec_post() method used for POST Method / exec_get() method used for GET Method.
 * Step 3: get_response() method used for getting response in JSON format/ get_response_assoc() method used for getting response in Associative Array format.
 */
class dimas_curl extends dimas
{
  protected $url;
  protected $headers;
  protected $query;
  protected $responses;
  protected $userAgent;
  protected $referer;
  protected $additionalOpt;
  protected static $_instance;

  public function __construct($o)
  {
    $this->arg = $o;
    parent::__construct($o);
  }

  public static function chain($e)
  {
    return new self($e);
  }

  public function init($url, $query = [], $headers = [])
  {
    $this->url = $url;
    $this->headers = $headers;
    $this->query = http_build_query($query);

    return $this;
  }

  /**
   *  Execute post method curl request.
   */
  public function post()
  {
    $this->setopt(CURLOPT_POST, 1);
    $this->setopt(CURLOPT_POSTFIELDS, $this->query);

    return $this;
  }

  /**
   *  Execute get method curl request.
   */
  public function get($full_url = false)
  {
    if (false === $full_url) {
      $full_url = $this->url . '?' . $this->query;
    }
    $this->setopt(CURLOPT_URL, $full_url);

    return $this;
  }

  public function sget($u)
  {
    $this->init($u);

    return $this->get($u);
  }

  /**
   * @return mixed
   */
  public function exec()
  {
    $curl = curl_init();
    curl_setopt_array($curl, $this->getopt());
    $this->responses = curl_exec($curl);
    $contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
    if (false !== strpos($contentType, '/json')) {
      return $this->ejson();
    } else {
      return $this->responses;
    }
  }

  /**
   * JSON Return As Array.
   */
  public function ejson()
  {
    $json = json_decode($this->responses, true);
    $ERRORS = [
      JSON_ERROR_NONE => $json,
      JSON_ERROR_DEPTH => 'JSON_Maximum stack depth exceeded',
      JSON_ERROR_STATE_MISMATCH => 'JSON_State mismatch (invalid or malformed JSON)',
      JSON_ERROR_CTRL_CHAR => 'JSON_Control character error, possibly incorrectly encoded',
      JSON_ERROR_SYNTAX => 'JSON_Syntax error',
      JSON_ERROR_UTF8 => 'JSON_Malformed UTF-8 characters, possibly incorrectly encoded',
    ];

    $error = json_last_error();

    return isset($ERRORS[$error]) ? $ERRORS[$error] : 'Unknown JSON Error';
  }

  public function setopt($opt, $value = 0)
  {
    /*
    * setOption( array( CURL_OPT => CURL_OPT_VAL ) ) (06-12-2016) : Set the additional value for curl options with array
    * setOption( CURL_OPT, CURL_OPT_VAL ) (06-12-2016) : Set the additional value for curl options with single option and value New method Version 1.2.0
    */
    if (is_array($opt)) {
      foreach ($opt as $dataName => $dataValue) {
        $this->additionalOpt[$dataName] = $dataValue;
      }
    } else {
      $this->additionalOpt[$opt] = $value;
    }
  }

  public function UA($st)
  {
    $this->userAgent = $st;

    return $this;
  }

  public function ref($r)
  {
    $this->referer = $r;

    return $this;
  }

  private function getopt()
  {
    $options = $this->additionalOpt;

    $options[CURLOPT_RETURNTRANSFER] = 1;

    if (!empty($this->userAgent)) {
      $options[CURLOPT_USERAGENT] = $this->userAgent;
    }
    if (!empty($this->referer)) {
      $options[CURLOPT_REFERER] = $this->referer;
    }
    $options[CURLOPT_HTTPHEADER] = $this->headers;
    if (!empty($this->request_method)) {
      $options[CURLOPT_CUSTOMREQUEST] = $this->request_method;
    }

    return $options;
  }
}
