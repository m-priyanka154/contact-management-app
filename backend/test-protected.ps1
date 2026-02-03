$login = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-login.json'

$token = $login.token

Write-Host "TEST 2: Protected route WITH valid token" -ForegroundColor Green
Write-Host ""

$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri 'http://localhost:5000/api/protected' -Method Get -Headers $headers | Format-List
