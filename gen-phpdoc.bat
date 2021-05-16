@echo off
rem phpdoc -d "%~dp0" -t "%~dp0docs\php" --ignore vendor/
phpdoc -d . -t ./docs/php --ignore vendor/