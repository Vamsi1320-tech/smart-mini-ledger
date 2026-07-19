<div align="center">

# 💰 Smart Mini Ledger

### A Full-Stack Personal Finance Management Application

Manage your personal finances with a secure, modern, and responsive web application built using **React**, **FastAPI**, **TypeScript**, and **PostgreSQL**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com/)

---

## 🌐 Live Application

**Frontend**

https://smart-mini-ledger-beta.vercel.app/

**Backend API**

https://smart-mini-ledger-api.onrender.com

**Swagger API Documentation**

https://smart-mini-ledger-api.onrender.com/docs

</div>

---

# 🌟 Highlights

- 🔐 Secure JWT Authentication
- 💰 Income & Expense Tracking
- 📊 Interactive Financial Dashboard
- 🎯 Budget Planner with Browser Notifications
- 📈 Monthly & Category-wise Analytics
- 📄 Export Reports as PDF, Excel & CSV
- 🌙 Light & Dark Mode
- 📱 Fully Responsive Design
- ☁️ Cloud Deployment using Vercel, Render & Neon PostgreSQL

---

# 📖 Overview

Smart Mini Ledger is a modern full-stack personal finance management application that enables users to efficiently monitor and manage their daily financial activities.

The application provides secure authentication, income and expense tracking, budget planning, financial analytics, browser-based budget notifications, and report generation. It is built with a scalable architecture using React, FastAPI, SQLAlchemy, and PostgreSQL, and is deployed using Vercel and Render.

Smart Mini Ledger was developed to provide users with a simple, secure, and intuitive way to manage personal finances while demonstrating modern full-stack development practices.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Password Hashing

---

## 💰 Transaction Management

- Add Income
- Add Expense
- Edit Transactions
- Delete Transactions
- Category-wise Organization

---

## 📊 Dashboard & Analytics

- Total Income
- Total Expenses
- Current Balance
- Monthly Financial Summary
- Category-wise Expense Analysis
- Interactive Charts
- Financial Insights

---

## 🎯 Budget Planner

- Create Monthly Budgets
- Edit Budgets
- Delete Budgets
- Budget Utilization Tracking
- 80% Budget Warning Notification
- Budget Exceeded Notification

---

## 📄 Export Reports

- Export as PDF
- Export as Excel
- Export as CSV

---

## 🎨 User Experience

- Responsive User Interface
- Light & Dark Theme
- Browser Notifications
- Toast Messages
- Confirmation Dialogs

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Hook Form
- Recharts
- React Hot Toast
- SweetAlert2

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT Authentication
- Passlib
- Bcrypt

---

## Database

- PostgreSQL
- Neon Database

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL

---

# 🏗 System Architecture

```text
                 React + TypeScript
                        │
                        │ REST API
                        ▼
                FastAPI Backend
                        │
                 SQLAlchemy ORM
                        │
                        ▼
              PostgreSQL Database
                   (Neon Cloud)
```

---

# 📂 Project Structure

```text
smart-mini-ledger
│
├── backend
│   ├── alembic/
│   ├── app/
│   │   ├── auth/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── .env
│   ├── alembic.ini
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

# 🎥 Demo Video

A complete walkthrough of the Smart Mini Ledger application is available below.

https://drive.google.com/file/d/1uj8-FRe01TDfQ27g0fE4LgD_IAwQ1R1t/view?usp=sharing

**The demonstration covers:**

- User Registration
- User Login
- Dashboard Overview
- Add, Edit & Delete Transactions
- Budget Creation & Management
- Budget Analysis (Under Budget & Over Budget)
- Budget Notifications
- Financial Insights & Analytics
- Interactive Charts
- PDF Export
- Excel Export
- CSV Export
- Light & Dark Mode
- Swagger API Documentation
- Responsive User Interface

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/Vamsi1320-tech/smart-mini-ledger.git

cd smart-mini-ledger
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

Swagger Documentation:

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5174
```

After logging in, users will be redirected to:

```text
http://localhost:5174/dashboard
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env

DATABASE_URL=<PostgreSQL Connection String>

SECRET_KEY=<JWT Secret Key>

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 🔄 Development Workflow

1. Clone the repository
2. Configure environment variables
3. Start PostgreSQL
4. Run Alembic migrations
5. Start the FastAPI backend
6. Start the React frontend
7. Register a new user
8. Explore the dashboard

---

# 📚 REST API Endpoints

## Authentication

```
POST /register
POST /login
```

---

## Transactions

```
GET /transactions
POST /transactions
PUT /transactions/{id}
DELETE /transactions/{id}
```

---

## Budgets

```
GET /budgets
POST /budgets
PUT /budgets/{id}
DELETE /budgets/{id}
```

---

## Dashboard

```
GET /dashboard/summary
GET /dashboard/monthly-summary
GET /dashboard/category-summary
```

---

# 🧩 Challenges & Solutions

|         Challenge          |                        Solution                          |
|----------------------------|----------------------------------------------------------|
| Secure user authentication | Implemented JWT-based authentication using FastAPI       |
| Data persistence           | Used PostgreSQL with SQLAlchemy ORM                      |
| Database migrations        | Managed schema changes using Alembic                     |
| Browser notifications      | Used the Web Notification API for budget alerts          |
| Report generation          | Implemented PDF, Excel, and CSV export functionality     |
| Frontend deployment        | Deployed React application on Vercel                     |
| Backend deployment         | Deployed FastAPI backend on Render                       |
| TypeScript build issues    | Resolved strict type errors before production deployment |

---

# 🚀 Future Enhancements

- Savings Goals
- Recurring Transactions
- Email Reports
- Multi-Currency Support
- OCR Receipt Scanner
- AI Spending Insights
- Expense Prediction
- Mobile Application

---

# 🎯 Skills Demonstrated

This project demonstrates practical experience in:

- Full-Stack Web Development
- REST API Development
- JWT Authentication
- SQLAlchemy ORM
- PostgreSQL Database Design
- React & TypeScript
- State Management
- Responsive UI Development
- Browser Notifications
- Data Visualization
- Cloud Deployment
- Git & GitHub Workflow

---

# 👨‍💻 Author

## Vamsi Krishna

**M.Tech, Metallurgical Engineering**

**Indian Institute of Technology (BHU), Varanasi**

**GitHub**

https://github.com/Vamsi1320-tech

**LinkedIn**

https://www.linkedin.com/in/busakala-vamsi-krishna-b17077242/

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork this repository, create a feature branch, and submit a pull request.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---
