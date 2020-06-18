setlocal DISABLEDELAYEDEXPANSION
cd /d %~dp0

IF EXIST %~dp0libs\bin\composer SET PATH=%PATH%;%~dp0libs\bin\composer;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer

cmd.exe