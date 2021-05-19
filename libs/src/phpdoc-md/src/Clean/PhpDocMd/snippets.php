<?php
/**
 * Used by ./bin/phpdoc-md script
 */

namespace Clean\PhpDocMd;

use Clean\PhpDocMd\Markdown\ClassInfo;
use Exception;
use ReflectionClass;
use RuntimeException;

$verbose = is_cli() && in_array('-v', $argv);
# Reset
const Reset = "\033[0m";       # Text Reset

# Regular Colors
const Black = "\033[0;30m";       # Black
const Red = "\033[0;31m";       # Red
const Green = "\033[0;32m";     # Green
const Yellow = "\033[0;33m";     # Yellow
const Blue = "\033[0;34m";    # Blue
const Purple = "\033[0;35m";   # Purple
const Cyan = "\033[0;36m";     # Cyan
const White = "\033[0;37m";    # White

/**
 * Returns class info parser object for specified format and given reflection object
 *
 * @param string $format format
 * @param ReflectionClass $reflection reflection
 * @access public
 *
 * @return ClassInfo
 */
function getClassInfoParser($format, ReflectionClass $reflection)
{
    switch ($format) {
        case 'stash':
        case 'bitbucket':
            $parser = new Markdown\Stash\ClassInfo($reflection);
            break;
        case 'github':
            $parser = new Markdown\GitHub\ClassInfo($reflection);
            break;
        default:
            throw new RuntimeException(sprintf("Unknow markdown format '%s'. Only 'github' or 'bitbucket' allowed. Check your .phpdoc-md config file", $format));
    }
    return $parser;

}

/**
 * Returns path to destination directory for given object
 *
 * Destination path is created base based on object namespace and configuration
 * parameters
 *
 * @param ReflectionClass $reflection reflection
 * @param string $rootNamespace rootNamespace
 * @param string $rootDir rootDir
 * @access public
 *
 * @return string
 */
function getDestinationDirectory(ReflectionClass $reflection, $rootNamespace, $rootDir)
{
    return namespaceToPath(
        rtrim(
            sprintf(
                '%s/%s',
                $rootDir,
                removeRootNamespace($reflection->getNamespaceName(), $rootNamespace)
            ),
            '/'
        )
    );
}

/**
 * Transform namespace to valid path format for current OS
 *
 * @param string $namespace namespace
 * @access public
 *
 * @return string
 */
function namespaceToPath($namespace)
{
    return str_replace(
        '\\',
        DIRECTORY_SEPARATOR,
        $namespace
    );
}

/**
 * Removes root namespace from class name
 *
 * This will simply transform:
 *
 * \Clean\Example\Namespace\FooClass to \Namespace\FooClass
 *
 * when root namespace \Clean\Example given
 *
 * @param string $namespace namespace
 * @param string $root root
 * @access public
 *
 * @return string
 */
function removeRootNamespace($namespace, $root)
{
    $re = preg_replace(
        sprintf("/^%s/", addslashes($root)),
        '',
        $namespace
    );
    return ltrim($re, '\\');
}

/**
 * Output error message for the user, and exit
 *
 * @param string $message message
 * @param Exception $exception exception
 * @access public
 *
 * @return void
 */
function error($message, $exception = null)
{
    printf((is_cli() && Red) . "\eERROR: %s\e0\n" . (is_cli() && Reset), trim($message));
    exit(1);
}

/**
 * Is current script run on shell/cli?
 * @return bool
 */
function is_cli()
{
    return (php_sapi_name() === 'cli' && isset($argv));
}

/**
 * Output info message for the user
 *
 * @param string $message message
 *
 * @return void
 */
function info($message, $verbose = false)
{
    if (is_cli()) {
        printf(White . "INFO: %s\n" . Reset, trim($message));
    } else {
        printf("INFO: %s\n", trim($message));
    }
}

if (!function_exists('str_starts_with')) {
    /**
     * Is String Starts With Substring?
     * @author Laravel Framework <?>
     * @see https://github.com/laravel/framework/blob/8.x/src/Illuminate/Support/Str.php
     * @noinspection PhpUnused
     */
    function str_starts_with($haystack, $needle)
    {
        return (string)$needle !== '' && strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}

if (!function_exists('str_ends_with')) {
    /**
     * Is String Ends With Substring?
     * @author Laravel Framework <?>
     * @see https://github.com/laravel/framework/blob/8.x/src/Illuminate/Support/Str.php
     * @noinspection PhpUnused
     */
    function str_ends_with($haystack, $needle)
    {
        return $needle !== '' && substr($haystack, -strlen($needle)) === (string)$needle;
    }
}

if (!function_exists('str_contains')) {
    /**
     * Is String Contains Substring?
     * @author Laravel Framework <?>
     * @see https://github.com/laravel/framework/blob/8.x/src/Illuminate/Support/Str.php
     * @noinspection PhpUnused
     */
    function str_contains($haystack, $needle)
    {
        return $needle !== '' && mb_strpos($haystack, $needle) !== false;
    }
}