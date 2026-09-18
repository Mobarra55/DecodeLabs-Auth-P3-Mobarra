# DecodeLabs Backend Internship — Project 2: Database Integration (CRUD)

A REST API built with **Node.js**, **Express**, and **PostgreSQL** (via **Prisma ORM**) that performs full CRUD (Create, Read, Update, Delete) operations on a User resource, with permanent data persistence and duplicate-entry prevention.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

## Features
- Create new users (with duplicate email prevention)
- Read all users / read a single user by ID
- Update an existing user's details
- Delete a user
- Proper HTTP status codes (200, 201, 204, 404, 409)
- Data permanently stored in a PostgreSQL database

## User Schema
| Field     | Type     | Notes                  |
|-----------|----------|-------------------------|
| id        | Int      | Auto-incrementing, primary key |
| name      | String   | Required                |
| email     | String   | Required, unique        |
| age       | Int      | Optional                |
| createdAt | DateTime | Auto-set on creation     |

## API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|---------------------------|
| POST   | /users        | Create a new user         |
| GET    | /users        | Get all users              |
| GET    | /users/:id    | Get a single user by ID    |
| PUT    | /users/:id    | Update a user by ID        |
| DELETE | /users/:id    | Delete a user by ID        |

## Setup Instructions

1. Clone this repository
   ```
   git clone https://github.com/Mobarra55/DecodeLabs-CRUD-P2-Mobarra.git
   cd DecodeLabs-CRUD-P2-Mobarra
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root folder with your own PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decodelabs_crud?schema=public"
   ```

4. Run the database migration
   ```
   npx prisma migrate dev
   ```

5. Start the server
   ```
   node server.js
   ```

   Server will run on `http://localhost:3000`

## Example Request (Create User)

**POST** `/users`
```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "age": 22
}
```

## What I Learned
- Connecting a Node.js/Express API to a real PostgreSQL database
- Designing a database schema with Prisma
- Implementing full CRUD operations
- Preventing duplicate entries using unique constraints
- Handling errors and returning correct HTTP status codes

---
Part of the DecodeLabs Backend Development Internship — Industrial Training Kit, 2026.
