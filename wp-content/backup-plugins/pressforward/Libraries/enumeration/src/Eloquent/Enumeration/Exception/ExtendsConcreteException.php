<?php

/*
 * This file is part of the Enumeration package.
 *
 * Copyright © 2013 Erin Millard
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Eloquent\Enumeration\Exception;

use Exception;
use LogicException;

/**
 * The supplied member extends an already concrete base class.
 *
 * This exception exists to prevent otherwise valid inheritance structures
 * that are not valid in the context of enumerations.
 */
final class ExtendsConcreteException extends LogicException
{
    /**
     * Construct a new extends concrete exception.
     *
     * @param string    $className   The class of the supplied member.
     * @param string    $parentClass The concrete parent class name.
     * @param Exception $previous    The cause, if available.
     */
    public function __construct(
        $className,
        $parentClass,
        Exception $previous = null
    ) {
        $this->className = $className;
        $this->parentClass = $parentClass;

        parent::__construct(
            sprintf(
                "Class '%s' cannot extend concrete class '%s'.",
                $this->className(),
                $this->parentClass()
            ),
            0,
            $previous
        );
    }

    /**
     * Get the class name of the supplied member.
     *
     * @return string The class name.
     */
    public function className()
    {
        return $this->className;
    }

    /**
     * Get the parent class name.
     *
     * @return string The parent class name.
     */
    public function parentClass()
    {
        return $this->parentClass;
    }

    private $className;
    private $parentClass;
}
