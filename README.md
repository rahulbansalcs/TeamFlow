# TeamFlow

TeamFlow is a full-stack project management application built with React.js, Node.js, Express.js, and PostgreSQL.

It allows users to create and manage projects, organize tasks, assign team members, track task status, add comments, upload task attachments, and monitor project activity.

## Features

- User registration and login
- JWT-based authentication
- Project creation and management
- Project search, filtering, and sorting
- Add and remove project members
- Task creation and management
- Assign tasks to team members
- Task priority and status management
- Task deadlines
- Task comments
- Task attachment uploads
- Project activity tracking
- User profile management
- Dashboard with project and task information
- Light and dark theme support
- Responsive UI

## Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- express-validator
- Multer

### Database

- PostgreSQL
- SQL migrations

## Project Structure

```text
TeamFlow/
├── backend/
│   ├── database/
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── uploads/
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL
- Git

## Backend Setup

Open the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=teamflow
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
JWT_SECRET=your_jwt_secret
PORT=8000
```

Create the PostgreSQL database:

```sql
CREATE DATABASE teamflow;
```

Run the database migrations in the order provided inside:

```text
backend/database/migrations/
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Authentication

TeamFlow uses JWT-based authentication.

New users can register through the application and then use their credentials to log in.

The application does not include default recruiter credentials. A recruiter can create an account using the registration page.

## Main Application Modules

### Dashboard

Provides an overview of projects, tasks, and project activity.

### Projects

Users can:

- Create projects
- Edit projects
- Delete projects
- Search projects
- Filter projects by status
- Sort projects
- View project details

### Project Members

Project owners can:

- Add existing users to a project
- View project members
- Remove members from a project

### Tasks

Users can:

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks
- Change task status
- Set task priority
- Set deadlines
- Upload attachments

### Comments

Users can add comments to tasks and delete comments when required.

### User Profile

Users can manage their profile information such as:

- First name
- Last name
- Phone
- Job title
- Department

## API Structure

The backend provides REST APIs for:

```text
/api/auth
/api/projects
/api/members
/api/tasks
/api/comments
/api/users
/api/dashboard
/api/activity
```

## Security

- Passwords are hashed using bcrypt.
- Authentication uses JWT tokens.
- Protected API routes require authentication.
- Environment variables are used for database credentials and JWT secrets.
- Sensitive `.env` files are excluded from Git.

## Future Improvements

Possible future improvements include:

- Role-based access control
- Email notifications
- Real-time task updates
- Advanced project analytics
- Team chat
- Task search and filtering
- Deployment with cloud PostgreSQL
- Automated testing
- CI/CD integration

## Author

**Rahul Bansal**

B.Tech in Computer Science & Engineering  
MBA in Information Technology

## License

This project is created for educational, portfolio, and demonstration purposes.
