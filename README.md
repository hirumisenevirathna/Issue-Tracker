# 🐞 Issue Tracker Application

A full-stack Issue Tracker application built as part of the **Associate Frontend Software Engineer** assignment.  
The system allows users to authenticate, create issues, manage them, and track progress through a clean dashboard UI.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API (Authentication)
- Axios
- Framer Motion
- Plain CSS / Inline Styling

### Backend
- Node.js
- Express.js
- MongoDB (Local)
- Mongoose
- JWT Authentication
- bcrypt

### Tools
- MongoDB Compass
- Postman
- Git & GitHub

---

## ✨ Features

### Authentication
- User registration with email & password
- Secure password hashing using bcrypt
- JWT-based login
- Protected routes using middleware

### Issue Management
- Create, view, update, and delete issues
- Users can manage only their own issues
- Pagination using page & limit
- Filtering by status and priority
- Search using title and description (regex)

### Dashboard
- Status summary (Open / In Progress / Done)
- Quick navigation using sidebar

### UI / UX
- Sidebar navigation layout
- Animated components
- Clean, responsive design
- Focus on layout fundamentals

---

## 🔐 Authentication Flow

- Passwords are hashed using bcrypt before storing in MongoDB.
- On successful login, the server generates a JWT token.
- The client stores the token and sends it in the `Authorization` header as a Bearer token.
- A JWT middleware verifies the token and attaches user information to the request.
- If the token is missing or invalid, access is denied.

---

## 📊 Pagination, Filters & Search

- Pagination is implemented using `page` and `limit` query parameters.
- Issues can be filtered by `status` and `priority`.
- Search is implemented using regex on `title` and `description`.
- This approach improves performance and usability as data grows.

---

## 🗂️ Issue Data Model

Each issue contains:
- `title` – Issue title
- `description` – Detailed information
- `status` – OPEN / IN_PROGRESS / DONE
- `priority` – LOW / MEDIUM / HIGH
- `createdBy` – Logged-in user ID (from JWT middleware)
- `createdAt` & `updatedAt` – Auto-managed timestamps

---

## 🎨 Styling Approach

Styling is implemented using plain CSS and inline styles to demonstrate layout fundamentals and ease debugging.  
The project structure allows easy migration to Tailwind CSS or other styling frameworks if required.

---

## 🗄️ Database

- MongoDB (Local)
- Verified using MongoDB Compass
- Database name: `issue_tracker`
- Collections:
  - `users`
  - `issues`

---

## ▶️ Running the Project

### Backend
```bash
cd server
npm install
npm run dev
### Frontend
```bash
cd client
npm install
npm run dev