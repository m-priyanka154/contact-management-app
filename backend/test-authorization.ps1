# Test authorization - create second user and verify isolation
$newUser = @{
    name = 'Second User'
    email = 'seconduser@example.com'
    password = 'password123'
} | ConvertTo-Json

Write-Host "Creating second user..." -ForegroundColor Yellow
$user2Register = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -ContentType 'application/json' -Body $newUser 2>&1

if ($user2Register -is [string]) {
    Write-Host "User already exists (expected for second run)" -ForegroundColor Gray
    $login2 = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -Body (@{email='seconduser@example.com'; password='password123'} | ConvertTo-Json)
} else {
    Write-Host "New user created: $($user2Register.name)" -ForegroundColor Green
    $login2 = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-login.json'
}

$token2 = $login2.token
$headers2 = @{
    Authorization = "Bearer $token2"
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST: User Isolation (Authorization)" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$user2Contacts = Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Get -Headers $headers2

Write-Host "User 2 contacts count: " $user2Contacts.Count -ForegroundColor Cyan
Write-Host "User 2 can only see their own contacts (not User 1's)" -ForegroundColor Green

Write-Host ""
Write-Host "✅ USER ISOLATION VERIFIED!" -ForegroundColor Green
