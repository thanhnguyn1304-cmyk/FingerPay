# setup_maven.ps1
$MavenVersion = "3.9.6"
$MavenUrl = "https://archive.apache.org/dist/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
$InstallDir = "$PSScriptRoot\tools"
$MavenDir = "$InstallDir\apache-maven-$MavenVersion"
$ZipFile = "$InstallDir\maven.zip"

# Create tools directory
if (-not (Test-Path -Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir | Out-Null
    Write-Host "Created tools directory."
}

# Check if already installed
if (Test-Path -Path "$MavenDir\bin\mvn.cmd") {
    Write-Host "Maven is already installed at $MavenDir"
    $env:Path = "$MavenDir\bin;$env:Path"
    mvn -version
    exit 0
}

# Download
Write-Host "Downloading Maven $MavenVersion..."
Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipFile

# Extract
Write-Host "Extracting Maven..."
Expand-Archive -Path $ZipFile -DestinationPath $InstallDir -Force

# Cleanup
Remove-Item -Path $ZipFile

# Verify
if (Test-Path -Path "$MavenDir\bin\mvn.cmd") {
    Write-Host "Maven installed successfully."
    Write-Host "Path: $MavenDir"
} else {
    Write-Error "Maven installation failed."
    exit 1
}
