<?php
/**
 * Scrambler.php.
 */

namespace Naneau\Obfuscator\Node\Visitor;

use InvalidArgumentException;
use Naneau\Obfuscator\StringScrambler;
use PhpParser\Node;
use PhpParser\NodeVisitorAbstract;

/**
 * Scrambler.
 *
 * Base class for scrambling visitors
 *
 * @category        Naneau
 */
abstract class Scrambler extends NodeVisitorAbstract
{
  /**
   * The string scrambler.
   *
   * @var StringScrambler
   **/
  private $scrambler;

  /**
   * Variables to ignore.
   *
   * @var string[]
   **/
  private $ignore = [];

  /**
   * Constructor.
   *
   * @return void
   **/
  public function __construct(StringScrambler $scrambler)
  {
    $this->setScrambler($scrambler);
  }

  /**
   * Add a variable name to ignore.
   *
   * @param string|string[] $ignore
   *
   * @return RenameParameterVisitor
   **/
  public function addIgnore($ignore)
  {
    if (is_string($ignore)) {
      $this->ignore = array_merge($this->ignore, [$ignore]);
    } elseif (is_array($ignore)) {
      $this->ignore = array_merge($this->ignore, $ignore);
    } else {
      throw new InvalidArgumentException('Invalid ignore type passed');
    }

    return $this;
  }

  /**
   * Scramble a property of a node.
   *
   * @param string $var property to scramble
   *
   * @return Node
   **/
  protected function scramble(Node $node, $var = 'name')
  {
    // String/value to scramble
    $toScramble = $node->$var;

    // We ignore to scramble if it's not string (ex: a variable variable name)
    if (!is_string($toScramble)) {
      return;
    }

    // Make sure there's something to scramble
    if (0 === strlen($toScramble)) {
      throw new InvalidArgumentException(sprintf('"%s" value empty for node, can not scramble', $var));
    }

    // Should we ignore it?
    if (in_array($toScramble, $this->getIgnore())) {
      return $node;
    }

    // Prefix with 'p' so we dont' start with an number
    $node->$var = $this->scrambleString($toScramble);

    // Return the node
    return $node;
  }

  /**
   * Get variables to ignore.
   *
   * @return string[]
   */
  public function getIgnore()
  {
    return $this->ignore;
  }

  /**
   * Set variables to ignore.
   *
   * @param string[] $ignore
   *
   * @return parent
   */
  public function setIgnore(array $ignore)
  {
    $this->ignore = $ignore;

    return $this;
  }

  /**
   * Scramble a string.
   *
   * @param string $string
   *
   * @return string
   **/
  protected function scrambleString($string)
  {
    return 's' . $this->getScrambler()->scramble($string);
  }

  /**
   * Get the string scrambler.
   *
   * @return StringScrambler
   */
  public function getScrambler()
  {
    return $this->scrambler;
  }

  /**
   * Set the string scrambler.
   *
   * @return RenameParameter
   */
  public function setScrambler(StringScrambler $scrambler)
  {
    $this->scrambler = $scrambler;

    return $this;
  }
}
