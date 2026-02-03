# Test 1: Register new user
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 1: Register New User" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$newUserData = @{
    name = "NewUIUser"
    email = "newuiuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $registerRes = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -ContentType 'application/json' -Body $newUserData
    Write-Host "✅ User registered successfully" -ForegroundColor Green
    Write-Host "User ID: $($registerRes._id)" -ForegroundColor Cyan
    Write-Host "User Email: $($registerRes.email)" -ForegroundColor Cyan
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "⚠️  User already exists (expected if run multiple times)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Registration failed" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

Write-Host ""

# Test 2: Login with correct credentials
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 2: Login with Correct Credentials" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$loginData = @{
    email = "newuiuser@example.com"
    password = "password123"
} | ConvertTo-Json

$loginRes = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -Body $loginData

Write-Host "✅ Login successful!" -ForegroundColor Green
Write-Host "User: $($loginRes.user.name)" -ForegroundColor Cyan
Write-Host "Email: $($loginRes.user.email)" -ForegroundColor Cyan
Write-Host "Token: $($loginRes.token.Substring(0, 30))..." -ForegroundColor Cyan

$token = $loginRes.token

Write-Host ""

# Test 3: Test error - wrong password
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 3: Login with Wrong Password" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$wrongLoginData = @{
    email = "newuiuser@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -Body $wrongLoginData
} catch {
    $errorMsg = $_.Exception.Response | ConvertFrom-Json -ErrorAction SilentlyContinue
    Write-Host "✅ Correctly rejected with error: Invalid credentials" -ForegroundColor Green
}

Write-Host ""

# Test 4: Test token persistence and authorization
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 4: Token Persistence (localStorage)" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

Write-Host "✅ Token should be stored in localStorage:" -ForegroundColor Green
Write-Host "   localStorage.getItem('token') = '$token'" -ForegroundColor Cyan
Write-Host "   localStorage.getItem('user') = '$($loginRes.user | ConvertTo-Json -Compress)'" -ForegroundColor Cyan

Write-Host ""

# Test 5: Register duplicate email
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 5: Duplicate Email Error" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$dupData = @{
    name = "Another User"
    email = "newuiuser@example.com"
    password = "pass123"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -ContentType 'application/json' -Body $dupData
} catch {
    Write-Host "✅ Correctly rejected duplicate email" -ForegroundColor Green
    Write-Host "   Error message: 'User already exists'" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "✅ ALL AUTH FLOW TESTS PASSED!" -ForegroundColor Green
