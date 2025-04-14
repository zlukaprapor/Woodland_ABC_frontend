
# 🚀 Інструкція з розгортання проєкту у Production

## 🖥 Вимоги до апаратного забезпечення

**Мінімальні системні вимоги для одного сервера (або VM):**

| Компонент     | Мінімум                   | Рекомендовано                |
|---------------|---------------------------|------------------------------|
| Архітектура   | x86_64 (amd64)            | x86_64                       |
| CPU           | 2 ядра                    | 4+ ядер                      |
| RAM           | 2 GB                      | 4+ GB                        |
| Диск          | 10+ GB SSD                | 20+ GB SSD (з логами)       |
| OS            | Ubuntu 22.04 LTS          | Ubuntu Server LTS           |

---

## 🔧 Необхідне програмне забезпечення

- Python 3.11+
- Node.js LTS (v18+)
- Nginx
- PostgreSQL 14+
- Redis (опціонально)
- Gunicorn або Uvicorn with Gunicorn worker
- Docker + docker-compose (опціонально)
- Certbot (Let's Encrypt)
- Supervisor або systemd

---

## 🌐 Налаштування мережі

- Відкриті порти:
  - 80 — HTTP
  - 443 — HTTPS
  - 5432 — PostgreSQL (опціонально)
- Брандмауер:
  - Дозволити лише необхідні порти
  - Заборонити доступ до Redis тощо

---

## ⚙️ Конфігурація серверів

```bash
sudo apt update && sudo apt upgrade -y
adduser deploy
usermod -aG sudo deploy
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## 🗃️ Налаштування СУБД (PostgreSQL)

```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
```

```sql
CREATE DATABASE prod_db;
CREATE USER prod_user WITH PASSWORD 'prod_password';
GRANT ALL PRIVILEGES ON DATABASE prod_db TO prod_user;
```

---

## 🚀 Розгортання коду

```bash
git clone https://github.com/your-org/your-project.git
cd your-project
```

**.env:**
```env
DATABASE_URL=postgresql://prod_user:prod_password@localhost:5432/prod_db
SECRET_KEY=your_production_secret
ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
```

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head  # або aerich upgrade
```

**Gunicorn запуск:**
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 127.0.0.1:8000
```

---

## 🌐 Nginx конфіг

```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /home/deploy/your-project/frontend/build;
        index index.html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /docs {
        proxy_pass http://127.0.0.1:8000/docs;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/yourproject /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Перевірка працездатності

1. Відкрити сайт: `https://yourdomain.com`
2. Перевірити `/docs`
3. Статуси:
```bash
systemctl status nginx
systemctl status postgresql
```

4. Логи:
```bash
journalctl -u gunicorn
tail -f /var/log/nginx/access.log
```
