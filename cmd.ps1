#$Env:Path += ";$PSScriptRoot;C:\New directory 2"

function pause(){
    Write-Host -NoNewLine 'Press any key to continue...';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
}

function Get-ScriptDirectory {
    Split-Path -Parent $PSCommandPath
}