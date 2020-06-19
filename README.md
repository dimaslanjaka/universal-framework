# Universal Framework

[![Build Status](https://travis-ci.org/dimaslanjaka/universal-framework.png?branch=master)](https://travis-ci.org/dimaslanjaka/universal-framework) [![Known Vulnerabilities](https://snyk.io/test/github/dimaslanjaka/universal-framework/badge.svg)](https://snyk.io/test/github/dimaslanjaka/universal-framework) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdimaslanjaka%2Funiversal-framework.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdimaslanjaka%2Funiversal-framework?ref=badge_shield) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/dimaslanjaka/universal-framework/graphs/commit-activity) [![GitHub release](https://img.shields.io/github/release/dimaslanjaka/universal-framework.svg)](https://GitHub.com/dimaslanjaka/universal-framework/releases/) [![Github all releases](https://img.shields.io/github/downloads/dimaslanjaka/universal-framework/total.svg)](https://GitHub.com/dimaslanjaka/universal-framework/releases/)

# PHP framework with powerful functions

| Programs                  | Links                                                    |
| ------------------------- | -------------------------------------------------------- |
| NodeJS                    | [download](https://nodejs.org/en/blog/release/v10.16.0/) |
| vscode                    |                                                          |
| python 2.7 (for node-gyp) |

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

# Install

- Open current folder with Command Prompt
```bat
SET PATH=%PATH%;%~dp0libs\bin\composer;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer
set PYTHON=%~dp0libs\Windows\x64\python2.7
set PYTHONPATH=%~dp0libs\Windows\x64\python2.7
set DIR=%~dp0
set python_posix=%PYTHON:\=/%/python.exe
npm config set python %PYTHON:\=/%/python.exe
node-gyp configure --msvs_version=2015
node-gyp --python %PYTHON:\=/%/python.exe
npm install --global --prefer-offline --production windows-build-tools
```
