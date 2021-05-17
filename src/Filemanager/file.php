<?php

namespace Filemanager;

use Exception;
use FilesystemIterator;
use JSON\json;
use MVC\alert;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SplFileInfo;

class file
{
    public $content = '';
    public $modified = [];
    public $created = [];

    public function __construct()
    {
        // allocate your stuff
    }

    /**
     * Initialize File (Alternative Multiple Constructor)
     * @see https://stackoverflow.com/a/1701337
     */
    public static function withPath($filepath)
    {
        $instance = new self();
        if (file_exists($filepath)) {
            $instance->content = file_get_contents($filepath);
            $instance->modified['timestamp'] = filemtime($filepath);
            $instance->modified['minute'] = floor((time() - $instance->modified['timestamp']) / (60));
            $instance->created['timestamp'] = filectime($filepath);
            $instance->created['minute'] = floor((time() - $instance->created['timestamp']) / (60));
        }
        return $instance;
    }

    /**
     * Get TMP Folder
     * @return mixed
     */
    public static function tmp()
    {
        $root = __DIR__;
        if (defined('ROOT')) {
            $root = ROOT;
        }

        return self::folder($root . '/tmp');
    }

    /**
     * @param $path
     * @return mixed
     */
    public static function folder($path)
    {
        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0777, true);
        }
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }

        return $path;
    }

    /**
     * Flush directory.
     *
     * @todo empty the directory, deleting all files except directory
     */
    public static function emptyDir($dir)
    {
        if (!file_exists($dir)) {
            alert::init()->error('empty folder', $dir . ' not exists');

            return;
        }
        $subdir = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
        /**
         * @var SplFileInfo[]
         */
        $dirs = new RecursiveIteratorIterator($subdir, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($dirs as $file) {
            if (!$file->isDir() && $file->isWritable()) {
                unlink($file);
            }
        }
    }

    /**
     * Recursive delete.
     *
     * @param string $path files or folder
     */
    public static function delete($path)
    {
        if (file_exists($path)) {
            if (is_dir($path)) {
                self::deleteDirectory($path);
            } else {
                unlink($path);
            }
        }
    }

    /**
     * Delete Non-Empty Directory
     * @param $dir
     * @return bool
     */
    public static function deleteDirectory($dir)
    {
        if ($dir = realpath($dir)) {
            if (!file_exists($dir)) {
                return true;
            }

            if (!is_dir($dir)) {
                return unlink($dir);
            }

            foreach (scandir($dir) as $item) {
                if ('.' == $item || '..' == $item) {
                    continue;
                }

                if (!self::deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                    return false;
                }
            }

            return rmdir($dir);
        }
        return false;
    }

    public static function write($path, $content = '', $append = false)
    {
        if (is_object($content) || is_array($content)) {
            $content = \JSON\json::json($content, false);
        }

        return self::file($path, $content, true, $append, false);
    }

    /**
     * Create file nested.
     *
     * @param bool $create content
     * @param bool $force
     * @param bool $append
     * @param bool $dump
     *
     * @return string
     */
    public static function file($path, $create = true, $force = false, $append = false, $dump = false)
    {
        if ($real = realpath($path)) {
            $path = $real;
        }
        $fm = new file();
        // if directory not exists, create it
        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0777, true);
        }
        // set option flag
        $option = 0;
        if ($append) {
            $option = FILE_APPEND;
        }
        // if forced or file exists, create it
        if ($force || !file_exists($path)) {
            $create = $fm->determineContent($create);
            file_put_contents($path, $create, $option);
        }

        return $path;
        //return $fm->_file_($path, $create, $force, $append, $dump);
    }

    public function determineContent($create)
    {
        if (is_numeric($create) || ctype_digit($create)) {
            $create = (int)$create;
        } elseif (is_string($create)) {
            $create = (string)$create;
        } elseif (is_array($create) || is_object($create)) {
            $create = json_encode($create, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        } else {
            $create = '';
        }

        return $create;
    }

    public static function remove($str)
    {
        $fm = new file();

        return $fm->deleteFile($str);
    }

    /**
     * Delete file
     * @param $file
     * @return bool
     */
    public function deleteFile($file)
    {
        if (file_exists($file)) {
            return unlink($file);
        }
        return false;
    }

    public static function get($file, $parse_json = false)
    {
        resolve_dir(dirname($file));
        //self::cleanDump($file, realpath($file), file_exists($file), is_writable($file));
        $ret = null;
        if (realpath($file)) {
            $file = realpath($file);
        }
        if (file_exists($file)) {
            $ret = file_get_contents($file);
            if ($parse_json && json::is_json($ret)) {
                $ret = json_decode($ret, true);
            }
        }

        return $ret;
    }

    public function cleanDump($c, ...$_)
    {
        if (ob_get_level()) {
            ob_end_clean();
            ob_start();
        }
        ev($c, $_);
    }

    /**
     * Create file and directory recursively.
     *
     * @param string $path File Path
     * @param bool $create
     *                       * true to create
     *                       * false to abort create
     * @param bool $force
     *                       * true force overwrite
     *                       * false not create if exists
     * @param bool $append append to file
     *
     * @return string filepath
     * @todo mkdir if not exists then file_put_contents
     *
     */
    public function createFile($path, $create = true, $force = false, $append = false, $dump = false)
    {
        $path = $this->smartFilePath($path);
        //$this->_folder_(dirname($path));

        if (false !== $create) {
            $create = $this->determineContent($create);
            //ev(basename($path), dirname($path), $path, $create);
            $root = $this->smartFilePath($_SERVER['DOCUMENT_ROOT']);
            //ev(strpos($path, $root), $path, $root);
            if (false === strpos($path, $root)) {
                $path = $root . $path;
            }
            //ev(file_exists(dirname($path)));
            if (!file_exists(dirname($path))) {
                $this->createFolder(dirname($path), null, null, $dump);
            }
            if ((!file_exists($path) || false !== $force) && $create) {
                try {
                    if (!$append) {
                        file_put_contents($path, $create, LOCK_EX);
                    } else {
                        file_put_contents($path, $create, FILE_APPEND | LOCK_EX);
                    }
                } catch (Exception $e) {
                    if (ob_get_level()) {
                        ob_end_clean();
                    }
                    exit(json_encode(['error' => $e->getMessage()]));
                }
            }
        }

        return $path;
    }

    /**
     * Normalize Path To Linux Format
     *
     * @param string $path
     * @return string $dir
     */
    public function smartFilePath($path)
    {
        if ('WIN' === strtoupper(substr(PHP_OS, 0, 3))) {
            return str_replace('\\', '/', $path);
        }

        return $path;
    }

    /**
     * Create folder recursively.
     *
     * @param string $d pathname or dirname
     * @param mixed $root root directory
     *                       * default $_SERVER['DOCUMENT_ROOT']
     * @param bool $noroot false will return begins with $root
     *
     * @return string
     */
    public function createFolder($d, $root = null, $noroot = null, $dump = false)
    {
        if (!$root) {
            $root = $_SERVER['DOCUMENT_ROOT'];
        }
        if (preg_match('/(\/admin\/assets\/data\/.*)/m', $d, $cmatch)) {
            $d = $cmatch[1];
        } else {
            $d = str_replace($root, '', $d);
        }
        $explode = explode('/', rtrim($d, '/'));
        $explode = array_filter((array)$explode);

        //$ready = ('WIN' == strtoupper(substr(PHP_OS, 0, 3)) ? '' : '/');
        $ready = '';
        if (!self::isWin()) {
            $ready .= '/';
        }
        foreach ($explode as $x) {
            if (!empty($ready)) {
                $ready .= '/' . $x;
            } else {
                $ready .= $x;
            }
            $status = file_exists($ready);
            if (!$status) {
                $this->mkdir($ready);
            }
        }

        if (!file_exists($d)) {
            if (file_exists($root . $d) && !$noroot) {
                $d = $root . $d;
            }
        }

        return $d;
    }

    /**
     * Is Device Windows?
     * @return bool
     */
    public static function isWin()
    {
        return 'WIN' === strtoupper(substr(PHP_OS, 0, 3));
    }

    /**
     * Create folder 777.
     */
    public function mkdir($x)
    {
        //ev($x);
        try {
            $oldMask = umask(0);
            mkdir($x, 0777);
            umask($oldMask);
        } catch (Exception $th) {
            echo "{$th->getMessage()} => {$x}";
        }
    }

    public function __istatic()
    {
        $static = !(isset($this) && __CLASS__ == get_class($this));

        return $static;
    }

    public function destroy_old_files($dir, $sec = 3600, $prefix = null)
    {
        if (!is_numeric($sec)) {
            throw new \MVC\Exception('Seconds must be instance of number', 1);
        }
        $mydir = opendir($dir);
        while ($file = readdir($mydir)) {
            if ('.' != $file && '..' != $file) {
                chmod($dir . $file, 0777);
                if (is_dir($dir . $file)) {
                    chdir('.');
                    while ($dir . $file) {
                        if (date('U', filectime($file) >= time() - $sec)) {
                            if ($prefix && false !== strpos($file, $prefix)) {
                                continue;
                            }
                            if (is_dir($file)) {
                                continue;
                            }
                            unlink($dir . $file) or exit("couldn't delete $dir$file<br />");
                        }
                    }
                } else {
                    unlink($dir . $file) or exit("couldn't delete $dir$file<br />");
                }
            }
        }
        closedir($mydir);
    }
}
