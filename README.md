# 🐞 Issue Tracker Application (TraceFlow)

A modern full-stack **Issue Tracking Web Application** built as part of the  
**Associate Frontend Software Engineer** assignment.

The application allows users to authenticate, create and manage issues, track progress visually,  
and interact with a clean, animated, and responsive UI.

---

## 🌐 Live Experience (Key UI Highlights)

- Full-screen animated **Landing Page** with video background
- Smooth entrance animations inspired by modern UI systems (Animate-UI style)
- Glassmorphism-based layout
- Sidebar navigation with hover expansion
- Clear separation between public & protected routes

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Context API (Authentication)
- Axios
- Inline CSS & Plain CSS
- Custom animations (no UI libraries)
- Video background & motion effects

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Tools
- MongoDB Compass
- Postman
- Git & GitHub

---

## ✨ Features

### 🔓 Authentication
- User registration with email & password
- Secure password hashing using **bcrypt**
- JWT-based login authentication
- Protected routes using middleware
- Automatic logout handling
- Public landing page access

---

### 🐛 Issue Management
- Create, view, update, and delete issues
- Users can manage **only their own issues**
- Issue status workflow:
  - `OPEN`
  - `IN_PROGRESS`
  - `DONE`
- Priority levels:
  - `LOW`
  - `MEDIUM`
  - `HIGH`

---

### 📊 Dashboard & Listing
- Status summary cards (Open / In Progress / Done)
- Pagination using `page` & `limit`
- Filter issues by:
  - Status
  - Priority
- Search issues by:
  - Title
  - Description (regex-based search)

---

### 🎨 UI / UX
- Animated landing page with video background
- Glassmorphism design system
- Hover-expandable sidebar
- Tooltip navigation in collapsed mode
- Responsive layout
- Clean visual hierarchy
- Focus on usability & clarity

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. Password is hashed using **bcrypt** before storing in MongoDB.
3. On successful login:
   - Server generates a **JWT token**
4. Client stores the token and sends it in requests as:
Authorization: Bearer <token>

5. JWT middleware:
- Validates token
- Extracts user ID
- Attaches user info to request
6. Protected routes reject unauthenticated access.

---

## 📊 Pagination, Filters & Search

- Pagination uses query params:
- `page`
- `limit`
- Filtering by:
- `status`
- `priority`
- Search implemented using **MongoDB regex** on:
- `title`
- `description`
- Ensures performance scalability as data grows.

---

## 🗂️ Issue Data Model

Each issue contains:

- `title` – Issue title
- `description` – Detailed description
- `status` – OPEN / IN_PROGRESS / DONE
- `priority` – LOW / MEDIUM / HIGH
- `createdBy` – User ID (from JWT middleware)
- `createdAt` – Auto-generated timestamp
- `updatedAt` – Auto-updated timestamp

---

## 🗄️ Database

- MongoDB
- Database name: `issue_tracker`
- Verified using **MongoDB Compass**
- Collections:
- `users`
- `issues`

---

## 🎯 Routing Structure

### Public Routes
- `/` → Landing Page
- `/login`
- `/register`

### Protected Routes
- `/dashboard`
- `/issues`
- `/issues/new`

Unauthenticated users are redirected to the landing page or login page.

---

## ▶️ Running the Project Locally

### Backend
```bash
cd server
npm install
npm run dev
```
### Frontend
```bash
cd client
npm install
npm run dev
