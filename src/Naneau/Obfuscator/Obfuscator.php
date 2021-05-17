<?php
/**
 * Obfuscator.php.
 */

namespace Naneau\Obfuscator;

use Exception;
use Naneau\Obfuscator\Obfuscator\Event\File as FileEvent;
use Naneau\Obfuscator\Obfuscator\Event\FileError as FileErrorEvent;
use PhpParser\NodeTraverserInterface as NodeTraverser;
use PhpParser\Parser;
use PhpParser\PrettyPrinter\Standard as PrettyPrinter;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RegexIterator;
use SplFileInfo;
use Symfony\Component\EventDispatcher\EventDispatcher;

/**
 * Obfuscator.
 *
 * Obfuscates a directory of files
 *
 * @category        Naneau
 */
class Obfuscator
{
    /**
     * the parser.
     *
     * @var Parser
     */
    private $parser;

    /**
     * the node traverser.
     *
     * @var NodeTraverser
     */
    private $traverser;

    /**
     * the "pretty" printer.
     *
     * @var PrettyPrinter
     */
    private $prettyPrinter;

    /**
     * the event dispatcher.
     *
     * @var EventDispatcher
     */
    private $eventDispatcher;

    /**
     * The file regex.
     *
     * @var string
     **/
    private $fileRegex = '/\.php$/';

    /**
     * Strip whitespace.
     *
     * @param string $directory
     * @param bool $stripWhitespace
     *
     * @return void
     **/
    public function obfuscate($directory, $stripWhitespace = false,
                              $ignoreError = false)
    {
        foreach ($this->getFiles($directory) as $file) {
            $this->getEventDispatcher()->dispatch(
                'obfuscator.file',
                new FileEvent($file)
            );

            // Write obfuscated source
            file_put_contents($file, $this->obfuscateFileContents($file,
                $ignoreError));

            // Strip whitespace if required
            if ($stripWhitespace) {
                file_put_contents($file, php_strip_whitespace($file));
            }
        }
    }

    /**
     * Get the file list.
     *
     * @return SplFileInfo
     **/
    private function getFiles($directory)
    {
        return new RegexIterator(
            new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($directory)
            ),
            $this->getFileRegex()
        );
    }

    /**
     * Get the regex for file inclusion.
     *
     * @return string
     */
    public function getFileRegex()
    {
        return $this->fileRegex;
    }

    /**
     * Set the regex for file inclusion.
     *
     * @param string $fileRegex
     *
     * @return Obfuscator
     */
    public function setFileRegex($fileRegex)
    {
        $this->fileRegex = $fileRegex;

        return $this;
    }

    /**
     * Get the event dispatcher.
     *
     * @return EventDispatcher
     */
    public function getEventDispatcher()
    {
        return $this->eventDispatcher;
    }

    /**
     * Set the event dispatcher.
     *
     * @return Obfuscator
     */
    public function setEventDispatcher(EventDispatcher $eventDispatcher)
    {
        $this->eventDispatcher = $eventDispatcher;

        return $this;
    }

    /**
     * Obfuscate a single file's contents.
     *
     * @param string $file
     * @param bool $ignoreError if true, do not throw an Error and
     *                            exit, but continue with next file
     *
     * @return string obfuscated contents
     **/
    private function obfuscateFileContents($file, $ignoreError)
    {
        try {
            // Input code
            $source = php_strip_whitespace($file);

            // Get AST
            $ast = $this->getTraverser()->traverse(
                $this->getParser()->parse($source)
            );

            return "<?php\n" . $this->getPrettyPrinter()->prettyPrint($ast);
        } catch (Exception $e) {
            if ($ignoreError) {
                sprintf('Could not parse file "%s"', $file);
                $this->getEventDispatcher()->dispatch(
                    'obfuscator.file.error',
                    new FileErrorEvent($file, $e->getMessage())
                );
            } else {
                throw new Exception(sprintf('Could not parse file "%s"', $file), null, $e);
            }
        }
    }

    /**
     * Get the node traverser.
     *
     * @return NodeTraverser
     */
    public function getTraverser()
    {
        return $this->traverser;
    }

    /**
     * Set the node traverser.
     *
     * @return Obfuscator
     */
    public function setTraverser(NodeTraverser $traverser)
    {
        $this->traverser = $traverser;

        return $this;
    }

    /**
     * Get the parser.
     *
     * @return Parser
     */
    public function getParser()
    {
        return $this->parser;
    }

    /**
     * Set the parser.
     *
     * @return Obfuscator
     */
    public function setParser(Parser $parser)
    {
        $this->parser = $parser;

        return $this;
    }

    /**
     * Get the "pretty" printer.
     *
     * @return PrettyPrinter
     */
    public function getPrettyPrinter()
    {
        return $this->prettyPrinter;
    }

    /**
     * Set the "pretty" printer.
     *
     * @return Obfuscator
     */
    public function setPrettyPrinter(PrettyPrinter $prettyPrinter)
    {
        $this->prettyPrinter = $prettyPrinter;

        return $this;
    }
}
