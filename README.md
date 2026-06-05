# Contact Directory

A MERN-stack contact management application for storing, searching, sorting, and importing business contacts.

## Features

- User authentication (sign up / sign in)
- Create, view, edit, and delete contact records
- Search records by any field (partial match)
- Sort records by dynamic fields
- CSV import with column selection and duplicate merging
- Grid and list view for records

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
npm install
npm run dev
```

Backend runs at `http://localhost:8000`

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## Environment Variables

**Backend** (`backend/.env`):

| Variable   | Description              | Example                                  |
|------------|--------------------------|------------------------------------------|
| MONGO_URI  | MongoDB connection string | `mongodb://127.0.0.1:27017/contactdirectory` |

**Frontend** (optional, `.env` in `frontend/`):

| Variable           | Description     | Default                  |
|--------------------|-----------------|--------------------------|
| REACT_APP_API_URL  | Backend API URL | `http://localhost:8000`  |

## API Endpoints

| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| POST   | `/user/signup`              | Register new user    |
| POST   | `/user/signin`              | Login                |
| GET    | `/user/current`             | Get current user     |
| POST   | `/record/getRecords`        | List user records    |
| POST   | `/record/createRecord`      | Create record        |
| POST   | `/record/editRecord`        | Update record        |
| POST   | `/record/deleteRecord`      | Delete record        |
| POST   | `/record/searchRecords`     | Search records       |
| POST   | `/record/getSortedRecords`  | Sort records         |
| POST   | `/record/checkFile`         | Preview CSV columns  |
| POST   | `/record/uploadFile`        | Import CSV data      |
