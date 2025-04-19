import os
import subprocess

# Оновлення репозиторію
subprocess.run(["git", "pull", "origin", "main"])

# Встановлення залежностей
subprocess.run(["pip", "install", "-r", "requirements.txt"])

# Рестарт сервера
subprocess.run(["sudo", "systemctl", "restart", "myapp"])
