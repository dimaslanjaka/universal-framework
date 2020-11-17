@echo OFF
:: in case DelayedExpansion is on and a path contains !
setlocal DISABLEDELAYEDEXPANSION
php -d memory_limit=128M max_execution_time=300 "%~dp0src\phpDocumentor\bin\phpdoc" %*
