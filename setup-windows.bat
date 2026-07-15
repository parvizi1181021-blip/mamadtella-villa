@echo off
REM ======================================================
REM  Mamadtella Villa - Setup Script for Windows 11
REM  Automated installation and configuration
REM ======================================================

setlocal enabledelayedexpansion

color 0A
cls
title Mamadtella Villa - Setup

echo.
echo ======================================================
echo   دستیار هوشمند ویلای ممد تلا
echo   Mamadtella Villa Smart Assistant Setup
echo ======================================================
echo.

REM Check Node.js
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js not found!
    echo Please download and install Node.js 18+ from: https://nodejs.org
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check Ollama
echo.
echo [2/5] Checking Ollama...
ollama --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [WARNING] Ollama not found!
    echo Download from: https://ollama.ai/download
    echo This is required for AI features to work!
    echo.
    echo Starting Ollama setup...
    start https://ollama.ai/download
    echo Please install Ollama, then run this script again.
    pause
    exit /b 1
)
echo [OK] Ollama is installed

REM Install dependencies
echo.
echo [3/5] Installing npm dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo [OK] Dependencies installed

REM Download Whisper model
echo.
echo [4/5] Setting up Whisper (optional but recommended)...
if not exist models (
    mkdir models
)
if not exist models\ggml-large-v3-turbo-q5_0.bin (
    echo.
    echo Downloading Whisper model (~2GB)...
    echo This will take 5-10 minutes depending on internet speed...
    echo.
    
    REM Use PowerShell for download
    powershell -Command "^
        $ProgressPreference = 'SilentlyContinue'; ^
        $url = 'https://huggingface.co/openai/whisper-large-v3-turbo/resolve/main/ggml-large-v3-turbo-q5_0.bin'; ^
        $output = 'models\ggml-large-v3-turbo-q5_0.bin'; ^
        Write-Host 'Downloading Whisper model...'; ^
        (New-Object Net.WebClient).DownloadFile($url, $output); ^
        Write-Host 'Download complete!'
    "
) else (
    echo [OK] Whisper model already downloaded
)

REM Create data directory
echo.
echo [5/5] Creating data directory...
if not exist data (
    mkdir data
)
echo [OK] Data directory created

REM Setup Ollama models
echo.
echo ======================================================
echo   Ollama Model Setup
echo ======================================================
echo.
echo Pulling Ollama models (this runs in background)...
echo You can interrupt this with Ctrl+C if you prefer to do it later
echo.

start /B cmd /C "ollama pull mistral 2>nul"
start /B cmd /C "ollama pull neural-chat 2>nul"

REM Create .env file if not exists
if not exist .env (
    echo Creating .env file...
    (
        echo # Ollama Configuration
        echo OLLAMA_HOST=http://localhost:11434
        echo OLLAMA_MODEL=mistral
        echo.
        echo # SMS Service ^(optional^)
        echo SMS_ENABLED=false
        echo SMS_USERNAME=
        echo SMS_PASSWORD=
        echo SMS_BODYID=
        echo.
        echo # Debug
        echo DEBUG=false
        echo LOG_LEVEL=info
    ) > .env
)

REM Create config.json if not exists
if not exist config.json (
    echo Creating config.json...
    (
        echo {
        echo   "server": {
        echo     "port": 118
        echo   },
        echo   "gate": {
        echo     "name": "درب حیاط",
        echo     "host": "10.10.10.99",
        echo     "port": 2000,
        echo     "payloadHex": "00 01 02 03 04 05 06 07 08 01 00 01 01 01 00 00 00 00 00 03 01 01 01",
        echo     "timeoutMs": 5000
        echo   },
        echo   "whisper": {
        echo     "enabled": false,
        echo     "ffmpegPath": "ffmpeg",
        echo     "whisperBinPath": ".\whisper.cpp\main",
        echo     "whisperModelPath": ".\models\ggml-large-v3-turbo-q5_0.bin",
        echo     "language": "fa"
        echo   }
        echo }
    ) > config.json
)

echo.
echo ======================================================
echo   Setup Complete! ✓
echo ======================================================
echo.
echo Starting services...
echo.
echo 1. Make sure Ollama is running:
echo    - Open Command Prompt
echo    - Run: ollama serve
echo.
echo 2. In another Command Prompt, start the server:
echo    - Run: npm start
echo.
echo 3. Access the application:
echo    - User Panel: http://localhost:118
echo    - Admin Panel: http://localhost:118/admin
echo    - Default: admin / AdminTella@1404
echo.
echo 4. Change the default password immediately!
echo.
echo ======================================================
echo.
pause
