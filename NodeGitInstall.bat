@echo off
echo -When you press "Enter" the system will start installing Nodejs(LTS) and Git for you.
echo -If you have both Nodejs and Git installed then you can close this window
echo *Note: In addition to installing Nodejs and Git, the system also installs Chocolatey to support the installation!
echo ===============================================
echo Tool created by HerokeyVN.
pause
cls
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')); choco install nodejs-lts; choco install git
pause
