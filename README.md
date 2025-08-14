# 🏋️‍♀️ Fitness Tracker App

A fitness tracker application built with **React.js (frontend)** and **Node.js with TypeScript (backend)**. The app allows users to register, login, update personal profiles, and set fitness goals like steps, sleep, and water intake.

---

## 🚀 Features

- User Authentication (JWT-based)
- Profile Management
- Set and Track Fitness Goals
- Responsive UI with React & Material UI
- Secure backend with Express and TypeScript

---

---

## ✅ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [postgresql](#)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SangeethaCD/Fitness_tracker.git
cd fitness-tracker

```

### Setup the Backend
```bash
cd backend
npm install
```

```bash
### Environment Variables

Create a .env file in the backend/ directory with the following:
DB_USERNAME=username 
DB_NAME=name of database
DB_PORT=port
DB_PASSWORD=password
DB_JWT_TOKEN=secret key
```

### Run the Backend Server
```bash
npm run dev
```

### Setup the Frontend
```bash
cd ../frontend
npm install
```

### Run the Frontend
```bash
npm run dev
```
Visit the frontend at http://localhost:5173

| Method | Endpoint            | Description               | Auth Required  |
| ------ | ------------------- | ------------------------- | -------------  |
| POST   | `/user/register`    | Register a new user       | ❌             |
| POST   | `/user/login`       | Login and receive a token | ❌             |
| GET    | `/user/profile/:id` | Get user profile by ID    | ✅             |
| PUT    | `/user/profile/`    | Update user profile       | ✅             |
| GET    | `/user/goals/:id`   | Get user fitness goals    | ✅             |
| PUT    | `/user/goals/`      | Update fitness goals      | ✅             |




