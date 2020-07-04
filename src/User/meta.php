<?php

namespace User;

class meta
{
  /**
   * PDO instance
   *
   * @var \DB\pdo
   */
  private $pdo;
  function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
  }
  /**
   * Insert new usermeta
   *
   * @param integer $userid
   * @param string $key
   * @param array $value
   * @param mixed $other
   * @return array
   */
  function insert(int $userid, string $key, array $value, $other = NULL)
  {
    $json = json_encode($value);
    if ($other !== null) {
      if (\ArrayHelper\helper::is_iterable($other)) {
        $other = json_encode($other);
      } else if (is_bool($other)) {
        settype($other, 'integer');
      }
    }
    $sql = "INSERT INTO `usermeta` (`uid`, `key`, `value`, `other`) VALUES ('$userid', '$key', '$json', $other);";
    return $this->pdo->query($sql)->exec();
  }
}
