<?php
/**
 * The file that handles parsing error events.
 */

namespace Naneau\Obfuscator\Obfuscator\Event;

/**
 * FileError.
 *
 * The file being obfuscated that causes an error
 *
 * @category        Naneau
 */
class FileError extends File
{
  /**
   * The error message from Exception.
   *
   * @var string
   **/
  private $errorMessage;

  /**
   * Constructor.
   *
   * @param string $file
   *
   * @return void
   **/
  public function __construct($file, $errorMessage)
  {
    parent::setFile($file);
    $this->errorMessage = $errorMessage;
  }

  /**
   * Get the error message.
   *
   * @return string
   */
  public function getErrorMessage()
  {
    return $this->errorMessage;
  }
}
