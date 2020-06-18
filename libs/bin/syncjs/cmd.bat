cd /d %~dp0

setlocal
IF EXIST %~dp0\bin SET PATH=%PATH%;%~dp0\bin
cmd.exe