@echo off
setlocal
set PORT=8743
set SITE_DIR=%~dp0site

echo Starting Jenesys site server at http://localhost:%PORT%/
echo Press Ctrl+C to stop.
echo.

start "" /min cmd /c "timeout /t 1 /nobreak >nul && start "" "http://localhost:%PORT%/""
python -m http.server %PORT% --directory "%SITE_DIR%"

endlocal
