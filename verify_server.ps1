$urls = @(
    "http://localhost:8080/index.html",
    "http://localhost:8080/robots.txt",
    "http://localhost:8080/sitemap.xml",
    "http://localhost:8080/css/styles.css",
    "http://localhost:8080/js/app.js",
    "http://localhost:8080/js/data/calculatorsData.js",
    "http://localhost:8080/js/engine/cropSeedEngine.js",
    "http://localhost:8080/js/engine/waterIrrigEngine.js"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing
        Write-Host "HTTP $($res.StatusCode) -> $u ($($res.RawContentLength) bytes, Content-Type: $($res.Headers['Content-Type']))" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: $u -> $_" -ForegroundColor Red
    }
}
