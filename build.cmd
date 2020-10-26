@echo off
%~dp0node_modules/.bin/tsc.cmd -p tsconfig.build.json
%~dp0node_modules/.bin/tsc.cmd -p tsconfig.precompiler.json
%~dp0node_modules/.bin/tsc.cmd -p tsconfig.compiler.json
pause