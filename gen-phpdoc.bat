@echo off
rem phpdoc -d "%~dp0" -t "%~dp0docs\php" --ignore vendor/

del /f /s /q docs\php 1>nul
rmdir /s /q docs\php
phpdoc -d . -t ./docs/php --ignore vendor/