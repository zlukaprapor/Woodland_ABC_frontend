#!/bin/bash
# Скрипт для автоматизації розгортання
echo "Оновлення репозиторію..."
git pull origin main
echo "Встановлення залежностей..."
pip install -r requirements.txt
echo "Рестарт сервера..."
sudo systemctl restart myapp
