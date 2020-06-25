@echo OFF
setlocal DISABLEDELAYEDEXPANSION
cd /d %~dp0

IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" (set processor=x64) ELSE (set processor=x86)
SET EXTEND=%~dp0libs\bin\composer;%~dp0libs\bin;%~dp0libs\bin\syncjs\bin;%~dp0node_modules\.bin;%~dp0libs\bin\php-cs-fixer
rem cygwin detector
IF NOT EXIST "C:\Cygwin\bin" (
   IF NOT EXIST "D:\cygwin64\bin" (
      IF NOT EXIST "D:\cygwin\bin" (
         IF EXIST "E:\cygwin\bin" (SET EXTEND=%EXTEND%;E:\cygwin\bin)
      ) ELSE (SET EXTEND=%EXTEND%;D:\cygwin\bin)
   ) ELSE (SET EXTEND=%EXTEND%;D:\cygwin64\bin)
) ELSE (SET EXTEND=%EXTEND%;C:\Cygwin\bin)

SET PATH=%PATH%;%EXTEND%
set PYTHON=%~dp0libs\Windows\%processor%\python2.7
set PYTHONPATH=%~dp0libs\Windows\%processor%\python2.7
set DIR=%~dp0
set python_posix=%PYTHON:\=/%/python.exe
set npm_config_devdir=%~dp0/tmp/.gyp
set VCINSTALLDIR=C:\Program Files (x86)\MSBuild
rem npm config set python %PYTHON:\=/%/python.exe 


:BEGIN
echo Select Terminal:
echo 1 - CMD
echo 2 - POWERSHELL
echo 3 - PING
choice /n /c:123 /M "Choose an option "
GOTO LABEL-%ERRORLEVEL%

:LABEL-1 CMD
cls
cmd.exe /k "@echo ON & setlocal DISABLEDELAYEDEXPANSION & npm config set python %PYTHON:\=/%/python.exe"
goto END

:LABEL-2 POWERSHELL
cls
Start powershell.exe -noexit -ExecutionPolicy Bypass -File "%~dp0cmd.ps1" -Command "npm config set python %PYTHON:\=/%/python.exe Set-Location -literalPath '%~dp0';"
goto END

:LABEL-3 PING
cls
cmd.exe /k "@echo OFF & ping google.com -t"
goto END

:END
rem pause



