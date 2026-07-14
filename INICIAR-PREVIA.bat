@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:4174/"
"C:\Users\teste\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 4174 --bind 127.0.0.1
