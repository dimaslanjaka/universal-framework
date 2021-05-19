<?php
/**
 * ScrambleUse.php.
 *
 * @category        Naneau
 */

namespace Naneau\Obfuscator\Node\Visitor;

use Naneau\Obfuscator\Node\Visitor\Scrambler as ScramblerVisitor;
use PhpParser\Node;
use PhpParser\Node\Expr\ClassConstFetch;
use PhpParser\Node\Expr\Instanceof_ as InstanceOfExpression;
use PhpParser\Node\Expr\New_ as NewExpression;
use PhpParser\Node\Expr\StaticCall;
use PhpParser\Node\Expr\StaticPropertyFetch;
use PhpParser\Node\Name;
use PhpParser\Node\Param;
use PhpParser\Node\Stmt\Class_ as ClassStatement;
use PhpParser\Node\Stmt\StaticVar;
use PhpParser\Node\Stmt\Use_ as UseStatement;

/**
 * ScrambleUse.
 *
 * @category        Naneau
 */
class ScrambleUse extends ScramblerVisitor
{
  use TrackingRenamerTrait;
  use SkipTrait;

  /**
   * Active class.
   *
   * @var ClassStatement|bool
   **/
  private $classNode;

  /**
   * Before node traversal.
   *
   * @param Node[] $nodes
   *
   * @return array
   **/
  public function beforeTraverse(array $nodes)
  {
    // Reset renamed list
    $this->resetRenamed();

    // Find the class node
    $this->classNode = $this->findClass($nodes);

    // Scan for use statements
    $this->scanUse($nodes);

    return $nodes;
  }

  /**
   * Find (the first) class node in a set of nodes.
   *
   * @return ClassStatement|bool returns falls if no class can be found
   **/
  private function findClass(array $nodes)
  {
    foreach ($nodes as $node) {
      if ($node instanceof ClassStatement) {
        return $node;
      }

      if (isset($node->stmts) && is_array($node->stmts)) {
        $class = $this->findClass($node->stmts);

        if ($class instanceof ClassStatement) {
          return $class;
        }
      }
    }

    return false;
  }

  /**
   * Scramble at use statements.
   *
   * @param Node[] $nodes
   *
   * @return void
   **/
  private function scanUse(array $nodes)
  {
    foreach ($nodes as $node) {
      // Scramble the private method definitions
      if ($node instanceof UseStatement) {
        foreach ($node->uses as $useNode) {
          // Record original name and scramble it
          $originalName = $useNode->name->toString();

          // Prefix all classes with underscores, but don't modify them further
          $rename =
                        false === strpos($originalName, '_')
                        &&
                        count($useNode->name->parts) > 1;

          if (!$rename) {
            $useNode->name = new Name(
                            '\\' . $useNode->name
                        );

            continue;
          }

          // Scramble into new use name
          $newName = $this->scrambleString(
                        $originalName
                        . '-'
                        . $useNode->alias
                    );

          // Record renaming of full class
          $this->renamed($originalName, $newName);

          // Record renaming of alias
          $this->renamed($useNode->alias, $newName);

          // Set the new alias
          $useNode->alias = $newName;
        }
      }

      // Recurse over child nodes
      if (isset($node->stmts) && is_array($node->stmts)) {
        $this->scanUse($node->stmts);
      }
    }
  }

  /**
   * Check all variable nodes.
   *
   * @return void
   **/
  public function enterNode(Node $node)
  {
    // Class statements
    if ($node instanceof ClassStatement) {
      // Classes that extend another class
      if (null !== $node->extends) {
        $extends = $node->extends->toString();
        if ($this->isRenamed($extends)) {
          $node->extends = new Name($this->getNewName($extends));
        }
      }

      // Classes that implement an interface
      if (null !== $node->implements && count($node->implements) > 0) {
        $implements = [];

        foreach ($node->implements as $implementsName) {
          // Old name (as string)
          $oldName = $implementsName->toString();

          if ($this->isRenamed($oldName)) {
            // If renamed, set new one
            $implements[] = new Name($this->getNewName($oldName));
          } else {
            // If not renamed, pass old one
            $implements[] = $implementsName;
          }
        }

        $node->implements = $implements;
      }

      return $node;
    }

    // Param rename
    if ($node instanceof Param && $node->type instanceof Name) {
      // Name
      $name = $node->type->toString();

      // Has it been renamed?
      if ($this->isRenamed($name)) {
        $node->type = $this->getNewName($name);

        return $node;
      }
    }

    // Static call or constant lookup on class
    if (
            $node instanceof ClassConstFetch
            || $node instanceof StaticCall
            || $node instanceof StaticPropertyFetch
            || $node instanceof StaticVar
            || $node instanceof NewExpression
            || $node instanceof InstanceOfExpression
        ) {
      // We need to be in a class for this to work
      if (empty($this->classNode)) {
        return;
      }

      // We need a name
      if (!($node->class instanceof Name)) {
        return;
      }

      // Class name
      $name = $node->class->toString();

      if ($name === $this->classNode->name) {
        return;
      }

      // Has it been renamed?
      if ($this->isRenamed($name)) {
        $node->class = new Name($this->getNewName($name));

        return $node;
      }
    }
  }
}
