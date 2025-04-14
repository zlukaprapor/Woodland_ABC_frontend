
# 🔄 Інструкція з оновлення проєкту у Production

## 1. 🛠️ Підготовка до оновлення

### 🔐 Створення резервних копій
- Резервне копіювання бази даних:
```bash
pg_dump -U prod_user prod_db > backup_$(date +%F).sql
```
- Резервне копіювання директорії проєкту:
```bash
tar -czvf project_backup_$(date +%F).tar.gz /home/deploy/your-project
```

### 📋 Перевірка сумісності
- Переглянути changelog або git diff (зокрема requirements.txt / package.json)
- Перевірити, чи потрібні нові міграції або оновлення залежностей

### 🕒 Планування часу простою
- Якщо зміни впливають на API або БД — запланувати короткий downtime (~5-10 хв)
- Повідомити команду або користувачів, якщо необхідно

---

## 2. 🚀 Процес оновлення

### ⛔ Зупинка служб (опціонально)
```bash
sudo systemctl stop gunicorn
sudo systemctl stop celery  # якщо є
```

### 🔄 Розгортання нового коду
```bash
cd /home/deploy/your-project
git pull origin main
```

### 📦 Оновлення залежностей (якщо потрібно)
```bash
# backend
cd backend
source venv/bin/activate
pip install -r requirements.txt

# frontend
cd ../frontend
npm install
npm run build
```

### 🔁 Міграція БД (якщо зміни є)
```bash
# alembic (SQLAlchemy)
alembic upgrade head

# або Tortoise ORM:
aerich upgrade
```

### ⚙️ Оновлення конфігурацій (якщо є зміни)
- Перевірити `.env`
- Перевірити `nginx`, `supervisor`, `systemd` тощо

### ▶️ Перезапуск сервісів
```bash
sudo systemctl restart gunicorn
sudo systemctl reload nginx
```

---

## 3. ✅ Перевірка після оновлення

> Пропущено (окрема лабораторна)

---

## 4. 🔁 Rollback (Відкат у разі помилки)

### 📁 Варіант 1: Відновлення з резервної копії

- Відновити БД:
```bash
psql -U prod_user prod_db < backup_YYYY-MM-DD.sql
```

- Відновити код:
```bash
tar -xzvf project_backup_YYYY-MM-DD.tar.gz -C /home/deploy/
```

### 🧭 Варіант 2: Git rollback
```bash
git log  # знайти стабільний коміт
git checkout <stable_commit_hash>
```
> Після цього повторити міграцію до попереднього стану (якщо потрібно) або застосувати backup

---

## 🧠 Порада

- Для критичних змін використовуйте окреме staging-середовище
- Після оновлення ведіть журнал змін та версій

