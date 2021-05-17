@echo off
echo.%*|findstr /C:"--prefer-offline" >nul 2>&1

:install
@IF EXIST "%~dp0\node.exe" (
  if not errorlevel 1 (
    "%~dp0\node.exe"  "%~dp0\node_modules\npm\bin\npm-cli.js" %*
  ) ELSE (
    "%~dp0\node.exe" "%~dp0\node_modules\npm\bin\npm-cli.js" --prefer-offline %*
  )
) ELSE (
  node  "%~dp0\node_modules\npm\bin\npm-cli.js" %*
)