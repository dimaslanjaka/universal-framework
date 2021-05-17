::@ECHO OFF
::ECHO Delete Folder: %CD%?
::PAUSE
::SET FOLDER=%CD%
::CD /
::DEL /F/Q/S "%FOLDER%" > NUL
::RMDIR /Q/S "%FOLDER%"
::EXIT

@ECHO OFF

Title delete_file_folder_fast_simple_v2.bat
REM Description: Use parameters or drag and drop to fast delete a file or folder
REM Note: Limited to one file or folder
REM Asks for confirmation before delete. No output during deletion
REM Ref: http://mattpilz.com/fastest-way-to-delete-large-folders-windows/
REM Ref: https://superuser.com/questions/416071/how-to-delete-huge-number-of-files-on-windows

REM change to current directory
pushd "%~dp0"

REM Test for empty parameter
IF [%1] == [] (
	Echo.
	Echo ------------------------ No files or folders to processs ------------
	Echo No file or folder detected
	Echo Press any key to exit and restart again ...
	pause>nul & exit /B 0
	)

REM Use pushd to cd to parent directory
REM (workaround for UNC path to network drives)
SET PARENT=%~1\..
pushd "%PARENT%"

REM Test if parameter is a file or directory
set ATTR=%~a1
set DIRATTR=%ATTR:~0,1%

if /I "%DIRATTR%"=="d" (
	call :askdelete "%~n1%~x1"
	DEL /F/Q/S "%~1" >NUL
	RMDIR /Q/S "%~1"
	goto end
)

REM Delete file
call:askdelete "%~nx1"
DEL /F/Q "%~1" >NUL

:end
popd
EXIT /B 0

:askdelete
ECHO.
ECHO Delete: "%~1"
ECHO From: "%~dp1"
ECHO.
ECHO Press any key to delete. To quit, click the X on on this window or use CTRL + C ...
PAUSE >NUL
goto:eof