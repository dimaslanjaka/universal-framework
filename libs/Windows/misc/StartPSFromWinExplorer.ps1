<#
The sample scripts are not supported under any Microsoft standard support 
program or service. The sample scripts are provided AS IS without warranty  
of any kind. Microsoft further disclaims all implied warranties including,  
without limitation, any implied warranties of merchantability or of fitness for 
a particular purpose. The entire risk arising out of the use or performance of  
the sample scripts and documentation remains with you. In no event shall 
Microsoft, its authors, or anyone else involved in the creation, production, or 
delivery of the scripts be liable for any damages whatsoever (including, 
without limitation, damages for loss of business profits, business interruption, 
loss of business information, or other pecuniary loss) arising out of the use 
of or inability to use the sample scripts or documentation, even if Microsoft 
has been advised of the possibility of such damages.
#> 
Function StartPSFromWinExplorer
{
    Param
    (
        [String] $KeyName = "powershell_shell"
    ) 
    #Registry drive HKEY_CLASSES_ROOT
    New-PSDrive -Name HKCR -PSProvider Registry -Root HKEY_CLASSES_ROOT
    if(-not (Test-Path -Path "HKCR:\Directory\shell\$KeyName"))
    {
        Try
        {
            New-Item -itemType String "HKCR:\Directory\shell\$KeyName" -value "Open PowerShell in this Folder" -ErrorAction Stop
            New-Item -itemType String "HKCR:\Directory\shell\$KeyName\command" -value "$env:SystemRoot\system32\WindowsPowerShell\v1.0\powershell.exe -noexit -command Set-Location '%V'" -ErrorAction Stop
            Write-Host "Successfully!"
         }
         Catch
         {
             Write-Error $_.Exception.Message
         }
    }
    else
    {
        Write-Warning "The specified key name already exists. Type another name and try again."
    }
}
StartPSFromWinExplorer