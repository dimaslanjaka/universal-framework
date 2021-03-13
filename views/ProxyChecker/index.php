<?php

namespace ProxyChecker;

use Exception;

include __DIR__ . '/ProxyChecker.php';
$table = [];
trycatch(function () {
    global $table;
    $pingUrl = 'https://wp.webmanajemen.com/ProxyChecker/ping';
    $proxies = file(ROOT . '/views/AGC/forms/proxy.txt');
    shuffle($proxies);
    $proxies = array_slice($proxies, 1, 2);
    $proxyChecker = new ProxyChecker($pingUrl);
    $results = $proxyChecker->checkProxies($proxies);
    foreach ($results as $proxy => $res) {
        $data = $res;
        $data['proxy'] = $proxy;
        if (!isset($res['error']))  $table[] = $data;
    }
});
//printr($table);
?>

<table class="table">
    <thead>
        <tr>
            <th>Proxy</th>
            <th>Allow</th>
            <th>Level</th>
            <th>Info</th>
        </tr>
    </thead>
    <tbody>
        <?php
        if (!empty($table)) {
            foreach ($table as $row) {
                echo '<tr>';
                echo '<td>' . $row['proxy'] . '</td>';
                echo '<td>' . implode('<br>', $row['allowed']) . '</td>';
                echo '<td>' . $row['proxy_level'] . '</td>';
                echo '<td>' . multi_implode('<br>', $row['info']) . '</td>';
                echo '</tr>';
            }
        } else {
            echo '<tr><td class="text-center" colspan="4">Nothing to show</td></tr>';
        }
        ?>
    </tbody>
</table>

<?php

function implode2($glue, $array)
{
}


/**
 * Build Table From Multidimensional Array.
 *
 * @param array $data
 * @param array $config
 * @see http://web-manajemen.blogspot.com/p/search.html?q=WMI+HTML+TABLE+FROM+ARRAY
 * @return string
 */
function html_table($data = [], $config = [])
{
    if (empty($data)) return '';
    if (is_object($data)) throw new Exception('$data is instance of stdClass');
    $tableConfig = [
        'table' => [
            'class' => 'table',
        ],
        'thead' => [
            'class' => ''
        ],
        'tbody' => [
            'class' => ''
        ],
        'row' => [
            'class' => '',
            'separator' => ''
        ],
        'cell' => [
            'class' => '',
            'separator' => '<br/>',
        ],
        'filter' => ''
    ];
    $config = array_replace($tableConfig, (array) $config);
    $table = [];
    foreach ($data as $tkey => $row) {
        $rowx = '<tr class="' . $config['row']['class'] . '">';
        $rowkey = 'default';
        foreach ($row as $key => $cell) {
            if (!in_array($key, $table)) $table[] = $key;
            $rowkey = $key;
            if (is_array($cell)) $cell = multi_implode($config['cell']['separator'], $cell);
            $rowx .= "<td class='{$config['cell']['class']}'>{$cell}</td>";
        }
        $rowx .= '</tr>';
        $rows[$rowkey][] = $rowx;
    }
    $html = [
        "<table class='" . $config['table']['class'] . "'>",
        '<thead class="' . $config['thead']['class'] . '"><th>' . implode('</th><th>', array_keys($table)) . '</th></thead>',
        '<tbody class="' . $config['tbody']['class'] . '">' . printr('', $table) . '</tbody>',
        '</table>'
    ];

    return implode('', $html);
}
/**
 * Implode Multidimesional Array.
 *
 * @param string $glue
 * @param array  $array
 *
 * @return string
 */
function multi_implode($glue, $array)
{
    $ret = '';
    if (!is_array($array)) {
        return $array;
    }
    foreach ($array as $item) {
        if (is_array($item)) {
            $ret .= multi_implode($glue, $item) . $glue;
        } else {
            $ret .= $item . $glue;
        }
    }

    $ret = substr($ret, 0, 0 - strlen($glue));

    return $ret;
}
