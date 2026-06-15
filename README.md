# EduPath Navigator

### AI-Powered Learning Roadmap Platform

EduPath Navigator is an AI-powered web application that helps students, beginners, and self-learners follow structured, adaptive, and goal-based learning roadmaps for technology careers.

It provides predefined career paths, AI-generated personalized roadmaps, skill gap analysis, progress tracking, and an AI chat assistant to guide users throughout their learning journey.

---

## Project Information

| Field        | Details                                               |
| ------------ | ----------------------------------------------------- |
| University   | Northern University of Business and Technology Khulna |
| Course Title | Software Project / System Design Lab                  |
| Section      | 8C                                                    |
| Team Number  | CSE4204-8c-to9                                        |
| Project Name | EduPath Navigator                                     |

---

## Team Members

| SL | Name                | Role        | Student ID     |
| -- | ------------------- | ----------- | -------------- |
| 1  | Amalan Sarkar       | Team Leader | CSE11220320909 |
| 2  | Shahrin Oishi       | Member      | CSE11220320970 |
| 3  | Farhana Faruq Prity | Member      | CSE11220320929 |
| 4  | William Sardar      | Member      | CSE11220321049 |

---

## Overview

Many beginners struggle to start learning because they do not know which skills to learn first, how to organize their learning journey, or how to measure their progress.

EduPath Navigator solves this problem by providing a guided learning platform where users can select a career goal, follow a step-by-step roadmap, track completed skills, and receive AI-powered guidance based on their current knowledge and future goals.

The platform is designed especially for students, beginners, and career changers who want a clear and organized path toward a technology-based career.

---

## Key Features

### Career Roadmaps

Users can explore structured roadmaps for different technology careers, including:

* Web Development
* Machine Learning
* Data Science
* Cybersecurity
* DevOps
* UI/UX Design
* Mobile App Development
* Software Engineering

### AI Roadmap Generator

Users can describe their career goal, and the system generates a personalized step-by-step learning roadmap.

### AI Skill Analyzer

Users can enter their existing skills, and the system analyzes:

* Current skill level
* Suitable career paths
* Missing skills
* Recommended learning steps

### AI Chat Assistant

The platform includes an AI mentor that can answer learning-related questions, provide career guidance, and support users during their learning journey.

### Progress Tracking

Users can mark skills as completed and track their progress visually through an interactive roadmap interface.

### User Dashboard

The dashboard provides a complete overview of:

* Active roadmaps
* Completed skills
* Learning progress
* Quick actions
* User statistics

### Authentication System

Secure authentication is implemented using JWT and bcrypt password hashing.

---

## Technology Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | React 18, Vite, Tailwind CSS   |
| Routing        | React Router v6                |
| Backend        | Node.js, Express.js            |
| Database       | MongoDB, Mongoose              |
| Authentication | JWT, bcryptjs                  |
| AI Integration | OpenAI GPT-3.5 / Google Gemini |
| Icons          | Lucide React                   |
| API Type       | Groq API                       |

---

## Project Structure

```bash
edupath-navigator/
│
├── client/                         # Frontend application
│   └── src/
│       ├── components/             # Reusable UI components
│       ├── context/                # Authentication and progress context
│       ├── data/                   # Static roadmap data
│       ├── layouts/                # Layout components
│       ├── pages/                  # Application pages
│       ├── services/               # API service layer
│       └── utils/                  # Utility functions
│
├── server/                         # Backend application
│   ├── config/                     # Database configuration
│   ├── controllers/                # Controller logic
│   ├── data/                       # Roadmap seed data
│   ├── middleware/                 # Authentication middleware
│   ├── models/                     # Mongoose models
│   ├── routes/                     # API routes
│   └── services/                   # AI service integration
│
├── database/                       # Database documentation and logs
├── documentation/                  # System design and architecture reports
├── diagrams/                       # Architecture, ERD, use case and workflow diagrams
├── .env.example                    # Environment variables example file
└── README.md                       # Project documentation
```

---

## Application Pages

| Page                 | Route           | Description                               |
| -------------------- | --------------- | ----------------------------------------- |
| Landing Page         | `/`             | Public homepage of the platform           |
| Sign Up              | `/signup`       | User registration page                    |
| Login                | `/login`        | User login page                           |
| Dashboard            | `/dashboard`    | Main user dashboard                       |
| Career Paths         | `/career-paths` | Browse available career roadmaps          |
| Roadmap Details      | `/roadmap/:id`  | View detailed roadmap and skill tree      |
| AI Roadmap Generator | `/ai/generate`  | Generate custom roadmap using AI          |
| AI Skill Analyzer    | `/ai/analyze`   | Analyze skills and identify learning gaps |
| AI Chat              | `/ai/chat`      | Chat with the AI assistant                |
| Profile              | `/profile`      | View and update user profile              |

---

## Getting Started

Follow the instructions below to run the project locally.

---

## Prerequisites

Make sure the following tools are installed on your system:

* Node.js 18 or above
* npm
* MongoDB local server or MongoDB Atlas account
* OpenAI API key or Gemini API key, optional

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd edupath-navigator
```

---

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

You can copy the example file:

```bash
cp .env.example server/.env
```

Then configure the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

> Note: AI API keys are optional. If no API key is provided, the system can run in demo mode using predefined AI responses.

---

## Running the Project

### Start the Backend Server

```bash
cd server
npm run dev
```

Backend server will run at:

```bash
http://localhost:5000
```

---

### Start the Frontend Server

Open another terminal and run:

```bash
cd client
npm run dev
```

Frontend application will run at:

```bash
http://localhost:5173
```

---

## API Documentation

### Authentication Routes

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/auth/signup` | Register a new user            |
| POST   | `/api/auth/login`  | Login an existing user         |
| GET    | `/api/auth/me`     | Get current authenticated user |

---

### Roadmap Routes

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/roadmaps`     | Get all roadmaps           |
| GET    | `/api/roadmaps/:id` | Get a single roadmap by ID |

---

### Progress Routes

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/progress`        | Get user progress              |
| POST   | `/api/progress/update` | Update skill completion status |
| DELETE | `/api/progress/reset`  | Reset user progress            |

---

### AI Routes

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| POST   | `/api/ai/generate-roadmap` | Generate a custom AI roadmap |
| POST   | `/api/ai/skill-analyze`    | Analyze user skills          |
| POST   | `/api/ai/chat`             | Send message to AI assistant |
| GET    | `/api/ai/chat/history`     | Get chat history             |
| DELETE | `/api/ai/chat/history`     | Clear chat history           |

---

### User Routes

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/user/profile` | Get user profile and statistics |
| PUT    | `/api/user/profile` | Update user profile             |

---

## AI Configuration

EduPath Navigator supports three AI modes.

### OpenAI Mode

Add your OpenAI API key to the server `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

### Gemini Mode

Add your Gemini API key to the server `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Demo Mode

If no AI API key is provided, the application will use predefined demo responses. This allows the project to remain functional without paid API access.

---

## System Architecture

EduPath Navigator follows a client-server architecture.

The React frontend communicates with the Express backend through REST API endpoints. The backend handles authentication, roadmap data, progress tracking, AI service requests, and database operations. MongoDB is used to store user information, roadmap data, progress records, and chat history.

```bash
User
  │
  ▼
React Frontend
  │
  ▼
Express.js REST API
  │
  ├── MongoDB Database
  │
  └── AI Service
        ├── OpenAI
        └── Google Gemini
```

---

## Main Modules

### User Module

Handles user registration, login, authentication, and profile management.

### Roadmap Module

Manages predefined career roadmaps and roadmap details.

### Progress Module

Stores and updates user learning progress.

### AI Module

Handles roadmap generation, skill analysis, and AI chat responses.

### Dashboard Module

Displays user statistics, roadmap progress, and quick navigation options.

---

## Security Features

* Password hashing using bcryptjs
* JWT-based authentication
* Protected private routes
* User-specific progress data
* Environment-based configuration
* Secure API route handling

---

## Future Enhancements

* Admin dashboard for roadmap management
* More career categories
* Certificate generation after roadmap completion
* Course and video recommendation system
* Community discussion forum
* Notification and reminder system
* Personalized study planner
* Mobile application version
* Advanced analytics dashboard

---

## Academic Purpose

This project was developed as part of the Software Project / System Design Lab course. It demonstrates system design, frontend development, backend API development, database integration, authentication, and AI service integration in a real-world web application.

---

## Conclusion

EduPath Navigator provides a smart, structured, and AI-powered solution for career-based learning. By combining predefined roadmaps, personalized AI suggestions, progress tracking, and an interactive dashboard, the platform helps learners follow a clear path toward their career goals.

The project is suitable for academic evaluation, system design demonstration, and future real-world development.
