# 💰 **DDS Manager** — система управления движением денежных средств

Тестовое задание для веб-приложения по учету доходов и расходов с возможностью фильтрации по категориям, подкатегориям, статусам и типам операций.

---

## ⚙️ **Backend (Django + DRF)**

**Админка**: [Перейти в админку](https://django-server-production-8abc.up.railway.app/admin/)  
**Swagger**: [Перейти к Swagger документации](https://django-server-production-8abc.up.railway.app/swagger/)  
superuser-admin: `admin`  
password-admin: `admin`

### ✅ **Реализовано:**
- Полноценный REST API для:
  - Типов операций
  - Категорий и подкатегорий
  - Статусов
  - Финансовых операций (CashFlow)
- Админ-панель Django
- Swagger-документация по API (`/swagger/`)
- Загружено на сервер

---

### 🛠 **Стек технологий:**
- Django / Django REST Framework
- PostgreSQL (или SQLite)
- Swagger-yasg (для документации API)
- Railway (деплой)

---

### 🚀 **Как запустить:**

```bash
git clone https://github.com/Islam0122/dds-manager-project-hh.git
cd backend
python -m venv env
source env/bin/activate  # Windows: .\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## ⚙️ **Frontend (React.js + Redux)**

### Почему не Django Template?
Я не выбрал Django Template, так как считаю его менее удобным для динамичных приложений. Мне больше нравится работать с React, который дает больше гибкости и позволяет легко управлять состоянием приложения с помощью Redux.

### ✅ **Реализовано:**
- Все CRUD-запросы для:
  - Типов операций
  - Категорий и подкатегорий
  - Статусов
  - Финансовых операций (CashFlow)
- Структура файлов и store с использованием Redux и Redux Toolkit (slice)
  
### 🚧 **Что не реализовано:**
- Не успел завершить визуальную часть из-за ограниченного времени
- Для отображения таблиц и данных планировалось использовать библиотеку [react-table](https://react-table.tanstack.com/)
- Для иконок планировалось использовать [react-icons](https://react-icons.github.io/react-icons/)
- Для стилей — Tailwind CSS

### 🚀 **Как запустить фронтенд:**
```bash
git clone https://github.com/your-username/dds-manager.git
cd frontend
npm install
npm run dev
```



