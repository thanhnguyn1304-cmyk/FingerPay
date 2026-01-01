$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
Write-Host "Java Home: $env:JAVA_HOME"
java -version
& "..\tools\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
