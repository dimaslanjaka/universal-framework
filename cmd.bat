@echo OFF
setlocal DISABLEDELAYEDEXPANSION
cd /d %~dp0

IF EXIST %~dp0libs\bin\composer SET PATH=%PATH%;%~dp0libs\bin\composer;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer

:menu
echo Select Terminal:
echo 1 - CMD
echo 2 - Powershell
choice /n /c:12345678 /M "Choose an option "
GOTO LABEL-%ERRORLEVEL%

:LABEL-1 CMD
cls
cmd.exe
rem goto menu

:LABEL-2 POWERSHELL
cls
Start powershell.exe -noexit -ExecutionPolicy Bypass -File "%~dp0cmd.ps1" -command Set-Location -literalPath '%~dp0'
rem goto menu

