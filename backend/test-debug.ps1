# Debug: Check user IDs
$user1Login = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-login.json'

Write-Host "User 1 ID: " $user1Login.user.id -ForegroundColor Cyan

$user2Login = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -Body (@{email='seconduser@example.com'; password='password123'} | ConvertTo-Json)

Write-Host "User 2 ID: " $user2Login.user.id -ForegroundColor Cyan

$headers1 = @{
    Authorization = "Bearer $($user1Login.token)"
}

$headers2 = @{
    Authorization = "Bearer $($user2Login.token)"
}

Write-Host ""
Write-Host "User 1 contacts:" -ForegroundColor Yellow
(Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Get -Headers $headers1) | ForEach-Object { Write-Host "  - $($_.name) (user: $($_.user))" }

Write-Host ""
Write-Host "User 2 contacts:" -ForegroundColor Yellow
(Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Get -Headers $headers2) | ForEach-Object { Write-Host "  - $($_.name) (user: $($_.user))" }
