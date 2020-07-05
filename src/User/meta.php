<?php

namespace User;

class meta
{
  /**
   * PDO instance.
   *
   * @var \DB\pdo
   */
  private $pdo;

  public function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }

  /**
   * Insert new usermeta.
   *
   * @param mixed $other
   *
   * @return array
   */
  public function insert(int $userid, string $key, array $value, $other = null)
  {
    $json = json_encode($value);
    if (null !== $other) {
      if (\ArrayHelper\helper::is_iterable($other)) {
        $other = json_encode($other);
      } elseif (is_bool($other)) {
        settype($other, 'integer');
      }
    }
    $sql = "INSERT INTO `usermeta` (`uid`, `key`, `value`, `other`) VALUES ('$userid', '$key', '$json', $other);";

    return $this->pdo->query($sql)->exec();
  }

  /**
   * Get user meta.
   *
   * @return void
   */
  public function get(int $userid, string $key)
  {
    $get = $this->pdo->select('usermeta')->where(['uid' => $userid, 'key' => $key])->row_array();
    if (\ArrayHelper\helper::isAssoc($get)) {
      if (isset($get['value'])) {
        if (is_json($get['value'])) {
          $get['value'] = json_decode($get['value'], true);
        }
      }
      if (isset($get['other'])) {
        if (is_json($get['other'])) {
          $get['other'] = json_decode($get['other'], true);
        }
      }
    }

    return $get;
  }
}
