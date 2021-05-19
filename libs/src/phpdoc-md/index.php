<?php /** @noinspection PhpUndefinedVariableInspection */
/**
 * phpdoc markdown
 * @see https://github.com/clean/phpdoc-md
 */
require __DIR__ . '/vendor/autoload.php';

use Clean\PhpDocMd\Markdown\GitHub\Readme as GithubReadme;
use Clean\PhpDocMd\Markdown\Stash\Readme as StashReadme;
use function Clean\PhpDocMd\error;
use function Clean\PhpDocMd\getClassInfoParser;
use function Clean\PhpDocMd\getDestinationDirectory;
use function Clean\PhpDocMd\info;
use function Clean\PhpDocMd\is_cli;
use function Clean\PhpDocMd\namespaceToPath;
use function Clean\PhpDocMd\removeRootNamespace;

$fileC = ".phpdoc-md";
$verbose = is_cli() && in_array('-v', $argv);
if (!is_cli()) {
    header('Content-Type: text/plain; charset=utf-8');
} else {
    if (isset($argv[1]) && file_exists(getcwd() . '/' . $argv[1])) {
        $fileC = $argv[1];
    }
    if (in_array('-h', $argv)) {
        echo <<<INFOBLOCK
Usage: index.php [options]

Options:
 -h    Display this help message
 -v    Verbose output
INFOBLOCK;
        exit;
    }
}

function init($fileC)
{
    define("CONFIG_FILENAME", $fileC);

    if (file_exists(getcwd() . '/' . CONFIG_FILENAME)) {
        /**
         * @noinspection PhpIncludeInspection
         * @var Object
         */
        $config = require(getcwd() . '/' . CONFIG_FILENAME);
    } else {
        error('Unable to load config ' . CONFIG_FILENAME . ' configuration file');
    }

    parseMd($config);
}

function parseMd($config)
{
    global $verbose;
    switch ($config->format) {
        case 'github':
            $readme = new GithubReadme($config->rootNamespace);
            break;
        case 'stash':
        case 'bitbucket':
            $readme = new StashReadme($config->rootNamespace);
            break;
        default:
            error(sprintf("Unknown markdown format '%s'. Only 'github' or 'bitbucket' allowed. Check your .phpdoc-md config file", $config->format));
    }

    /** @noinspection DuplicatedCode */
    foreach ($config->classes as $className) {
        try {
            $reflection = new ReflectionClass($className);
            $parser = getClassInfoParser($config->format, $reflection);

            $destDir = getDestinationDirectory($reflection, $config->rootNamespace, $config->destDirectory);
            $destFile = sprintf('%s.md', $reflection->getShortName());

            info(sprintf('Generating %s/%s from %s', $destDir, $destFile, $className), $verbose);

            file_exists($destDir) || mkdir($destDir, 0777, true);
            file_put_contents($destDir . DIRECTORY_SEPARATOR . $destFile, $parser);

            $readme->addLink(
                removeRootNamespace($reflection->getName(), $config->rootNamespace),
                namespaceToPath(
                    removeRootNamespace(
                        $reflection->getName(),
                        $config->rootNamespace
                    )
                ) . '.md'
            );
        } catch (RuntimeException $e) {
            error($e->getMessage());
        } catch (ReflectionException $e) {
            error($e->getMessage());
        }
    }
}