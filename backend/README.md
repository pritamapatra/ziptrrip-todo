# Backend - Taskly REST API

A Node.js and Express.js REST API that handles CRUD operations for todos. Data is persisted in a local JSON file using Node's built-in `fs.promises` module.

## Setup

```bash
npm install
npm start
```

Server runs on http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/todos | Fetch all todos |
| GET | /api/todos/:id | Fetch a single todo by ID |
| POST | /api/todos | Create a new todo |
| PUT | /api/todos/:id | Update an existing todo |
| DELETE | /api/todos/:id | Delete a todo |

## Request Body (POST / PUT)

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "dueDate": "YYYY-MM-DD (optional)",
  "priority": "High | Medium | Low (optional, defaults to Medium)",
  "isCompleted": "boolean (optional, defaults to false)"
}
```

## Todo Data Schema

```json
{
  "id": "uuid-v4",
  "title": "string",
  "description": "string",
  "dueDate": "ISO date string or null",
  "priority": "High | Medium | Low",
  "isCompleted": "boolean",
  "createdAt": "ISO date string"
}
```

## Project Structure
backend/
├── src/
│ ├── controllers/
│ │ └── todoController.js # CRUD logic using fs.promises
│ ├── routes/
│ │ └── todoRoutes.js # Express route definitions
│ └── server.js # Express app entry point
├── data/
│ └── todos.json # JSON file database
└── package.json

## Dependencies

- express - Web framework
- cors - Cross-origin resource sharing
- uuid - Unique ID generation
