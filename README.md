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

| Programs                            | Links                                                         |
| ----------------------------------- | ------------------------------------------------------------- |
| NodeJS                              | [download](https://nodejs.org/en/blog/release/v10.16.0/) v10^ |
| vscode                              | powerfull syntax highlight and usage command helper           |
| python 2.7                          | ./libs/Windows/x64/python2.7 or download from official site   |
| php intelephense (vscode extension) | latest                                                        |
| PHP                                 | 7.1^                                                          |

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

### Tested Working Development On:

- Windows 7/10
- Kali Linux (Subsystem Win 10)

### Tips

- always use --prefer-offline for install npm packages to improving installer speed

# Install Windows

- Install NodeJS
- Open current folder with Command Prompt

```bat
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (set processor=x64) else (set processor=x86)
SET PATH=%PATH%;%~dp0libs\bin\composer;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer
set PYTHON=%~dp0libs\Windows\%processor%\python2.7
set PYTHONPATH=%~dp0libs\Windows\%processor%\python2.7
set DIR=%~dp0
set python_posix=%PYTHON:\=/%/python.exe
npm config set python %python_posix%
rem npm config set msvs_version 2015
rem npm config set msvs_version 2015 --global
rem npm -g install node-gyp
rem node-gyp configure --msvs_version=2015
rem node-gyp --python %PYTHON:\=/%/python.exe
rem node-gyp build
npm install -g typescript gulp
```
