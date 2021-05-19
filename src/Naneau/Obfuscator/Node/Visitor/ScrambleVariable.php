<?php
/**
 * ScrambleVariable.php.
 *
 * @category        Naneau
 */

namespace Naneau\Obfuscator\Node\Visitor;

use Naneau\Obfuscator\Node\Visitor\Scrambler as ScramblerVisitor;
use Naneau\Obfuscator\StringScrambler;
use PhpParser\Node;
use PhpParser\Node\Expr\ClosureUse;
use PhpParser\Node\Expr\Variable;
use PhpParser\Node\Param;
use PhpParser\Node\Stmt\Catch_ as CatchStatement;
use PhpParser\Node\Stmt\StaticVar;

/**
 * ScrambleVariable.
 *
 * Renames parameters
 *
 * @category        Naneau
 */
class ScrambleVariable extends ScramblerVisitor
{
  /**
   * Constructor.
   *
   * @return void
   **/
  public function __construct(StringScrambler $scrambler)
  {
    parent::__construct($scrambler);

    $this->setIgnore([
      'this', '_SERVER', '_POST', '_GET', '_REQUEST', '_COOKIE',
      '_SESSION', '_ENV', '_FILES',
    ]);
  }

  /**
   * Check all variable nodes.
   *
   * @return void
   **/
  public function enterNode(Node $node)
  {
    // Function param or variable use
    if ($node instanceof Param || $node instanceof StaticVar || $node instanceof Variable) {
      return $this->scramble($node);
    }

    // try {} catch () {}
    if ($node instanceof CatchStatement) {
      return $this->scramble($node, 'var');
    }

    // Function() use ($x, $y) {}
    if ($node instanceof ClosureUse) {
      return $this->scramble($node, 'var');
    }
  }
}
