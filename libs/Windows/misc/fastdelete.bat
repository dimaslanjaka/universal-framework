@echo off
echo Delete Folder: %CD%
setlocal
:PROMPT
set /P AREYOUSURE=Are you sure (Y/[N])?
if /I "%AREYOUSURE%" NEQ "Y" goto END

echo Removing Folder: %CD%
set FOLDER=%CD%
cd /
del /F/Q/S "%FOLDER%" > NUL
rmdir /Q/S "%FOLDER%"


:END
endlocal