<?php
header('Content-Type: text/plain; charset=utf-8');
require_once __DIR__ . '/../vendor/autoload.php';

use phpDocumentor\Reflection\DocBlockFactory;

$factory = DocBlockFactory::createInstance();

$path = __DIR__ . '/../src';

$files = getDirContents($path);

$namespaces = [];
$construct = [];
foreach ($files as $file) {
    if (is_file($file)) {
        if (str_ends_with($file, ".php")) {
            $content = file_get_contents($file);
            $re = '/namespace\s([a-zA-Z0-9\\\\]+);/m';
            preg_match_all($re, $content, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                if (isset($matches[0][1])) {
                    $construct[$matches[0][1]] = [];
                    $namespaces[] = $matches[0][1];
                }
            } else {
                echo sprintf("%s namespace not found\n", $file);
                echo $content . PHP_EOL . PHP_EOL;
            }
        } else {
            echo sprintf("%s not php\n", $file);
        }
    }
}

/**
 * Get all files in folder including subdirectories on it
 * @param $dir
 * @param array $results
 * @return array
 */
function getDirContents($dir, &$results = array())
{
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = $path;
        } else if ($value != "." && $value != "..") {
            getDirContents($path, $results);
            $results[] = $path;
        }
    }

    return $results;
}