# Скрипт для автоматизації розгортання на Windows
Write-Host "Оновлення репозиторію..."
git pull origin main
Write-Host "Встановлення залежностей..."
pip install -r requirements.txt
Write-Host "Рестарт сервера..."
Restart-Service -Name "myapp"
