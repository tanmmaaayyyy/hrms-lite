# HRMS Lite

## Overview

HRMS Lite is a lightweight web application to manage employees and track daily attendance.  
It supports essential HR operations with a clean and functional interface.

The system allows an admin to manage employees, mark daily attendance, and view summary statistics through a simple dashboard.

---

## Live Application

Frontend: https://your-vercel-url.vercel.app  
Backend: https://your-render-url.onrender.com  

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Features

### Employee Management
- Add employee
- View employee list
- Delete employee
- Unique employee ID validation
- Email format validation
- Duplicate prevention

### Attendance Management
- Mark attendance (Present / Absent)
- Prevent duplicate attendance per date
- Prevent marking attendance for future dates
- View attendance records employee-wise
- Display total present days per employee

### Dashboard
- Total employees
- Present today
- Absent today

---

## Running Locally

### 1. Clone the repository

git clone <repository-url>  
cd hrms-lite  

---

### 2. Backend Setup

cd backend  
npm install  

Create a `.env` file inside the `backend` folder:

PORT=8000  
MONGO_URI=your_mongodb_connection_string  

Start the backend server:

node server.js  

Backend runs on:  
http://localhost:8000  

---

### 3. Frontend Setup

Open a new terminal:

cd frontend  
npm install  

Create a `.env` file inside the `frontend` folder:

VITE_API_URL=http://localhost:8000  

Start the frontend:

npm run dev  

Frontend runs on:  
http://localhost:5173  

---

## Assumptions / Limitations

- Single admin user (no authentication implemented)
- No role-based access control
- No pagination for large datasets
- Attendance cannot be edited once marked
- Designed for lightweight internal HR usage