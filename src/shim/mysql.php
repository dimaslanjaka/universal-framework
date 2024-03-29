<?php

/**
 * php7-mysql-shim.
 *
 * @author Davey Shafik <me@daveyshafik.com>
 * @copyright Copyright (c) 2017 Davey Shafik
 * @license MIT License
 *
 * @see https://github.com/dshafik/php7-mysql-shim
 */

/**
 * A drop-in replacement for ext/mysql in PHP 7+ using ext/mysqli instead.
 *
 * This library is meant to be a _stop-gap_. It will be slower than using
 * the native functions directly.
 *
 * You should switch to ext/pdo_mysql or ext/mysqli, and migrate to prepared
 * queries (@see http://php.net/manual/en/pdo.prepared-statements.php) to
 * ensure you are securely interacting with your database.
 */

namespace {
    if (!extension_loaded('mysql')) {
      if (!extension_loaded('mysqli')) {
        trigger_error('php7-mysql-shim: ext/mysqli is required', E_USER_ERROR);
      }

      define('MYSQL_ASSOC', 1);
      define('MYSQL_NUM', 2);
      define('MYSQL_BOTH', 3);
      define('MYSQL_CLIENT_COMPRESS', 32);
      define('MYSQL_CLIENT_SSL', 2048);
      define('MYSQL_CLIENT_INTERACTIVE', 1024);
      define('MYSQL_CLIENT_IGNORE_SPACE', 256);

      function mysql_connect(
            $hostname = null,
            $username = null,
            $password = null,
            $new = false,
            $flags = 0
        ) {
        if (null === $hostname) {
          $hostname = ini_get('mysqli.default_host') ?: null;
        }
        if (null === $username) {
          $username = ini_get('mysqli.default_user') ?: null;
        }
        if (null === $password) {
          $password = ini_get('mysqli.default_pw') ?: null;
        }

        $hash = sha1($hostname . $username . $flags);
        /* persistent connections start with p: */
        /* don't use a cached link for those */
        if (!$new && ':' !== $hostname[1] && isset(\UniversalFramework\MySQL::$connections[$hash])) {
          \UniversalFramework\MySQL::$last_connection = \UniversalFramework\MySQL::$connections[$hash]['conn'];
          ++\UniversalFramework\MySQL::$connections[$hash]['refcount'];

          return \UniversalFramework\MySQL::$connections[$hash]['conn'];
        }

        /* A custom port can be specified by appending the hostname with :{port} e.g. hostname:3307 */
        if (1 === preg_match('/^(.+):([\d]+)$/', $hostname, $port_matches) && 'p' !== $port_matches[1]) {
          $hostname = $port_matches[1];
          $port = (int) $port_matches[2];
        } else {
          $port = null;
        }

        /* No flags, means we can use mysqli_connect() */
        if (0 === $flags) {
          $conn = mysqli_connect($hostname, $username, $password, '', $port);
          if (!$conn instanceof mysqli) {
            return false;
          }
          \UniversalFramework\MySQL::$last_connection = $conn;
          $conn->hash = $hash;
          \UniversalFramework\MySQL::$connections[$hash] = ['refcount' => 1, 'conn' => $conn];

          return $conn;
        }

        /* Flags means we need to use mysqli_real_connect() instead, and handle exceptions */
        try {
          \UniversalFramework\MySQL::$last_connection = $conn = mysqli_init();

          mysqli_real_connect(
                    $conn,
                    $hostname,
                    $username,
                    $password,
                    '',
                    $port,
                    '',
                    $flags
                );

          // @codeCoverageIgnoreStart
          // PHPUnit turns the warning from mysqli_real_connect into an exception, so this never runs
          if (false === $conn) {
            return false;
          }
          // @codeCoverageIgnoreEnd

          $conn->hash = $hash;
          \UniversalFramework\MySQL::$connections[$hash] = ['refcount' => 1, 'conn' => $conn];

          return $conn;
        } catch (\Throwable $e) {
          trigger_error($e->getMessage(), E_USER_WARNING);
          // @codeCoverageIgnoreStart
          // PHPUnit turns the warning into an exception, so this never runs
          return false;
          // @codeCoverageIgnoreEnd
        }
      }

      function mysql_pconnect(
            $hostname = null,
            $username = null,
            $password = null,
            $flags = 0
        ) {
        $hostname = 'p:' . $hostname;

        return mysql_connect($hostname, $username, $password, false, $flags);
      }

      function mysql_close(mysqli $link = null)
      {
        $isDefault = (null === $link);

        $link = \UniversalFramework\MySQL::getConnection($link, __FUNCTION__);
        if (null === $link) {
          // @codeCoverageIgnoreStart
          // PHPUnit Warning -> Exception
          return false;
          // @codeCoverageIgnoreEnd
        }

        if (isset(\UniversalFramework\MySQL::$connections[$link->hash])) {
          --\UniversalFramework\MySQL::$connections[$link->hash]['refcount'];
        }

        $return = true;
        if (0 === \UniversalFramework\MySQL::$connections[$link->hash]['refcount']) {
          $return = mysqli_close($link);
          unset(\UniversalFramework\MySQL::$connections[$link->hash]);
        }

        if ($isDefault) {
          UniversalFramework\MySQL::$last_connection = null;
        }

        return $return;
      }

      function mysql_select_db($databaseName, mysqli $link = null)
      {
        $link = \UniversalFramework\MySQL::getConnection($link);

        return false !== mysqli_query(
                    $link,
                    'USE `' . mysqli_real_escape_string($link, $databaseName) . '`'
                );
      }

      function mysql_query($query, mysqli $link = null)
      {
        return mysqli_query(\UniversalFramework\MySQL::getConnection($link), $query);
      }

      function mysql_unbuffered_query($query, mysqli $link = null)
      {
        $link = \UniversalFramework\MySQL::getConnection($link);
        if (mysqli_real_query($link, $query)) {
          return mysqli_use_result($link);
        }

        return false;
      }

      function mysql_db_query($databaseName, $query, mysqli $link = null)
      {
        if (mysql_select_db($databaseName, $link)) {
          return mysql_query($query, $link);
        }

        return false;
      }

      function mysql_list_dbs(mysqli $link = null)
      {
        return mysql_query('SHOW DATABASES', $link);
      }

      function mysql_list_tables($databaseName, mysqli $link = null)
      {
        $link = \UniversalFramework\MySQL::getConnection($link);
        $query = sprintf(
                'SHOW TABLES FROM `%s`',
                mysql_real_escape_string($databaseName, $link)
            );

        return mysql_query($query, $link);
      }

      function mysql_list_fields($databaseName, $tableName, mysqli $link = null)
      {
        $link = \UniversalFramework\MySQL::getConnection($link);

        $query = sprintf(
                'SHOW COLUMNS FROM `%s`.`%s`',
                mysqli_real_escape_string($link, $databaseName),
                mysqli_real_escape_string($link, $tableName)
            );

        $result = mysql_query($query, $link);

        if ($result instanceof \mysqli_result) {
          $result->table = $tableName;

          return $result;
        }

        trigger_error('mysql_list_fields(): Unable to save MySQL query result', E_USER_WARNING);
        // @codeCoverageIgnoreStart
        return false;
        // @codeCoverageIgnoreEnd
      }

      function mysql_list_processes(mysqli $link = null)
      {
        return mysql_query('SHOW PROCESSLIST', $link);
      }

      function mysql_error(mysqli $link = null)
      {
        return mysqli_error(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_errno(mysqli $link = null)
      {
        return mysqli_errno(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_affected_rows(mysqli $link = null)
      {
        return mysqli_affected_rows(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_insert_id($link = null) /*|*/
      {
        return mysqli_insert_id(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_result($result, $row, $field = 0)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        if (!mysqli_data_seek($result, $row)) {
          trigger_error(
                    sprintf(
                        'mysql_result(): Unable to jump to row %d on MySQL result index %s',
                        $row,
                        spl_object_hash($result)
                    ),
                    E_USER_WARNING
                );
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        $found = true;
        if (false !== strpos($field, '.')) {
          list($table, $name) = explode('.', $field);
          $i = 0;
          $found = false;
          mysqli_field_seek($result, 0);
          while ($column = mysqli_fetch_field($result)) {
            if ($column->table === $table && $column->name === $name) {
              $field = $i;
              $found = true;
              break;
            }
            ++$i;
          }
        }

        $row = mysql_fetch_array($result);
        if ($found && array_key_exists($field, $row)) {
          return $row[$field];
        }

        trigger_error(
                sprintf(
                    '%s(): %s not found in MySQL result index %s',
                    __FUNCTION__,
                    $field,
                    spl_object_hash($result)
                ),
                E_USER_WARNING
            );
        // @codeCoverageIgnoreStart
        return false;
        // @codeCoverageIgnoreEnd
      }

      function mysql_num_rows($result)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        $previous = error_reporting(0);
        $rows = mysqli_num_rows($result);
        error_reporting($previous);

        return $rows;
      }

      function mysql_num_fields($result)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_num_fields($result);
      }

      function mysql_fetch_row($result)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_fetch_row($result) ?: false;
      }

      /**
       * Fetch result as assoc array.
       *
       * @param [type] $result
       * @param [type] $resultType
       *
       * @return array|null
       */
      function mysql_fetch_array($result, $resultType = MYSQL_BOTH)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_fetch_array($result, $resultType) ?: false;
      }

      /**
       * Fetch a result row as assoc array.
       * {@inheritDoc mysqli_fetch_assoc}.
       *
       * @param [type] $result
       *
       * @return array|null
       */
      function mysql_fetch_assoc($result) /* : array|null */
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_fetch_assoc($result) ?: false;
      }

      function mysql_fetch_object($result, $class = null, array $params = []) /* : object|null */
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        if (null === $class) {
          $object = mysqli_fetch_object($result);
        } else {
          $object = mysqli_fetch_object($result, $class, $params);
        }

        return $object ?: false;
      }

      function mysql_data_seek($result, $offset)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_data_seek($result, $offset);
      }

      function mysql_fetch_lengths($result) /* : array|*/
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_fetch_lengths($result);
      }

      function mysql_fetch_field($result) /* : object|*/
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_fetch_field($result);
      }

      function mysql_field_seek($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_field_seek($result, $field);
      }

      function mysql_free_result($result)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return mysqli_free_result($result);
      }

      function mysql_field_name($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return \UniversalFramework\MySQL::mysqlFieldInfo($result, $field, 'name');
      }

      function mysql_field_table($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return \UniversalFramework\MySQL::mysqlFieldInfo($result, $field, 'table');
      }

      function mysql_field_len($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return \UniversalFramework\MySQL::mysqlFieldInfo($result, $field, 'length');
      }

      function mysql_field_type($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return \UniversalFramework\MySQL::mysqlFieldInfo($result, $field, 'type');
      }

      function mysql_field_flags($result, $field)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        return \UniversalFramework\MySQL::mysqlFieldInfo($result, $field, 'flags');
      }

      function mysql_escape_string($unescapedString)
      {
        if (null === \UniversalFramework\MySQL::$last_connection) {
          trigger_error(
                    sprintf(
                        '%s() is insecure; use mysql_real_escape_string() instead!',
                        __FUNCTION__
                    ),
                    E_USER_NOTICE
                );

          return \UniversalFramework\MySQL::escapeString($unescapedString);
        }

        return mysql_real_escape_string($unescapedString, null);
      }

      function mysql_real_escape_string($unescapedString, mysqli $link = null)
      {
        return mysqli_escape_string(\UniversalFramework\MySQL::getConnection($link), $unescapedString);
      }

      function mysql_stat(mysqli $link = null)
      {
        return mysqli_stat(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_thread_id(mysqli $link = null)
      {
        return mysqli_thread_id(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_client_encoding(mysqli $link = null)
      {
        return mysqli_character_set_name(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_ping(mysqli $link = null)
      {
        return mysqli_ping(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_get_client_info(mysqli $link = null)
      {
        return mysqli_get_client_info(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_get_host_info(mysqli $link = null)
      {
        return mysqli_get_host_info(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_get_proto_info(mysqli $link = null)
      {
        return mysqli_get_proto_info(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_get_server_info(mysqli $link = null)
      {
        return mysqli_get_server_info(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_info(mysqli $link = null)
      {
        return mysqli_info(\UniversalFramework\MySQL::getConnection($link));
      }

      function mysql_set_charset($charset, mysqli $link = null)
      {
        return mysqli_set_charset(\UniversalFramework\MySQL::getConnection($link), $charset);
      }

      function mysql_db_name($result, $row, $field = 0)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        // Alias as per https://github.com/php/php-src/blob/PHP-5.6/ext/mysql/php_mysql.c#L319
        return mysql_result($result, $row, $field);
      }

      function mysql_tablename($result, $row)
      {
        if (!\UniversalFramework\MySQL::checkValidResult($result, __FUNCTION__)) {
          // @codeCoverageIgnoreStart
          return false;
          // @codeCoverageIgnoreEnd
        }

        // Alias as per http://lxr.php.net/xref/PHP_5_6/ext/mysql/php_mysql.c#321
        return mysql_result($result, $row, 'Table');
      }

      /* Aliases */

      function mysql_fieldname($result, $field)
      {
        return mysql_field_name($result, $field);
      }

      function mysql_fieldtable($result, $field)
      {
        return mysql_field_table($result, $field);
      }

      function mysql_fieldlen($result, $field)
      {
        return mysql_field_len($result, $field);
      }

      function mysql_fieldtype($result, $field)
      {
        return mysql_field_type($result, $field);
      }

      function mysql_fieldflags($result, $field)
      {
        return mysql_field_flags($result, $field);
      }

      function mysql_selectdb($databaseName, $link = null)
      {
        return mysql_select_db($databaseName, $link);
      }

      function mysql_freeresult($result)
      {
        return mysql_free_result($result);
      }

      function mysql_numfields($result)
      {
        return mysql_num_fields($result);
      }

      function mysql_numrows($result)
      {
        return mysql_num_rows($result);
      }

      function mysql_listdbs($link)
      {
        return mysql_list_dbs($link);
      }

      function mysql_listtables($databaseName, $link = null)
      {
        return mysql_list_tables($databaseName, $link);
      }

      function mysql_listfields($databaseName, $tableName, $link = null)
      {
        return mysql_list_fields($databaseName, $tableName, $link);
      }

      function mysql_dbname($result, $row, $field = 0)
      {
        return mysql_db_name($result, $row, $field);
      }

      function mysql_table_name($result, $row)
      {
        return mysql_tablename($result, $row);
      }
    }
}

namespace UniversalFramework {
    use mysqli;

    class MySQL
    {
      public static $last_connection = null;
      public static $connections = [];

      public function __construct(mysqli $sql)
      {
        static::$last_connection = $sql;
      }

      /**
       * Get mysqli intances.
       *
       * @param mysqli   $link
       * @param function $func
       *
       * @return false|mysqli
       */
      public static function getConnection($link = null, $func = null)
      {
        if (null !== $link) {
          static::$last_connection = $link;

          return $link;
        }

        if (null === static::$last_connection) {
          $err = 'A link to the server could not be established';
          if (null !== $func) {
            $err = $func . '(): no MySQL-Link resource supplied';
          }
          trigger_error($err, E_USER_WARNING);

          return false;
        }

        return static::$last_connection;
      }

      public static function mysqlFieldInfo(\mysqli_result $result, $field, $what)
      {
        try {
          $field = mysqli_fetch_field_direct($result, $field);
        } catch (\Exception $e) {
          trigger_error(
                    sprintf(
                        'mysql_field_%s(): Field %d is invalid for MySQL result index %s',
                        ('length' !== $what) ? $what : 'len',
                        $field,
                        spl_object_hash($result)
                    ),
                    E_USER_WARNING
                );
          // @codeCoverageIgnoreStart
          // PHPUnit turns the warning into an exception, so this never runs
          return false;
          // @codeCoverageIgnoreEnd
        }

        if ('type' === $what) {
          return static::getFieldType($field->type);
        }

        if ('flags' === $what) {
          return static::getFieldFlags($field->flags);
        }

        if (isset($field->{$what})) {
          return $field->{$what};
        }

        return false;
      }

      protected static function getFieldType($what)
      {
        $types = [
          MYSQLI_TYPE_STRING => 'string',
          MYSQLI_TYPE_VAR_STRING => 'string',
          MYSQLI_TYPE_ENUM => 'string',
          MYSQLI_TYPE_SET => 'string',

          MYSQLI_TYPE_LONG => 'int',
          MYSQLI_TYPE_TINY => 'int',
          MYSQLI_TYPE_SHORT => 'int',
          MYSQLI_TYPE_INT24 => 'int',
          MYSQLI_TYPE_CHAR => 'int',
          MYSQLI_TYPE_LONGLONG => 'int',

          MYSQLI_TYPE_DECIMAL => 'real',
          MYSQLI_TYPE_FLOAT => 'real',
          MYSQLI_TYPE_DOUBLE => 'real',
          MYSQLI_TYPE_NEWDECIMAL => 'real',

          MYSQLI_TYPE_TINY_BLOB => 'blob',
          MYSQLI_TYPE_MEDIUM_BLOB => 'blob',
          MYSQLI_TYPE_LONG_BLOB => 'blob',
          MYSQLI_TYPE_BLOB => 'blob',

          MYSQLI_TYPE_NEWDATE => 'date',
          MYSQLI_TYPE_DATE => 'date',
          MYSQLI_TYPE_TIME => 'time',
          MYSQLI_TYPE_YEAR => 'year',
          MYSQLI_TYPE_DATETIME => 'datetime',
          MYSQLI_TYPE_TIMESTAMP => 'timestamp',

          MYSQLI_TYPE_NULL => 'null',

          MYSQLI_TYPE_GEOMETRY => 'geometry',
        ];

        return isset($types[$what]) ? $types[$what] : 'unknown';
      }

      protected static function getFieldFlags($what)
      {
        // Order of flags taken from http://lxr.php.net/xref/PHP_5_6/ext/mysql/php_mysql.c#2507
        $flags = [
          MYSQLI_NOT_NULL_FLAG => 'not_null',
          MYSQLI_PRI_KEY_FLAG => 'primary_key',
          MYSQLI_UNIQUE_KEY_FLAG => 'unique_key',
          MYSQLI_MULTIPLE_KEY_FLAG => 'multiple_key',
          MYSQLI_BLOB_FLAG => 'blob',
          MYSQLI_UNSIGNED_FLAG => 'unsigned',
          MYSQLI_ZEROFILL_FLAG => 'zerofill',
          MYSQLI_BINARY_FLAG => 'binary',
          MYSQLI_ENUM_FLAG => 'enum',
          MYSQLI_SET_FLAG => 'set',
          MYSQLI_AUTO_INCREMENT_FLAG => 'auto_increment',
          MYSQLI_TIMESTAMP_FLAG => 'timestamp',
        ];

        $fieldFlags = [];
        foreach ($flags as $flag => $value) {
          if ($what & $flag) {
            $fieldFlags[] = $value;
          }
        }

        return implode(' ', $fieldFlags);
      }

      public static function checkValidResult($result, $function)
      {
        if (!($result instanceof \mysqli_result)) {
          if ('mysql_fetch_object' !== $function) {
            trigger_error(
                        $function . '() expects parameter 1 to be resource, ' . strtolower(gettype($result)) . ' given',
                        E_USER_WARNING
                    );
          }

          if ('mysql_fetch_object' === $function) {
            trigger_error(
                        $function . '(): supplied argument is not a valid MySQL result resource',
                        E_USER_WARNING
                    );
          }

          return false;
        }

        return true;
      }

      public static function escapeString($unescapedString)
      {
        $escapedString = '';
        for ($i = 0, $max = strlen($unescapedString); $i < $max; ++$i) {
          $escapedString .= self::escapeChar($unescapedString[$i]);
        }

        return $escapedString;
      }

      protected static function escapeChar($char)
      {
        switch ($char) {
                case "\0":
                    $esc = '\\0';
                    break;
                case "\n":
                    $esc = '\\n';
                    break;
                case "\r":
                    $esc = '\\r';
                    break;
                case '\\':
                case '\'':
                case '"':
                    $esc = "\\{$char}";
                    break;
                case "\032":
                    $esc = '\\Z';
                    break;
                default:
                    $esc = $char;
                    break;
            }

        return $esc;
      }
    }
}
