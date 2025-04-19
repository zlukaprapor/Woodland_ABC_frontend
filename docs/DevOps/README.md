
# 🌐 Fullstack FastAPI + React Проєкт

Цей проєкт складається з бекенду на FastAPI та фронтенду на React. Призначений для створення платформи з авторизацією, завантаженням уроків і можливістю адміністрування.

---

## 🚀 Інструкція для розробника

### ✅ 1. Необхідні залежності та програмне забезпечення

Перед початком встановіть на вашу ОС:

- [Git](https://git-scm.com/)
- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js (v18+)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/) *(опційно)*
- [Docker](https://www.docker.com/) *(опційно)*

---

### 🛠 2. Клонування репозиторію

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

---

### 🧪 3. Налаштування середовища розробки

#### Backend:

```bash
python -m venv venv
source venv/bin/activate  # або venv\Scripts\activate на Windows
pip install -r backend/requirements.txt
```

#### Frontend:

```bash
cd frontend
npm install
```

---

### ⚙️ 4. Створення та налаштування бази даних

#### PostgreSQL:

```sql
CREATE DATABASE myproject;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myuser;
```

#### .env файл:

Створіть `.env` у `backend/`:

```env
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/myproject
SECRET_KEY=your_secret_key
```

---

### 📦 5. Встановлення та конфігурація залежностей

#### Якщо використовується Alembic (SQLAlchemy):

```bash
alembic upgrade head
```

#### Якщо використовується Tortoise ORM:

```bash
aerich upgrade
```

---

### ▶️ 6. Запуск проєкту у режимі розробки

#### Backend:

```bash
uvicorn main:app --reload
```

#### Frontend:

```bash
cd frontend
npm start
```

Веб-сервіси будуть доступні за адресами:
- Фронтенд: [http://localhost:3000](http://localhost:3000)
- Бекенд: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 🧾 7. Базові команди

| Команда                         | Призначення                            |
|----------------------------------|----------------------------------------|
| `uvicorn main:app --reload`     | Запуск бекенду у режимі розробки       |
| `npm start`                     | Запуск фронтенду                       |
| `alembic upgrade head`          | Міграції для SQLAlchemy                |
| `aerich upgrade`                | Міграції для Tortoise ORM              |
| `pre-commit run --all-files`    | Запуск лінтерів і хуків                |
| `pytest`                        | Запуск тестів                          |

---

## 📂 Структура репозиторію

```
project/
│
├── backend/
│   ├── app/                # Основний код FastAPI
│   ├── alembic/            # Міграції SQLAlchemy
│   ├── .env.example        # Зразок конфігурації
│   └── requirements.txt    # Python-залежності
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json        # JS-залежності
│
└── README.md               # Цей файл
```

---

## 🧠 Поради

- Використовуйте `pre-commit` для автоматичної перевірки коду.
- Документація API доступна за `/docs` (Swagger) або `/redoc`.

---

## 📬 Зворотній зв’язок

Якщо у вас є питання або пропозиції — відкрийте [issue](https://github.com/your-username/your-project/issues) або надішліть PR 🙌
