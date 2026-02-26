@echo off
REM Script to create submission zip without unnecessary files

echo Creating submission package...

REM Using PowerShell to create zip
powershell -Command "& {Get-ChildItem -Path . -Recurse | Where-Object {$_.FullName -notmatch '(node_modules|\.git|build|dist|\.cache)' -and $_.Name -notmatch '\.(log)$'} | Compress-Archive -DestinationPath submission.zip -Force}"

echo.
echo ✅ Submission package created: submission.zip
echo.
echo 📦 Package contents (excluding node_modules, .git, build folders)
echo.
echo To extract and test:
echo   1. Extract submission.zip
echo   2. cd to extracted folder
echo   3. npm install
echo   4. node directTest.js
