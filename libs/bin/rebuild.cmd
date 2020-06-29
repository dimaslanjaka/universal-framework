@echo OFF
:: in case DelayedExpansion is on and a path contains !
setlocal DISABLEDELAYEDEXPANSION
rem %~dp0 = current script directory
rem %* = all arguments
rem %cd% = terminal directory

echo %PSModulePath% | findstr %USERPROFILE% >NUL
set ISPOWERSHELL=%ERRORLEVEL% EQU 0
node %cd%\index.js rebuild

