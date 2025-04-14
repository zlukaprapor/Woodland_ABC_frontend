**start_dev.sh – запуск у режимі розробки**

#!/bin/bash
echo "🔧 Запуск проєкту в режимі розробки..."

cd backend || exit
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

cd ../frontend || exit
npm run dev


**start_prod.sh – запуск у продакшн-режимі**

#!/bin/bash
echo "Запуск проєкту в production-режимі..."

cd backend || exit
source venv/bin/activate
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 127.0.0.1:8000 &

cd ../frontend || exit
npm run build
npx serve -s build -l 3000


**Procfile – для Foreman або Heroku-стилю**
web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app --bind 0.0.0.0:8000
frontend: npx serve -s frontend/build -l 3000
