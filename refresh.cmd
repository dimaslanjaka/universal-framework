@echo off
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
rem %mydate%_%mytime%
git rm -r --cached .
git add .
git commit -m "clear git cache (%mydate% %mytime%)"
git push