# Universal Framework (Under Development)

[![Build Status](https://travis-ci.org/dimaslanjaka/universal-framework.png?branch=master)](https://travis-ci.org/dimaslanjaka/universal-framework)
[![Known Vulnerabilities](https://snyk.io/test/github/dimaslanjaka/universal-framework/badge.svg)](https://snyk.io/test/github/dimaslanjaka/universal-framework)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdimaslanjaka%2Funiversal-framework.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdimaslanjaka%2Funiversal-framework?ref=badge_shield)
[![CircleCI](https://circleci.com/gh/dimaslanjaka/universal-framework.svg?style=shield)](https://circleci.com/gh/dimaslanjaka/universal-framework)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/dimaslanjaka/universal-framework/graphs/commit-activity)
[![GitHub license](https://img.shields.io/github/release/dimaslanjaka/universal-framework.svg)](https://GitHub.com/dimaslanjaka/universal-framework/releases/) [![Github all releases](https://img.shields.io/github/downloads/dimaslanjaka/universal-framework/total.svg)](https://GitHub.com/dimaslanjaka/universal-framework/releases/)
[![MIT](https://img.shields.io/github/license/dimaslanjaka/universal-framework?color=%23435df6&logo=PHPJS&logoColor=%23543et5)](https://GitHub.com/dimaslanjaka/universal-framework)
[![Packagist](https://img.shields.io/packagist/dt/dimaslanjaka/universal-framework.svg)](https://packagist.org/packages/dimaslanjaka/universal-framework)
![GitHub tag](https://img.shields.io/github/tag/dimaslanjaka/universal-framework.svg)

# PHP framework with powerful functions

# Requirements

| Programs                            | Links / Description                                               |
| ----------------------------------- | ----------------------------------------------------------------- |
| NodeJS 10++                         | [download](https://nodejs.org/en/blog/release/v10.16.0/)          |
| vscode                              | Code editor                                                       |
| python 2.7                          | [download](https://www.python.org/downloads/release/python-2718/) |
| php intelephense (vscode extension) | For Powerful PHP Intelisense (required)                           |
| php docblocker (vscode extension)   | For PHP DocBlock Support (optional)                               |
| PHP                                 | 7.3^ (7.4 Recommended)                                            |
| php-gd php-curl php-ext             | PHP Extension                                                     |

### How to update XAMPP php version windows

- [Download PHP](https://windows.php.net/download/) select version you're desired
- stop XAMPP apache
- backup your current XAMPP PHP (C:\xampp\php)
- extract the zip (php.exe, etc) from the zip php your'e downloaded before into (C:\xampp\php)
- start XAMPP apache

#### How to view current XAMPP PHP version

- create file info.php, insert <?php phpinfo(); ?>
- access it through your localhost, you'll see your php version and other configuration there

### How to install php extension on windows

- access C:\xampp\php\ext, there is installed php extensions folder
- basically, xampp have all php extensions except experimental extensions

# Support

- SASS/SCSS/LESS Compiler
- JS/CSS/HTML Minifier
- Cached Mode
- Obfuscate Mode

# Built-in Command

| Programs   | Path                                    |
| ---------- | --------------------------------------- |
| Python 2.7 | ./libs/Windows/x64/python2.7/python.exe |

# Feature

- PHP - JS integrated function
- Windows - PHP integrated function
- PHP - Older php function shimmer

### Tested Working Development On:

- Windows 7/10
- Kali Linux (Subsystem Win 10)

### Tips

- always use --prefer-offline for install npm packages to improving installer speed
- always use --prefer-source for install composer package faster

# Install Windows

- Install ALL Requirements before running these steps
- Open cmd.bat
- select Terminal you're desired
- type below code into terminal:

```sh
composer install --prefer-source
npm install --prefer-offline
npm install typescript gulp depcheck -g --prefer-offline
tsc -p tsconfig.build.json
tsc -p tsconfig.precompiler.json
tsc -p tsconfig.compiler.json
```

- now you can run development on your device

```sh
gulp build #for building components all at once
gulp watch #for watching file on change and automatically run job based on changed files
```
