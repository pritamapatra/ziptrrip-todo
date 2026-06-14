# Taskly - Full Stack Todo Application

A full stack todo application built with React (Vite) for the frontend and Node.js/Express for the backend. Built as part of the Ziptrrip Developer Intern assignment.

## 🚀 Live Demo

- **Frontend:** https://ziptrrip-todo.vercel.app
- **Backend API:** https://ziptrrip-todo-backend.onrender.com

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| GET | /api/todos/:id | Get single todo |
| PUT | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

## Project Structure
ziptrrip-todo/
├── backend/ # Node.js + Express REST API
├── frontend/ # React + Vite frontend
└── README.md

## Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```
Backend runs on http://localhost:5000

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Features

- Create, read, update and delete todos
- Mark todos as complete or active
- Filter todos by status (All, Active, Completed)
- Filter todos by priority (High, Medium, Low)
- View detailed information for each todo on a separate page
- Responsive design that works on mobile and desktop
- Data persisted in a local JSON file

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router DOM |
| Backend | Node.js, Express.js |
| Storage | JSON file (fs.promises) |
| Styling | Inline styles with Inter font |

## Pages

- `/` - Todo list dashboard with stats, filters and task creation
- `/todo?id=<todo-id>` - Single todo detail page with edit capability
