# Використовуємо Python як базовий образ
FROM python:3.8-slim

# Встановлення робочої директорії
WORKDIR /app

# Копіюємо файли
COPY . /app

# Встановлення залежностей
RUN pip install --no-cache-dir -r requirements.txt

# Запуск додатку
CMD ["python", "app.py"]
