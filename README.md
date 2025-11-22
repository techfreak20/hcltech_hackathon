Wellness Portal - Backend API 🏥

This directory contains the Server-Side Application for the Healthcare Wellness Portal. It is a robust, scalable REST API built with Node.js, Express, and MongoDB Atlas, following industry-standard security and architectural patterns.

🚀 Tech Stack

Runtime: Node.js & Express.js

Database: MongoDB Atlas (Mongoose ODM)

Authentication: JWT (JSON Web Tokens) & Bcrypt

Security: Helmet (Headers), CORS, Input Validation

Testing: Jest & Supertest (Integration Testing)

Deployment: Docker & Google Cloud Run (GCP)

📂 Architecture (Layered Pattern)

We utilized a Controller-Service-Model separation of concerns to ensure modularity and testability.

src/
├── config/           # Database & Env Configuration
├── controllers/      # Request handlers (req/res logic only)
├── middlewares/      # Auth guards & Global Error Handling
├── models/           # Mongoose Schemas (Data Layer)
├── routes/           # API Endpoint Definitions
├── services/         # Business Logic (The "Brain")
├── utils/            # Helpers (Response formatters)
├── app.js            # App wiring
└── server.js         # Entry point


✨ Key Features

1. Security First

Stateless Auth: Fully stateless JWT authentication via Bearer tokens.

Data Encryption: Passwords hashed using bcrypt (Salt rounds: 10).

Protected Routes: authMiddleware ensures only authenticated users can access private health data.

2. Wellness Engine

Data Initialization: Automatically generates a "Starter Health Pack" (Goals, Sleep defaults) when a user registers.

Atomic Updates: Supports granular updates to specific widgets (e.g., updating only steps without touching sleep data).

Custom Goals: Allows users to add, toggle, and delete custom habit checklists.

3. Profile Management

Onboarding Flow: Captures comprehensive biological data (Age, Blood Group, Height) during registration.

Read-Only Safety: Critical medical data is protected from casual edits to prevent errors.

🛠️ Setup & Installation

Navigate to backend:

cd wellness-backend


Install Dependencies:

npm install


Environment Setup:
Create a .env file in the root:

PORT=8080
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/wellness?retryWrites=true
JWT_SECRET=your_secret_key
NODE_ENV=development


Run Server:

npm run dev


🧪 Automated Testing

We implemented a comprehensive Integration Test Suite using Jest.

Run Tests:

npm run test


Strategy: Tests run sequentially (--runInBand) against a live MongoDB Atlas Test Database to ensure real-world reliability without race conditions.

🔌 API Endpoints

Authentication

POST /api/auth/register - Create account with health profile.

POST /api/auth/login - Authenticate and get Token.

User Profile

GET /api/users/profile - Get authenticated user details.

PUT /api/users/profile - Update allowed profile fields.

Wellness Dashboard

GET /api/wellness - Fetch all dashboard data (Steps, Sleep, Goals).

PATCH /api/wellness/metric/:metric - Update specific widget (e.g., /metric/steps).

POST /api/wellness/goals - Add a custom habit.

PATCH /api/wellness/goals/:id - Toggle habit completion.

DELETE /api/wellness/goals/:id - Remove a habit.