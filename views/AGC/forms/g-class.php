<?php
/*
 * User Class
 * This class is used for database related (connect, insert, and update) operations
 * @author    CodexWorld.com
 * @url        http://www.codexworld.com
 * @license    http://www.codexworld.com/license
 */

class GUser
{
  private $dbHost = DB_HOST;
  private $dbUsername = DB_USER;
  private $dbPassword = DB_PASSWORD;
  private $dbName = DB_NAME;
  private $userTbl = DB_USER_TBL;
  private $sql = 'CREATE TABLE IF NOT EXIST `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `oauth_provider` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
    `oauth_uid` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `first_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `last_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    `gender` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
    `locale` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
    `picture` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    `link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;';

  public function __construct()
  {
    if (!isset($this->db)) {
      // Connect to the database
      $conn = new mysqli($this->dbHost, $this->dbUsername, $this->dbPassword, $this->dbName);
      if ($conn->connect_error) {
        die('Failed to connect with MySQL: ' . $conn->connect_error);
      } else {
        $this->db = $conn;
        $this->db->query($this->sql);
      }
    }
  }

  public function checkUser($userData = [])
  {
    if (!empty($userData)) {
      // Check whether user data already exists in the database
      $checkQuery = 'SELECT * FROM ' . $this->userTbl . " WHERE oauth_provider = '" . $userData['oauth_provider'] . "' AND oauth_uid = '" . $userData['oauth_uid'] . "'";
      $checkResult = $this->db->query($checkQuery);
      if ($checkResult->num_rows > 0) {
        // Update user data if already exists
        $query = 'UPDATE ' . $this->userTbl . " SET first_name = '" . $userData['first_name'] . "', last_name = '" . $userData['last_name'] . "', email = '" . $userData['email'] . "', gender = '" . $userData['gender'] . "', locale = '" . $userData['locale'] . "', picture = '" . $userData['picture'] . "', link = '" . $userData['link'] . "', modified = NOW() WHERE oauth_provider = '" . $userData['oauth_provider'] . "' AND oauth_uid = '" . $userData['oauth_uid'] . "'";
        $update = $this->db->query($query);
      } else {
        // Insert user data in the database
        $query = 'INSERT INTO ' . $this->userTbl . " SET oauth_provider = '" . $userData['oauth_provider'] . "', oauth_uid = '" . $userData['oauth_uid'] . "', first_name = '" . $userData['first_name'] . "', last_name = '" . $userData['last_name'] . "', email = '" . $userData['email'] . "', gender = '" . $userData['gender'] . "', locale = '" . $userData['locale'] . "', picture = '" . $userData['picture'] . "', link = '" . $userData['link'] . "', created = NOW(), modified = NOW()";
        $insert = $this->db->query($query);
      }

      // Get user data from the database
      $result = $this->db->query($checkQuery);
      $userData = $result->fetch_assoc();
    }

    // Return user data
    return $userData;
  }
}
