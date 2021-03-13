<?php

/**
 * PHPProxyChecker example.
 * @author Stanislav Afanasiev <stas.progger[at]gmail.com>
 * @created 15.12.2010
 * @version 1.0
 */

// simple debug :)
error_reporting(0);

// required variables
define('HTTP_GATE', 'http://' . $_SERVER['HTTP_HOST'] . '/proxy/gate'); // Gate for check HTTP,SOCKS proxy
define('HTTPS_GATE', 'https://' . $_SERVER['HTTP_HOST'] . '/proxy/gate'); // Gate for check HTTPS proxy
define('CHECK_TIMEOUT', 10); // Curl timeout request

//require_once 'PHPProxyChecker.class.php';
if (!empty($_POST['proxyIp'])) {
    $resultQuery = PHPProxyChecker::checkProxy($_POST['proxyIp']);


    /*echo '<pre>';
        print_r($resultQuery);
        echo '</pre>';*/

    if ($resultQuery['NOT_WORKING'] != 'Y') {
        echo '<table border=1>';
        // echo proxy ip
        echo '<tr>';
        echo '<td>Checking proxy:</td>';
        echo '<td><b>' . $resultQuery['PROXY_IP'] . ':' . $resultQuery['PROXY_PORT'] . '</b></td>';
        echo '</tr>';

        // echo type
        if ($resultQuery['TYPE'] == 'HTTP') {
            echo '<tr>';
            echo '<td>Type:</td>';

            // color to type
            if ($resultQuery['TYPE_CODE'] == 0) {
                $color = 'red';
            } elseif ($resultQuery['TYPE_CODE'] == 1) {
                $color = 'orange';
            } elseif ($resultQuery['TYPE_CODE'] == 2) {
                $color = 'green';
            }

            echo '<td>' . $resultQuery['TYPE'] . ' (<font color=' . $color . '><b>' . $resultQuery['TYPE_NAME'] . '</b></font>)</td>';
            echo '</tr>';
        } else {
            echo '<tr>';
            echo '<td>Type:</td>';
            echo '<td>' . $resultQuery['TYPE'] . '</td>';
            echo '</tr>';
        }

        // echo query time
        echo '<tr>';
        echo '<td>Response time:</td>';
        echo '<td>' . $resultQuery['QUERY_TIME'] . '</td>';
        echo '</tr>';

        // echo supported request
        echo '<tr>';
        echo '<td>Supported queries:</td>';

        $tdStr = '';
        foreach ($resultQuery as $key => $val) {

            if (strstr($key, 'SUPPORT_')) {
                $tmp = explode('_', $key);
                if ($val == 'Y') {
                    $tdStr .= '<font color="green">' . $tmp[1] . '</font> ';
                } else {
                    $tdStr .= '<font color="red"><s>' . $tmp[1] . '</s></font> ';
                }
            }
        }
        echo '<td>' . $tdStr . '</td>';
        echo '</tr>';
    } else {
        echo 'No response.';
    }
    echo '</table>';
    echo '<a href="">Repeat check!</a>';
    exit();
}

?>
<html>

<head>
    <title>PHPProxyChecker class v1.0 - Example use</title>
</head>

<body>
    <form action="" method="POST">
        <p>
            Proxy (IP:PORT) <input type="text" value="" name="proxyIp" maxlength="30">
        </p>
        <p>
            <input type="submit" value="CheckIt!">
        </p>
    </form>
</body>

</html>