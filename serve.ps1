$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port/"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $url = $request.Url.LocalPath
        if ($url -eq "/") { $url = "/index.html" }
        $path = Join-Path $PSScriptRoot $url
        if (Test-Path $path -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $extension = [System.IO.Path]::GetExtension($path).ToLower()
            $contentType = "text/html; charset=utf-8"
            if ($extension -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
            elseif ($extension -eq ".css") { $contentType = "text/css; charset=utf-8" }
            elseif ($extension -eq ".png") { $contentType = "image/png" }
            elseif ($extension -eq ".jpg" -or $extension -eq ".jpeg") { $contentType = "image/jpeg" }
            elseif ($extension -eq ".svg") { $contentType = "image/svg+xml" }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} catch {
    Write-Host "Error: $_"
} finally {
    $listener.Stop()
}
