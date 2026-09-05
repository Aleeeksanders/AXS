$enc = [System.Text.Encoding]::UTF8
$allMd = Get-ChildItem -Path 'C:\Proyectos\AXS' -Filter '*.md' -Recurse
$count = 0
foreach ($f in $allMd) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $s = $enc.GetString($bytes)
    $bytes2 = [System.Text.Encoding]::GetEncoding(1252).GetBytes($s)
    $fixed = $enc.GetString($bytes2)
    if ($fixed -ne $s) {
        Write-Host "STILL BROKEN: $($f.Name)"
        $count++
    }
}
Write-Host ""
Write-Host "Still double-encoded: $count files"
if ($count -eq 0) {
    Write-Host "Vault encoding is CLEAN."
}
