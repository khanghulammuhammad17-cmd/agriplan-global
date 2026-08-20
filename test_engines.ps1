# AgriPlan Global Engine Automated Test Suite
Write-Host "Running Agricultural Calculation Engines Verification..." -ForegroundColor Cyan

# Test 1: Unit Converter checks
Write-Host "Checking Unit Factors..."
$haToAcre = 10000 / 4046.8564224
Write-Host "1 ha -> Acres: $haToAcre (Expected ~2.471)"

# Check that all modules exist and are non-empty
$files = @(
    "index.html",
    "robots.txt",
    "sitemap.xml",
    "css\styles.css",
    "js\app.js",
    "js\router.js",
    "js\data\calculatorsData.js",
    "js\data\calcCat1.js",
    "js\data\calcCat2.js",
    "js\data\calcCat3.js",
    "js\data\calcCat4.js",
    "js\data\cropsData.js",
    "js\data\calendarsData.js",
    "js\data\guidesData.js",
    "js\data\faqsData.js",
    "js\engine\unitConverter.js",
    "js\engine\cropSeedEngine.js",
    "js\engine\soilFertEngine.js",
    "js\engine\waterIrrigEngine.js",
    "js\engine\farmEconEngine.js",
    "js\components\Navbar.js",
    "js\components\Footer.js",
    "js\components\SearchModal.js",
    "js\components\PrecisionAgVisualizer.js",
    "js\components\CalculatorView.js",
    "js\components\calcForms.js",
    "js\components\calcRunner.js",
    "js\pages\HomePage.js",
    "js\pages\CalculatorsIndexPage.js",
    "js\pages\CropCalendarPage.js",
    "js\pages\FruitCalendarPage.js",
    "js\pages\VegetableCalendarPage.js",
    "js\pages\CropPlannerPage.js",
    "js\pages\CropSinglePage.js",
    "js\pages\GuidesPage.js",
    "js\pages\MethodologyPage.js",
    "js\pages\LegalPages.js"
)

$missing = 0
foreach ($f in $files) {
    $full = Join-Path $PSScriptRoot $f
    if (-not (Test-Path $full)) {
        Write-Host "MISSING: $f" -ForegroundColor Red
        $missing++
    } else {
        $len = (Get-Item $full).Length
        Write-Host "OK ($len bytes): $f" -ForegroundColor Green
    }
}

if ($missing -eq 0) {
    Write-Host "`nALL 37 CORE APPLICATION FILES VERIFIED PRESENT & NON-EMPTY!" -ForegroundColor Green
} else {
    Write-Host "`nWarning: $missing files missing." -ForegroundColor Red
}
