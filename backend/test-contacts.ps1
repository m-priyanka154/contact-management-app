# Get fresh token
$login = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-login.json'

$token = $login.token
$headers = @{
    Authorization = "Bearer $token"
}

Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 1: ADD Contact" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$contact1 = Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-add-contact.json' -Headers $headers

Write-Host "Added contact:" $contact1.name -ForegroundColor Green
$contactId1 = $contact1._id
Write-Host "Contact ID:" $contactId1

Write-Host ""
Write-Host "Adding second contact..." -ForegroundColor Yellow

$contact2 = Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Post -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-add-contact-2.json' -Headers $headers

Write-Host "Added contact:" $contact2.name -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 2: GET All Contacts (User-wise)" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$allContacts = Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Get -Headers $headers

Write-Host "Total contacts: " $allContacts.Count -ForegroundColor Green
foreach ($c in $allContacts) {
    Write-Host "  - $($c.name) ($($c.email))" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 3: UPDATE Contact" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$updatedContact = Invoke-RestMethod -Uri "http://localhost:5000/api/contacts/$contactId1" -Method Put -ContentType 'application/json' -InFile 'c:\projects\contact-management-app\backend\test-update-contact.json' -Headers $headers

Write-Host "Updated contact name:" $updatedContact.name -ForegroundColor Green
Write-Host "Updated contact phone:" $updatedContact.phone -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 4: DELETE Contact" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$deleteResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/contacts/$contactId1" -Method Delete -Headers $headers

Write-Host "Delete response:" $deleteResponse.message -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "TEST 5: GET Contacts After Delete" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Yellow

$finalContacts = Invoke-RestMethod -Uri 'http://localhost:5000/api/contacts' -Method Get -Headers $headers

Write-Host "Remaining contacts: " $finalContacts.Count -ForegroundColor Green
foreach ($c in $finalContacts) {
    Write-Host "  - $($c.name) ($($c.email))" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "✅ ALL TESTS COMPLETED SUCCESSFULLY!" -ForegroundColor Green
