# DecodeLabs Backend Internship — Project 3: Secure Authentication System

A REST API built with **Node.js**, **Express**, **PostgreSQL** (via **Prisma ORM**), **bcrypt**, and **JWT** that implements secure user authentication — password hashing, token-based login, and protected routes.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- bcrypt (password hashing)
- jsonwebtoken (JWT)

## Features
- User registration with hashed passwords (never stored in plain text)
- Login that issues a JWT token valid for 1 hour
- Protected route that requires a valid token to access
- Passwords never returned in any API response

## API Endpoints

| Method | Endpoint    | Description                          | Auth Required |
|--------|-------------|---------------------------------------|----------------|
| POST   | /register   | Create a new user (password hashed)   | No             |
| POST   | /login      | Log in and receive a JWT token         | No             |
| GET    | /profile    | Get the logged-in user's profile       | Yes (Bearer token) |

## Setup Instructions

1. Clone this repository
   ```
   git clone https://github.com/Mobarra55/DecodeLabs-Auth-P3-Mobarra.git
   cd DecodeLabs-Auth-P3-Mobarra
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root folder:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decodelabs_crud?schema=public"
   JWT_SECRET="your_own_secret_key"
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

## Example Requests

**Register**
```
POST /register
{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "mypassword123",
  "age": 22
}
```

**Login**
```
POST /login
{
  "email": "ali@example.com",
  "password": "mypassword123"
}
```
Returns a JWT token.

**Access protected route**

Add header: `Authorization: Bearer <token>`
```
GET /profile
```

## What I Learned
- Hashing passwords with bcrypt instead of storing plain text
- Generating and verifying JSON Web Tokens (JWT)
- Writing custom Express middleware to protect routes
- Using `.env` variables properly with the `dotenv` package
- Debugging subtle bugs (like a `split(' ')` vs `split('')` typo) that cause silent authentication failures

---
Part of the DecodeLabs Backend Development Internship — Industrial Training Kit, 2026.
