@echo off
echo -When you press "Enter" the system will start upgrading Nodejs(LTS) and Git for you.
echo *Note: In addition to installing Nodejs and Git, the system also installs Chocolatey to support the installation!
echo ===============================================
echo Tool created by HerokeyVN.
pause
cls
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')); choco upgrade -y nodejs-lts git
pause
