<?php

namespace DB;

use Filemanager\file;

class manager
{
    public function backup_tables($host, $user, $pass, $name, $nama_file, $tables = '*')
    {
        $link = mysqli_connect($host, $user, $pass);
        $return = 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    SET AUTOCOMMIT = 0;
    START TRANSACTION;
    SET time_zone = "+00:00";
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8mb4 */;';
        mysqli_select_db($link, $name);
        if ('*' == $tables) {
            $tables = [];
            $result = mysqli_query($link, 'SHOW TABLES');
            while ($row = mysqli_fetch_row($result)) {
                $tables[] = $row[0];
            }
        } else {
            $tables = is_array($tables) ? $tables : explode(',', $tables);
        }
        foreach ($tables as $table) {
            $result = mysqli_query($link, 'SELECT * FROM ' . $table);
            $num_fields = mysqli_num_fields($result);
            $return .= 'DROP TABLE IF EXISTS `' . $table . '`;';
            $row2 = mysqli_fetch_row(mysqli_query($link, 'SHOW CREATE TABLE ' . $table));
            $return .= "\n\n" . $row2[1] . ";\n\n";
            for ($i = 0; $i < $num_fields; ++$i) {
                while ($row = mysqli_fetch_row($result)) {
                    $return .= 'INSERT INTO `' . $table . '` VALUES(';
                    for ($j = 0; $j < $num_fields; ++$j) {
                        $row[$j] = addslashes($row[$j]);
                        $row[$j] = str_replace("\n", '\\n', $row[$j]); //ereg_replace
                        if (isset($row[$j])) {
                            $return .= '"' . $row[$j] . '"';
                        } else {
                            $return .= '""';
                        }
                        if ($j < ($num_fields - 1)) {
                            $return .= ',';
                        }
                    }
                    $return .= ");\n";
                }
            }
            $return .= "\n\n\n";
        }
        $return .= '/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    ';
        file::file(__DIR__ . '/backup/' . str_replace('.sql', '', $nama_file) . '.sql', $return, true);

        return $return;
    }
}
