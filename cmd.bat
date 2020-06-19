@echo OFF
setlocal DISABLEDELAYEDEXPANSION
cd /d %~dp0

if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (set processor=x64) else (set processor=x86)
SET PATH=%PATH%;%~dp0libs\bin\composer;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer
set PYTHON=%~dp0libs\Windows\%processor%\python2.7
set PYTHONPATH=%~dp0libs\Windows\%processor%\python2.7
set DIR=%~dp0
set python_posix=%PYTHON:\=/%/python.exe

rem this is major installer tips
rem npm config set python %PYTHON:\=/%/python.exe 
rem node-gyp configure --msvs_version=2015
rem node-gyp --python %PYTHON:\=/%/python.exe
rem npm install --global --prefer-offline --production windows-build-tools

:menu
echo Select Terminal:
echo 1 - CMD
echo 2 - POWERSHELL
choice /n /c:12345678 /M "Choose an option "
GOTO LABEL-%ERRORLEVEL%

:LABEL-1 CMD
cls
cmd.exe /k "npm config set python %PYTHON:\=/%/python.exe"
rem goto menu 

:LABEL-2 POWERSHELL
cls
Start powershell.exe -noexit -ExecutionPolicy Bypass -File "%~dp0cmd.ps1" -Command "npm config set python %PYTHON:\=/%/python.exe; Set-Location -literalPath '%~dp0';"
rem goto menu

:END
pause



