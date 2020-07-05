@echo OFF
setlocal DISABLEDELAYEDEXPANSION
cd /d %~dp0

IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" (set processor=x64) ELSE (set processor=x86)
SET EXTEND=%~dp0node_modules\.bin;%~dp0vendor\bin

IF EXIST "%~dp0libs\bin" (SET EXTEND=%EXTEND%;%~dp0libs\bin)
IF EXIST "%~dp0libs\bin\composer" (SET EXTEND=%EXTEND%;%~dp0libs\bin\composer)
IF EXIST "%~dp0libs\bin\syncjs\bin" (SET EXTEND=%EXTEND%;%~dp0libs\bin\syncjs\bin)
IF EXIST "%~dp0libs\bin\php-cs-fixer" (SET EXTEND=%EXTEND%;%~dp0libs\bin\php-cs-fixer)

rem cygwin detector
IF NOT EXIST "C:\Cygwin\bin" (
  IF NOT EXIST "D:\cygwin64\bin" (
    IF NOT EXIST "D:\cygwin\bin" (
        IF EXIST "E:\cygwin\bin" (SET EXTEND=%EXTEND%;E:\cygwin\bin)
    ) ELSE (SET EXTEND=%EXTEND%;D:\cygwin\bin)
  ) ELSE (SET EXTEND=%EXTEND%;D:\cygwin64\bin)
) ELSE (SET EXTEND=%EXTEND%;C:\Cygwin\bin)

IF EXIST "C:\Python27" (
  set PYTHON=C:\Python27
  set PYTHONPATH=C:\Python27
)

SET PATH=%PATH%;%EXTEND%
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
echo 4 - Re-build Compiler
echo 5 - Travis Log Clear
choice /n /c:1234567 /M "Choose an option "
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
  set /p domainhost="Enter Host: "
  IF %domainhost%=="" (set domainhost=google.com)
  cmd.exe /k "@echo OFF & ping %domainhost% -t"
  goto END

:LABEL-4 Rebuild
  cmd.exe /k "@echo OFF & cls & tsc -p tsconfig.build.json & tsc -p tsconfig.precompiler.json & tsc -p tsconfig.compiler.json"
  goto END

:LABEL-5 TravisLog
  @echo OFF
  setlocal EnableDelayedExpansion
  set /p LoopCount="How many log: "
  for /L %%A in (1,1,%LoopCount%) do (
      travis logs %%A --delete --force
  )
  pause
  goto END

:END
rem pause



