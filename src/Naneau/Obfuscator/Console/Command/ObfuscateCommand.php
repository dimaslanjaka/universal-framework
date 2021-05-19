<?php
/**
 * ObfuscateCommand.php.
 */

namespace Naneau\Obfuscator\Console\Command;

use InvalidArgumentException;
use Naneau\Obfuscator\Container;
use Naneau\Obfuscator\Obfuscator;
use Naneau\Obfuscator\Obfuscator\Event\File as FileEvent;
use Naneau\Obfuscator\Obfuscator\Event\FileError as FileErrorEvent;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * ObfuscateCommand.
 *
 * Obfuscating command
 *
 * @category        Naneau
 */
class ObfuscateCommand extends Command
{
  /**
   * the obfuscator.
   *
   * @var Obfuscator
   */
  private $obfuscator;

  /**
   * the container.
   *
   * @var Container
   */
  private $container;

  /**
   * Configure the command.
   *
   * @return void
   **/
  protected function configure()
  {
    $this
            ->setName('obfuscate')
            ->setDescription('Obfuscate a directory of PHP files')
            ->addArgument(
                'input_directory',
                InputArgument::REQUIRED,
                'Directory of source files, if no output directory is given, it will be overwritten'
            )
            ->addArgument(
                'output_directory',
                InputArgument::OPTIONAL,
                'Output directory'
            )->addOption(
                'leave_whitespace',
                null,
                InputOption::VALUE_NONE,
                'Leave whitespace in output?'
            )->addOption(
                'ignore_error',
                null,
                InputOption::VALUE_NONE,
                'Continue processing the next file when error is encountered'
            )->addOption(
                'config',
                null,
                InputOption::VALUE_REQUIRED,
                'Configuration file to use'
            )->addOption(
                'memory_limit',
                null,
                InputOption::VALUE_REQUIRED,
                'Runtime memory when running the obsfucator. ' .
                'Example: 128M ' .
                'See http://php.net/manual/en/ini.core.php#ini.memory-limit'
            );

    $this->setContainer(new Container());
  }

  /**
   * Execute the command.
   *
   * @return void
   **/
  protected function execute(InputInterface $input, OutputInterface $output)
  {
    // Finalize the container
    $this->finalizeContainer($input);

    // Change runtime memory
    if ($memory = $input->getOption('memory_limit')) {
      ini_set('memory_limit', $memory);
    }
    // Input/output dirs
    $inputDirectory = $input->getArgument('input_directory');
    $outputDirectory = $input->getArgument('output_directory');

    if (!empty($outputDirectory)) {
      $output->writeln(sprintf(
                'Copying input directory <info>%s</info> to <info>%s</info>',
                $inputDirectory,
                $outputDirectory
            ));

      $this->copyDir($inputDirectory, $outputDirectory);

      $directory = $outputDirectory;
    } else {
      $directory = $inputDirectory;
    }

    // Strip whitespace?
    $stripWhitespace = !$input->getOption('leave_whitespace');
    $ignoreError = (bool) $input->getOption('ignore_error');

    // Show every file
    $this->getObfuscator()->getEventDispatcher()->addListener(
            'obfuscator.file',
            function (FileEvent $event) use ($output, $directory) {
              $output->writeln(sprintf(
                    'Obfuscating <info>%s</info>',
                    substr($event->getFile(), strlen($directory))
                ));
            }
        );
    // Show error processing file
    if ($ignoreError) {
      $this->getObfuscator()->getEventDispatcher()->addListener(
                'obfuscator.file.error',
                function (FileErrorEvent $event) use ($output, $directory) {
                  $output->writeln(sprintf(
                        'Error obfuscating <error>%s</error>',
                        substr($event->getFile(), strlen($directory))
                    ));
                  $output->writeln(sprintf(
                        'Parsing error: <error>%s</error>', $event->getErrorMessage()
                    ));
                }
            );
    }

    // Actual obfuscation
    $this->getObfuscator()->obfuscate($directory, $stripWhitespace,
            $ignoreError);
  }

  /**
   * Finalize the container.
   *
   * loads any given config file and compiles the container
   *
   * @return ObfuscateCommand
   **/
  private function finalizeContainer(InputInterface $input)
  {
    // Load config if given
    $config = $input->getOption('config');
    if (!empty($config)) {
      if (!is_readable($config)) {
        throw new InvalidArgumentException(sprintf('Can not read config file "%s"', $config));
      }
      $this->getContainer()->loadFile($config);
    }

    $this->getContainer()->getContainer()->compile();

    return $this;
  }

  /**
   * Get the container.
   *
   * @return Container
   */
  public function getContainer()
  {
    return $this->container;
  }

  /**
   * Set the container.
   *
   * @return ObfuscateCommand
   */
  public function setContainer(Container $container)
  {
    $this->container = $container;

    return $this;
  }

  /**
   * Copy a directory.
   *
   * @param string $from
   * @param string $to
   *
   * @return ObfuscateCommand
   **/
  private function copyDir($from, $to)
  {
    // FIXME implement native copy
    $output = [];
    $return = 0;

    if ('WIN' === strtoupper(substr(PHP_OS, 0, 3))) {
      // WINDOWS
      $command = sprintf('XCOPY "%s" "%s" /hievry', $from, $to);
    } else {
      // *NIX
      $command = sprintf('cp -rf %s %s', $from, $to);
    }

    exec($command, $output, $return);

    if (0 !== $return) {
      throw new \Exception('Could not copy directory');
    }

    return $this;
  }

  /**
   * Get the obfuscator.
   *
   * @return Obfuscator
   */
  public function getObfuscator()
  {
    return $this->getContainer()->getContainer()->get('obfuscator');
  }
}
