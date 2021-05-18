@echo off
rem phpdoc -d "%~dp0" -t "%~dp0docs\php" --ignore vendor/

rem del /f /s /q docs\php 1>nul
rem rmdir /s /q docs\php
rem phpdoc -d . -t ./docs/php --ignore="vendor/" --template="vendor/nelson6e65/phpdoc-vuepress/data/templates/vuepress"

phpdoc -d . -t ./docs/php
