# DevPulse API Server

DevPulse is a robust backend service designed for issue tracking and management. Built with Express, TypeScript, and PostgreSQL, it features secure role-based access control, allowing teams to effectively organize and resolve their technical tasks.

**Live URL**: https://dev-pulse-as-2-two.vercel.app

## Features

- **Issue Tracking:** Create, read, update, and delete issues (bugs, tasks, etc.).
- **Role-Based Access Control:** Secure endpoints tailored for `maintainer` and `contributor` roles.
- **Authentication:** JWT-based user signup and login with secure password hashing.
- **Relational Database:** Robust data management using PostgreSQL.

## Tech Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (using the `pg` driver)
- **Security:** JSON Web Tokens (JWT), bcrypt

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd dev-pulse-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   DB_CONNECTION_STRING=your_postgresql_connection_string
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the application:**
   Start the development server (runs with `tsx watch`):
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and receive a JWT.
- `GET /api/auth/` - Get all users (requires `contributor` role).

### Issue Routes
- `POST /api/issues` - Create a new issue (requires `maintainer` or `contributor` role).
- `GET /api/issues` - Retrieve a list of all issues.
- `GET /api/issues/:id` - Retrieve the details of a single issue.
- `PATCH /api/issues/:id` - Update an existing issue (requires `maintainer` or `contributor` role).
- `DELETE /api/issues/:id` - Delete an issue (requires `maintainer` role).

## Database Schema Summary

The application uses PostgreSQL with the following core tables:

### `users` Table
- `id`: SERIAL PRIMARY KEY
- `name`: VARCHAR(20)
- `email`: VARCHAR(20) UNIQUE NOT NULL
- `password`: TEXT NOT NULL
- `role`: VARCHAR(20) DEFAULT 'contributor'
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### `issues` Table
- `id`: SERIAL PRIMARY KEY
- `title`: VARCHAR(150)
- `description`: TEXT
- `type`: VARCHAR(20) DEFAULT 'bug'
- `status`: VARCHAR(20) DEFAULT 'open'
- `reporter_id`: INT (foreign key referencing `users(id)`)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP
