@echo off
echo "When you agree to proceed with the installation, node_modules will take up a certain amount of space."
pause
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" npm i ; npm i electron
pause
