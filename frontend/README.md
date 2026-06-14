# Frontend - Taskly React Application

A multi-page React application built with Vite and React Router DOM. Communicates with the Express backend via REST API calls using the native fetch API.

## Setup

```bash
npm install
npm run dev
```

Frontend runs on http://localhost:5173

> Make sure the backend server is running on http://localhost:5000 before starting the frontend.

## Pages

### Page 1: Todo List (`/`)
The main dashboard displaying all tasks.

**Features:**
- View all todos in a clean card layout
- Stats bar showing Total, Active and Completed counts
- Create a new todo using the New Task form (title, description, due date, priority)
- Toggle todo completion status via the circle button
- Delete a todo (appears on card hover)
- Filter todos by status: All, Active, Completed
- Filter todos by priority: All, High, Medium, Low
- Click any task title to navigate to its detail page
- Skeleton loading state while fetching data
- Empty state when no tasks match the filter

### Page 2: Todo Detail (`/todo?id=<todo-id>`)
A dedicated page for viewing and editing a single todo.

**Features:**
- Receives todo ID via query parameter (`?id=`)
- Displays full task details: title, description, due date, priority, created at
- Toggle completion status
- Edit mode to update title, description, due date and priority
- Delete task and redirect to list
- 404 state if task ID is not found
- Back navigation to the list page

## Project Structure
frontend/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx # Sticky navigation bar
│ │ └── TodoCard.jsx # Individual task card component
│ ├── pages/
│ │ ├── TodoList.jsx # Main dashboard page
│ │ └── TodoDetail.jsx # Single todo detail page
│ ├── App.jsx # React Router setup
│ ├── main.jsx # React entry point
│ └── index.css # Global base styles
├── index.html # HTML entry point with Inter font
└── vite.config.js # Vite configuration

## Routing

This application uses React Router DOM v6 for client-side routing, implementing a multi-page structure as required.

| Path | Component | Description |
|---|---|---|
| `/` | TodoList | Main task dashboard |
| `/todo?id=:id` | TodoDetail | Single task detail view |

## Assumptions

- Backend must be running locally on port 5000
- No authentication is implemented as it was not required
- Data is not paginated as the scope is a demo application
- Priority defaults to Medium if not specified during creation
