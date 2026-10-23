# EduPath Navigator

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

An AI-powered learning roadmap platform that helps you navigate your tech career with structured paths, skill tracking, and intelligent guidance.

## Features

- **8+ Career Roadmaps** — Web Dev, ML, Data Science, Cybersecurity, DevOps, UI/UX, Mobile, Software Engineering
- **AI Roadmap Generator** — Describe your goal, get a custom step-by-step learning path
- **AI Skill Analyzer** — Enter your skills, get career match analysis and gap report
- **AI Chat Assistant** — 24/7 AI mentor for learning questions and career guidance
- **Progress Tracking** — Mark skills complete, visualize progress with a beautiful tree UI
- **Beautiful Dashboard** — Stats, active roadmaps, quick actions, and progress overview
- **JWT Authentication** — Secure signup/login with bcrypt password hashing

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express.js, REST API |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| AI | Groq with OpenAI fallback; clear errors when providers are unavailable |
| UI Icons | Lucide React |

## Repository Structure

```
edupath-navigator/
├── frontend/          # React frontend
├── backend/           # Express backend (API, routes, controllers)
├── database/          # MongoDB layer (Mongoose models, connection, seed data)
├── documentation/      # Detailed docs
└── README.md
```

See [documentation/PROJECT_STRUCTURE.md](documentation/PROJECT_STRUCTURE.md) for the full folder breakdown.

## Quick Start

### Clone and prepare

Clone this repository and install Node.js 22.12+ plus MongoDB Community Server (or use MongoDB Atlas). Local database files and credentials are not included.

On Windows PowerShell:

    git clone https://github.com/Shahrin-Oishi/EduPath-Navigator.git
    cd EduPath-Navigator
    npm.cmd run install:all
    Copy-Item .env.example backend/.env

Edit backend/.env: set MONGO_URI, a private JWT_SECRET, and a working Groq or OpenAI key for AI tools. Start your local MongoDB service before launching, or configure an Atlas connection.

    npm.cmd run dev

Open http://localhost:5173. The launcher can reuse an already running EduPath backend. It can start a portable MongoDB executable from .local/ if you have separately installed one there.

The backend and frontend can also be started in separate terminals as shown below.

### Prerequisites
- Node.js 22.12+ (this computer uses Node.js 24)
- MongoDB (local or Atlas)
- A working Groq or OpenAI API key for AI tools, plus internet access

### 1. Clone and install

```bash
# Install backend dependencies
cd backend
npm install

# Install database dependencies (Mongoose models used by the backend)
cd ../database
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure environment

```bash
# Copy example env to backend
cp .env.example backend/.env
# Edit backend/.env with your MongoDB URI and API keys
```

### 3. Start development servers

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Documentation

- [Project Structure](documentation/PROJECT_STRUCTURE.md)
- [API Endpoints](documentation/API_ENDPOINTS.md)
- [AI Configuration](documentation/AI_CONFIGURATION.md)
- [Pages](documentation/PAGES.md)

## Live deployment

[Deploy to Render](https://render.com/deploy?repo=https://github.com/Shahrin-Oishi/EduPath-Navigator)

The included render.yaml configures a single free Node web service serving React and the API. Supply a working MongoDB Atlas URI and Groq key through Render environment settings. Render generates the private JWT secret. Local database files and accounts are not included.

See [deployment instructions](documentation/DEPLOYMENT.md) for Atlas network access, build/start commands and verification.
