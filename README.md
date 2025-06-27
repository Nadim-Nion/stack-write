# Stack Write - Blog Project (Backend)

A powerful and secure backend system for a blogging platform with role-based access control, developed with TypeScript, Node.js, Express, and MongoDB.

---

## Project Resources:

- 🔗 **Live Deployment (Server) Link:** [Vercel](stack-write.vercel.app)
- 🔐 **Admin Login Credentials:**
  - email: `admin@stack-write.com`
  - Password: `admin@123`
- 🎥 **Project Overview Video:** [Watch Here](https://your-video-link.com)

---

## Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Entity Relationship Diagram (ERD)](#-entity-relationship-diagram-erd)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Error Handling](#-error-handling)
- [License](#-license)
- [Contribution](#-contribution)
- [About Me](#-about-me)

---

## Project Overview

The **Stack Write** backend provides a fully functional API for a blogging platform, enabling users to perform CRUD operations on their blogs. It also includes role-based permissions for **Admins** and **Users**, secure JWT-based authentication, and a powerful public API for reading blogs with advanced search, filter, and sort functionalities.

---

## Features

### User Roles

- **Admin**
  - Manually created
  - Can block users and delete any blog
- **User**
  - Can register, log in
  - Can create, update, delete their own blogs

### Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Secure routes with middleware

### Blog Management

- CRUD operations for blogs (by authors only)
- Public blog listing with search, filter, and sort

### Admin Functionalities

- Block any user
- Delete any blog

---

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Validation:** Zod
- **Security:** Bcrypt

---

## API Endpoints

Please refer to the full API documentation [here](#) or check below for highlights:

### Authentication

- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and receive access token
- `POST /api/auth/refresh-token` — Generates the new access token after being expired

### Blogs

- `POST /api/blogs` — Create blog (Auth Required)
- `PATCH /api/blogs/:id` — Update blog (Author Only)
- `DELETE /api/blogs/:id` — Delete blog (Author Only)
- `GET /api/blogs` — Public endpoint with `search`, `sortBy`, `sortOrder`, and `filter` query support

### Admin Actions

- `PATCH /api/admin/users/:userId/block` — Block user
- `DELETE /api/admin/blogs/:id` — Delete any blog

---

## Entity Relationship Diagram (ERD)

The following diagram illustrates the database structure, including entities like `User`, `Role`, and `Blog`, along with their relationships.

![ER Diagram](https://raw.githubusercontent.com/Nadim-Nion/stack-write/5755f7990ed9c465c597497a38868e7ce9b1518f/stack-write.PNG)

👉 [Click here](https://lucid.app/lucidchart/9a860857-ee4f-447d-b7e9-7097fe6fef28/edit?viewport_loc=-146%2C14%2C2324%2C1079%2C0_0&invitationId=inv_e57d3a48-b76c-482b-9773-704745ad3b54) to view the full diagram on Lucid Chart.

---

## Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nadim-Nion/stack-write.git
cd stack-write
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create .env File

Create a `.env` file in the root directory of your project and copy the environment variables from below:

### 4️⃣ Run the Server

### 📌 Development Mode (with Auto-Reload)

To run the project in development mode with automatic reloading on code changes:

```bash
npm run start:dev
```

This uses `ts-node-dev` under the hood, which watches your TypeScript files and restarts the server automatically on changes.

### 📌 Required Dev Dependency

Make sure you have `ts-node-dev` installed:

```bash
npm install --save-dev ts-node-dev
```

Your `package.json` should include:

```json
"scripts": {
  "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts"
}
```

### 📌 Production Build and Start

1. Build the production-ready files:

```bash
npm run build
```

2. Start the server:

```bash
npm run start:prod
```

This will execute the compiled code from the `dist/` directory.

Your `package.json` should include:

```json
"scripts": {
 "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
  "build": "tsc",
}
```

---

## Environment Variables

Make sure to include the following in your `.env` file:

```plaintext
NODE_ENV=<your-environment> # e.g., development, production
PORT=<your-port-number>
DATABASE_URL=<your-mongodb-uri>

BCRYPT_SALT_ROUNDS=<your-salt-rounds> # e.g., 10, 12, 14

JWT_ACCESS_SECRET=<your-access-secret>
JWT_ACCESS_EXPIRES_IN=<your-access-token-expiry> # e.g., 1d, 2h, 30m

JWT_REFRESH_SECRET=<your-refresh-secret>
JWT_REFRESH_EXPIRES_IN=<your-refresh-token-expiry> # e.g., 365d, 30d, 7d
```

### 📌 Generating a Secure JWT Access Secret

To set up a secure JWT access secret, you'll need a strong 64-byte (512-bit) secret key.

### 📌 Generate a 64-byte Secret in Node.js

Run the following command in your node terminal. Run command `node` to enter the Node.js REPL, then paste the command below to generate a secure random string:

```bash
require('crypto').randomBytes(64).toString('hex')
```

This will output a long hexadecimal string. Example output:

```bash
e9b5f19e27a2a9e6a40d74b2dabc6d6f3a3b99ea8c4d10f5ff1c47c6a83d0b7f...
```

### 📌 Set the Generated Secret in Your .env File

Copy the generated string and set it in your `.env` file:

```plaintext
JWT_ACCESS_SECRET=your_generated_secret_here
```

### 📌 Example .env file (sample)

```plaintext
NODE_ENV=<your-environment> # e.g., development, production
PORT=<your-port-number>
DATABASE_URL=<your-mongodb-uri>

BCRYPT_SALT_ROUNDS=<your-salt-rounds> # e.g., 10, 12, 14

JWT_ACCESS_SECRET=<your-access-secret>
JWT_ACCESS_EXPIRES_IN=<your-access-token-expiry> # e.g., 1d, 2h, 30m

JWT_REFRESH_SECRET=<your-refresh-secret>
JWT_REFRESH_EXPIRES_IN=<your-refresh-token-expiry> # e.g., 365d, 30d, 7d
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Validation or other error info" },
  "stack": "Error stack trace (only in development)"
}
```

### 📌 Common Error Types

- ZOD_ERROR: Schema validation failed

- NOT_FOUND_ERROR: Resource not found

- VALIDATION_ERROR: Input issue

- AUTH_ERROR: Invalid credentials

- AUTHORIZATION_ERROR: No permission

- INTERNAL_SERVER_ERROR: General backend failure

---

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

---

## Contribution

Feel free to fork the project and submit PRs. For major changes, please open an issue first to discuss.

---

## About Me

Hi, I am Nadim Mahmud Nion. I have recently concluded my graduation from the department of Computer Science and Engineering (CSE) at the Daffodil International University (DIU). I have been learning MERN Stack Web Development since 2022. I am expertise in the following skills:

- React
- Express.js
- TypeScript
- Mongoose
- Postman
- MongoDB Compass
- NoSQLBooster
- Node.js
- MongoDB Atlas
- JWT
- Stripe
- Vite
- React Router
- Firebase (Authentication & Hosting)
- Vercel
- JavaScript
- Advanced JavaScript
- Daisy UI
- Bootstrap
- Tailwind
- HTML5
- CSS3
- Media Query

I have built multiple projects using these skills. You are invited to my GitHub profile to know about my projects and don't forget to give a star to my projects.

> Developed by [Nadim Mahmud Nion](https://github.com/Nadim-Nion) 💻
