@echo off
echo Checking PostgreSQL Service...
echo.

sc query postgresql-x64-16 2>nul | find "RUNNING" >nul
if %ERRORLEVEL% == 0 (
    echo PostgreSQL is running!
    echo.
    echo Connection Details:
    echo Host: localhost
    echo Port: 5432
    echo Database: horizonvfx
    echo User: postgres
    echo.
) else (
    echo PostgreSQL is NOT running.
    echo.
    echo To start PostgreSQL:
    echo 1. Open Windows Services (Win+R, type: services.msc)
    echo 2. Find "postgresql-x64-16" (or similar version)
    echo 3. Right-click and select "Start"
    echo.
    echo Or run as administrator:
    echo net start postgresql-x64-16
    echo.
)

pause
