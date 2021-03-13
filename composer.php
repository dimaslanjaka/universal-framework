<?php 
/**
 * Server for PHP
 *
 * Modify this script as needed
 */

function getProjectDirectory() {
    return dirname(__FILE__);
}

function checkComposer($quiet = false) {
		$error = array();
		if (!in_array(php_sapi_name(), array('cli', 'cli-server'))) {
				$error[] = 'For now only PHP CLI is supported (this script does not support PHP CGI)';
		}
    if (!extension_loaded('phar')) {
        $error[] = 'Phar extension must be enabled';
    }
		if (!extension_loaded('zip')) {
        $error[] = 'Zip extension must be enabled';
		}
    if ($error && !$quiet) {
        printError($error) . '<br />';
    }
    return $error;
}

function printError($error) {
		if (!empty($error)) {
				echo '<span class="error error_message">' . implode('<br />', $error) . '</span><br />';
		}
}

abstract class PhpSoftware {

    abstract public function getPath();

    abstract protected function getTitle();

    abstract protected function getDescription();

    abstract public function install();

    public function installCheck() {
				return checkComposer(true);
    }

    public function isInstalled() {
        return is_file(getProjectDirectory() . $this->getPath());
    }

    public function render() {
        $link = '';
        $error = $this->installCheck();
        if ($this->isInstalled()) {
            $link = '<a href="' . $this->getPath() . '">launch</a>';
        } else {
            $link = empty($error) ?
                '<a href="?install&' . get_class($this) . '">install and launch</a>' :
                '<span class="error">error</span>';
        }
        echo '(' . $link . ') <b>' . $this->getTitle() . '</b> - ' . $this->getDescription();
        if (!empty($error)) {
            echo '<br />';
            printError($error);
        }
    }


}

class Adminer extends PhpSoftware {

    public function getPath() {
        return '/vendor/vrana/adminer/adminer/index.php';
    }

    protected function getTitle() {
        return 'Adminer';
    }

    protected function getDescription() {
        return 'database management tool written in PHP, for managing <b>MariaDB</b>, <b>MySQL</b>, <b>SQLite</b>, ...';
    }

    public function install() {
        composer(['require', 'vrana/adminer:4.6.2'], true);
    }

}

class RockMongo extends PhpSoftware {

    public function isInstalled() {
        return parent::isInstalled() && is_file(getProjectDirectory() . '/vendor/alcaeus/mongo-php-adapter/composer.json')
            && stripos(file_get_contents(getProjectDirectory() . $this->getPath()), 'autoload.php') !== false
            && is_file($this->getPathConfig());
    }

    public function getPath() {
        return '/vendor/myurasov/rockmongo/index.php';
    }

    protected function getTitle() {
        return 'RockMongo';
    }

    public function getPathConfig() {
        return getProjectDirectory() . '/vendor/myurasov/rockmongo/config.php';
    }

		public function installCheck() {
				$error = checkComposer(true);
				if (!extension_loaded('mongodb')) {
            $error[] = 'MongoDB extension must be enabled';
				}
        return $error;
		}

    protected function getDescription() {
        return '<b>MongoDB</b> administration tool, written in PHP';
    }

    public function install() {
        composer(['require', 'alcaeus/mongo-php-adapter:1.0.9'], true);
        composer(['require', 'myurasov/rockmongo:@dev'], true);
        $path = getProjectDirectory() . $this->getPath();
        $pathMDB = getProjectDirectory() . '/vendor/myurasov/rockmongo/app/models/MDb.php';
        file_put_contents($path, str_ireplace('define("ROCK_MONGO_VERSION"', 'require dirname(dirname(dirname(__FILE__))) . \'/autoload.php\';define( "ROCK_MONGO_VERSION"', file_get_contents($path)));
        file_put_contents($pathMDB, str_ireplace('$db->getCollectionNames(true)', '$db->getCollectionNames()', file_get_contents($pathMDB)));
        file_put_contents(
          $this->getPathConfig(),
          '<?php
           error_reporting(0);
           $MONGO = array();
           $MONGO["features"]["log_query"] = "on";//log queries
           $MONGO["features"]["theme"] = "default";//theme
           $MONGO["features"]["plugins"] = "on";//plugins
           $i = 0;
           $MONGO["servers"][$i]["mongo_name"] = "Localhost";//mongo server name
           $MONGO["servers"][$i]["mongo_host"] = "127.0.0.1";//mongo host
           $MONGO["servers"][$i]["mongo_port"] = "27017";//mongo port
           $MONGO["servers"][$i]["mongo_timeout"] = 0;//mongo connection timeout
           $MONGO["servers"][$i]["mongo_auth"] = false;//enable mongo authentication?
           $MONGO["servers"][$i]["control_auth"] = false;
           $MONGO["servers"][$i]["control_users"]["admin"] = "admin";
           ?>'
        );
    }

}

function listSoftware($software) {
    foreach ($software as $v) {
        echo $v->render() . '<br />';
    }
}

function install($software, $name) {
    $package = null;
    foreach ($software as $v) {
        if (get_class($v) === $name) {
            $package = $v;
            break;
        }
    }
    if ($package != null) {
        $package->install();
        if ($package->isInstalled()) {
            header('Location: ' . $package->getPath());
            exit;
        }
    } else {
        echo 'Installation failed.';
    }
}

function getComposer() {
    $path = getProjectDirectory() . '/composer.phar';
    putenv('COMPOSER_HOME=' . getProjectDirectory());
    if (!is_file($path)) {
        file_put_contents(
            $path, file_get_contents(
                'https://getcomposer.org/composer.phar', null,
                stream_context_create(array('ssl' => array('verify_peer' => false)))
            )
        );
    }
    return $path;
}

function getLoadedExtensionsPaths() {
    $extension_dir = dirname(PHP_BINARY) . '/' . ini_get('extension_dir') . '/';
    $list = getLoadedExtensionsMap(false);
    $list_zend = getLoadedExtensionsMap(true);
    $paths = [];
    foreach ($list as $name => $filename) {
        if (extension_loaded($name)) {
            $path = realpath(
                $extension_dir . (in_array($filename, $list_zend) ? 'zend_' : '') . $filename
            );
            if (is_file($path)) {
                $paths[] = $path;
            }
        }
    }
    return $paths;
}

function getLoadedExtensionsMap($zend) {
    $list = get_loaded_extensions($zend);
    $result = [];
    foreach ($list as $v) {
        $result[$v] = strtolower(trim(str_ireplace('zend', '', $v))) . '.so';
    }
    return $result;
}

function composer($arguments, $quiet = false) {
		if (!empty(checkComposer(false))) {
				exit;
		}
    $command = array('-c', trim(php_ini_scanned_files()));
    $extensions = getLoadedExtensionsPaths();
    foreach ($extensions as $path) {
        if (basename($path) !== 'zend_xdebug.so') {
            $command[] = '-d ' . (stripos(basename($path), 'zend_') === 0 ? 'zend_' : '') .
								'extension=\'' . $path . '\'';
        }
    }
    $command[] = '-d';
    $command[] = 'openssl.cafile=' . getProjectDirectory() . '/cacert.pem';
    $command[] = getComposer();
    $command[] = '--no-interaction';
    $command = array_merge($command, $arguments);
    foreach ($command as $k => $v) {
        $command[$k] = escapeshellarg($v);
    }
    if (!headers_sent()) {
        header('Content-Type: text/plain');
        header('X-Content-Type-Options: nosniff');
    }
    $result = shell_exec(escapeshellcmd(PHP_BINARY) . ' ' . implode(' ', $command) . ' 2>&1');
    if (!$quiet) {
        echo '--- Composer ' . (empty($arguments) ? '' : '(' . implode(', ', $arguments) . ') ') . "--- --- \n\n" . $result . "\n";
    }
    return $result;
}

$software = array(new Adminer(), new RockMongo());

$command = empty($_GET) ? null : array_keys($_GET);
if (!empty($command)) {
    switch ($command[0]) {
        case 'composer':
            composer(empty($_GET['arg']) ? array() : $_GET['arg']);
            exit;
        case 'phpinfo':
            phpinfo();
            exit;
        case 'install':
            install($software, empty($command[1]) ? null : $command[1]);
            exit;
    }
}


?><html>
<head>
	<title>Server for PHP</title>
	<style>
		* {
			font-size: 12px;
			font-family: Arial, sans-serif;
		}
		code {
			font-family: monospace;
		}
		h1 {
			font-size: 18px;
    }
		div {
			padding: 4px 0 4px 8px;
      border-left: solid 4px #000000;
      margin: 16px 0 0 0;
		}
		div h2 {
			font-size: 14px;
			margin-top: 0;
		}
		div p {
			margin-bottom: 0;
		}
		div span.error {
			color: #FF0000;
			font-weight: bold;
		}
		div span.error_message::before {
			content: "! ";
    }
    a {
      color: #0000FF;
    }
	</style>
</head>
<body>
	<h1>Server for PHP</h1>
	<div>
		<h2>About</h2>
		<p>
			Default index page.<br /><br />
			For more info about <a href="https://play.google.com/store/apps/details?id=com.esminis.server.php">Server for PHP</a> and other
			<a href="https://bitbucket.org/esminis/server">Servers for Android</a> apps see official page:<br /><br />
			<a href="https://bitbucket.org/esminis/server">https://bitbucket.org/esminis/server</a>
		</p>
	</div>
	<div>
		<h2>PHP software</h2>
		<p>
			You can install any PHP software you want manually by putting their files to document root - <b><?php echo dirname(__FILE__) ?></b>.<br /><br />
			Also you can install some software automatically by using these links:<br /><br />
    	<?php listSoftware($software); ?>
		</p>
	</div>
	<div>
		<h2>PHP info</h2>
		<p>Call phpinfo() using web browser: <a href="?phpinfo">?phpinfo</a></p>
	</div>
	<div>
		<h2>Composer</h2>
		<p>
			<?php checkComposer(); ?>
			Call composer using web browser with this URL format:<br />
			<code>?<b>composer</b>&amp;arg[]=<b>[argument0]</b>&amp;arg[]=<b>[argument1]</b>&amp;...&amp;arg[]=<b>[argumentN]</b></code><br /><br />
			<b>[argument0]</b>, <b>[argument1]</b>, ..., <b>[argumentN]</b> - arguments that will be passed to composer command line<br /><br />
			<b>Sample commands:</b><br />
			<a href="?composer">?composer</a> - help<br />
			<a href="?composer&arg[]=init">?composer&amp;arg[]=init</a> - initialize<br />
			<a href="?composer&arg[]=install">?composer&amp;arg[]=install</a> - install<br />
			<a href="?composer&arg[]=require&arg[]=vrana/adminer">?composer&amp;arg[]=require&amp;arg[]=vrana/adminer</a> - install some software, for example Adminer<br /><br />
			For more commands see composer reference.
		</p>
	</div>
</body>
</html>