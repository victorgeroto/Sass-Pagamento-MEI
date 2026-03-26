$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$venvPython = Join-Path $PSScriptRoot "venv/Scripts/python.exe"

if (-not (Test-Path $venvPython)) {
  Write-Error "Ambiente virtual nao encontrado em backend/venv. Crie com: python -m venv backend/venv"
}

Set-Location $PSScriptRoot
& $venvPython -m pip install -r requirements.txt
& $venvPython -m uvicorn main:app --host 127.0.0.1 --port 8010 --reload
