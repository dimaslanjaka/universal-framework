<?php

// @codingStandardsIgnoreFile

if (!empty($_SERVER['HTTP_HOST']) || !empty($_SERVER['SERVER_NAME'])) die('This script is for running from the command-line, not via a browser');

// The handlebars compiler - http://handlebarsjs.com/precompilation.html
$path_to_handlebars = !empty($_ENV['HANDLEBARS']) ? $_ENV['HANDLEBARS'] : '/usr/bin/handlebars';

if (!file_exists($path_to_handlebars)) die('Handlebars not found: '.$path_to_handlebars);

$templates_dir = wp_normalize_path(dirname(__FILE__));

// Copy over (temporarily) templates from modules
$modules_dir = dirname($templates_dir).'/modules';
$added_modules = array();
if (is_dir($modules_dir) && $dir_handle = opendir($modules_dir)) {
	while (false !== ($e = readdir($dir_handle))) {
		if ('.' == $e || '..' == $e) continue;
		if (is_dir($modules_dir.'/'.$e) && file_exists($modules_dir.'/'.$e.'/templates') && is_dir($modules_dir.'/'.$e.'/templates')) {
			if (is_dir($e)) {
				die("ABORT: Directory '$e' in the templates directory already exists (i.e. clashing namespaces)");
			}
			exec('cp -r '.escapeshellarg($modules_dir.'/'.$e.'/templates').' '.escapeshellarg($e));
			$added_modules[] = $e;
		}
	}
	@closedir($dir_handle);
}

$directory = new RecursiveDirectoryIterator($templates_dir);
$iterator = new RecursiveIteratorIterator($directory);
$regex = new RegexIterator($iterator, '/^.+\.handlebars\.html$/i', RecursiveRegexIterator::GET_MATCH);

$output_files = array();

foreach ($regex as $files) {

	foreach ($files as $file) {

		$file = wp_normalize_path($file);
		if (strpos($file, $templates_dir) === 0) {
			$output_files[] = handlebars_compile(substr($file, 1 + strlen($templates_dir)));
		} else {
			echo "ERROR: Could not parse filename: $file\n";
		}
	} 

}

$complete_output = "UpdraftCentral_Handlebars = (typeof UpdraftCentral_Handlebars === 'undefined') ? {} : UpdraftCentral_Handlebars;\n";

foreach ($output_files as $of) {
	$complete_output .= file_get_contents($of)."\n";
	unlink($of);
}

file_put_contents('handlebars-compiled.js', $complete_output);

foreach ($added_modules as $module) {
	echo "Cleanup: remove: templates/$module\n";
	exec('rm -rf '.escapeshellarg($module));
}

function handlebars_compile($file) {
	global $path_to_handlebars, $templates_dir;
// 	$output_file = substr($file, 0, -5).'.js';
	$output_file = substr($file, 0, -5).'.js';

	$template_name = str_replace('/', '-', substr($file, 0, -16));

	$output_file = dirname($output_file).'/'.$template_name.'.js';

	// We have to do this to get Handlebars to create the right variable name
	$copy_file = dirname($output_file).'/'.$template_name.'.handlebars.html';
	copy($file, $copy_file);

	// http://handlebarsjs.com/precompilation.html
	
// 		echo ($path_to_handlebars.' '.escapeshellarg($templates_dir.'/'.$file)." --name $template_name --namespace UpdraftCentral_Handlebars --min --extension handlebars.html --output ".escapeshellarg($templates_dir.'/'.$output_file)."\n");
	
	exec($path_to_handlebars.' '.escapeshellarg($templates_dir.'/'.$copy_file).' --namespace UpdraftCentral_Handlebars --min --extension handlebars.html --output '.escapeshellarg($templates_dir.'/'.$output_file), $output, $return_code);
	if ($return_code) {
		echo "Return code ($file): $return_code\n";
	} else {
		echo "OK: $output_file\n";	
	}
	if (is_array($output)) {
		foreach ($output as $line) {
			echo $line."\n";
		}
	}
	@unlink($copy_file);

	return $templates_dir.'/'.$output_file;
}

function wp_normalize_path($path) {
	$path = str_replace('\\', '/', $path);
	$path = preg_replace('|/+|', '/', $path);
	if (':' === substr($path, 1, 1)) {
		$path = ucfirst($path);
	}

	return $path;
}
