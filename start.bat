@echo off
cd /d "%~dp0"
if not exist node_modules call npm install --no-package-lock
start "" http://localhost:8443/
call npm run dev
pause
