# 📝 Todo App

A full-stack Todo Application built using **React (Vite)** for the frontend and **FastAPI** for the backend. The application allows users to register, log in securely using JWT authentication, and manage daily tasks with features like search, filtering, due dates, priorities, dark mode, and task statistics.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT Authentication)
- ➕ Add New Tasks
- ✏️ Edit Existing Tasks
- 🗑️ Delete Tasks
- ✅ Mark Tasks as Completed
- 🔍 Search Tasks
- 📂 Filter Tasks (All / Completed / Pending)
- 📅 Set Due Dates
- ⭐ Task Priority (High, Medium, Low)
- 📊 Task Statistics Dashboard
- 🌙 Dark Mode
- 👋 Welcome Dashboard
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- HTML
- CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Pydantic
- Uvicorn

---

## 📁 Project Structure

```
todoapp/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── crud.py
│   ├── schemas.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Sathvika-Paleti/todoapp.git
cd todoapp
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Open another terminal

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## 📸 Screenshots

Add screenshots here after running the application.

- Login Page
- Register Page
- Dashboard
- Dark Mode
- Task Statistics

---

## 🔮 Future Improvements

- User Profile
- Email Verification
- Password Reset
- Task Categories
- Drag & Drop Tasks
- Notifications
- Deployment on Render/Vercel

---

## 👨‍💻 Author

**Sathvika Paleti**

- GitHub: https://github.com/Sathvika-Paleti

---

## 📄 License

This project is developed for learning and portfolio purposes.
