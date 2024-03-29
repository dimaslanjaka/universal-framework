<?php

/**
 * ScramblePrivateProperty.php.
 *
 * @category        Naneau
 */

namespace Naneau\Obfuscator\Node\Visitor;

use Naneau\Obfuscator\Node\Visitor\Scrambler as ScramblerVisitor;
use Naneau\Obfuscator\StringScrambler;
use PhpParser\Node;
use PhpParser\Node\Expr\PropertyFetch;
use PhpParser\Node\Stmt\Class_ as ClassNode;
use PhpParser\Node\Stmt\Property;

/**
 * ScramblePrivateProperty.
 *
 * Renames private properties
 *
 * WARNING
 *
 * See warning for private method scrambler
 *
 * @category        Naneau
 */
class ScramblePrivateProperty extends ScramblerVisitor
{
  use TrackingRenamerTrait;
  use SkipTrait;

  /**
   * Constructor.
   *
   * @return void
   **/
  public function __construct(StringScrambler $scrambler)
  {
    parent::__construct($scrambler);
  }

  /**
   * Before node traversal.
   *
   * @param Node[] $nodes
   *
   * @return array
   **/
  public function beforeTraverse($nodes)
  {
    $this
      ->resetRenamed()
      ->scanPropertyDefinitions($nodes);

    return $nodes;
  }

  /**
   * Check all variable nodes.
   *
   * @return void
   **/
  public function enterNode(Node $node)
  {
    if ($node instanceof PropertyFetch) {
      if (!is_string($node->name)) {
        return;
      }

      if ($this->isRenamed($node->name)) {
        $node->name = $this->getNewName($node->name);

        return $node;
      }
    }
  }

  /**
   * Recursively scan for private method definitions and rename them.
   *
   * @param Node[] $nodes
   *
   * @return void
   **/
  private function scanPropertyDefinitions($nodes)
  {
    foreach ($nodes as $node) {
      // Scramble the private method definitions
      if ($node instanceof Property && ($node->type & ClassNode::MODIFIER_PRIVATE)) {
        foreach ($node->props as $property) {
          // Record original name and scramble it
          $originalName = $property->name;
          $this->scramble($property);

          // Record renaming
          $this->renamed($originalName, $property->name);
        }
      }

      // Recurse over child nodes
      if (isset($node->stmts) && is_array($node->stmts)) {
        $this->scanPropertyDefinitions($node->stmts);
      }
    }
  }
}
