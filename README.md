# 🌲 Лісова абетка:  Фронтенд

Це фронтенд частина навчального вебдодатку для дітей, створеного для вивчення української абетки. Інтерфейс розроблений з урахуванням вікових особливостей дітей – барвистий, інтерактивний та зручний.

---

## 📁 Структура проєкту

frontend/
├── public/ # Статичні файли (іконки, favicon, index.html)
├── src/ # Основний код React
│ ├── assets/ # Зображення, звуки, стилі
│ ├── components/ # Повторно використовувані компоненти
│ ├── pages/ # Сторінки додатку (старт, урок, профіль)
│ ├── routes/ # Навігація (React Router)
│ ├── api/ # API-запити до бекенду
│ ├── utils/ # Хелпери, функції
│ └── App.jsx # Головний компонент
├── vite.config.js # Налаштування Vite
├── package.json # Залежності та скрипти
└── README.md # Документація

---

## 🚀 Технології

* **React 18+**
* **Vite** – швидкий білд та дев-сервер
* **React Router DOM** – маршрути
* **Tailwind CSS** – стиль у дитячому казковому стилі
* **Framer Motion** – анімації
* **Axios** – для HTTP-запитів
* **Lucide-react**, **ShadCN/ui** – для іконок та компонентів

---

## 🧒 Особливості

* 🌟 Барвистий інтерфейс для дітей
* 🦉 Персонаж-Сова (інтерактивний помічник)
* 🔤 Презентація кожної літери (велика/мала, вимова)
* 🧹 Міні-ігри: "Поле чудес", квізи, розпізнавання об'єктів
* 📝 Авторизація користувача
* ⏳ Збереження прогресу проходження уроків
* 📂 Завантаження контенту з бекенду

---

## 🛠️ Встановлення

> Вимоги: Node.js 18+, npm або yarn

```bash
git clone https://github.com/your-user/forest-alphabet-frontend.git
cd frontend
npm install
npm run dev
```

> Фронтенд працює на [http://localhost:5173](http://localhost:5173)
> Бекенд має бути запущений на [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Конфігурація

Файл `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## 🧪 Тестування

(За потреби, якщо додані тести)

```bash
npm run test
```

---

## 📦 Збірка для продакшну

```bash
npm run build
```

Файли згенеруються у `/dist/`, готові до деплою.

---
## 📦 Збірка для DOCKER
# Збірка образу
docker build -t woodland-frontend .

# Запуск контейнера
docker run -d -p 3000:80 --name woodland-frontend-container woodland-frontend

## 📄 Ліцензія

MIT License.
Copyright (c) 2025 Oleksii Tkachenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
---

## 📬 Контакти

> Розробник: **Oleksii Tkachenko**
