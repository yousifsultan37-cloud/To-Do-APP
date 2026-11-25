# Todo API

A RESTful Todo API built with Node.js, Express, and MongoDB using Mongoose.

## Features

- Create, read, update, and delete todo items.
- Validate todo IDs and request data.
- Store creation and update timestamps automatically.
- Keep the code organized with separate models, controllers, and routes.
- Load configuration from environment variables.

## Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- dotenv
- cors

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env`:

PowerShell:

```powershell
Copy-Item .env.example .env
```

Then update `MONGODB_URL` in `.env` with your local MongoDB connection string or MongoDB Atlas connection string.

### 3. Run the API

Development mode with automatic restarts:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API uses port `3000` by default. Set `PORT` in `.env` to use a different port.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/todos` | Get all todos |
| `GET` | `/todos/:id` | Get one todo by ID |
| `POST` | `/todos` | Create a todo |
| `PUT` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

### Create a todo

`POST /todos`

```json
{
  "title": "Learn Express",
  "completed": false
}
```

The `title` field is required. The `completed` field is optional and defaults to `false`.

### Update a todo

`PUT /todos/:id`

```json
{
  "title": "Learn Express and MongoDB",
  "completed": true
}
```

At least one of `title` or `completed` must be provided.
