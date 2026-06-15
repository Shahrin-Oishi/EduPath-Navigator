# EduPath Navigator - AI-Powered Learning Roadmap Platform

## Academic Information
- **University:** Northern University of Business and Technology Khulna (NUBTK)
- **Course Title:** Software Project / System Design Lab
- **Section:** 8C
- **Team Number:** CSE4204-8c-to9

## Project Overview
EduPath Navigator is an AI-powered web application designed to help students and beginners follow a structured, adaptive, and step-by-step learning journey based on their career goals.

## Team Name
1. Amalan Sarkar (Leader) - ID: CSE11220320909
2. Shahrin Oishi - ID: CSE11220320970
3. Farhana Faruq Prity - ID: CSE11220320929
4. William Sardar - ID: CSE11220321049

## Repository Structure
- `frontend/` - Frontend single-page application (React.js)
- `backend/` - REST API environment (Node.js & Express.js)
- `database/` - Document-oriented data storage logs (MongoDB)
- `documentation/` - Official System Design & Architecture reports
- `diagrams/` - Structural diagrams (Architecture, ERD, Use Case, Activity Workflow)|

# EduPath Navigator

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
| AI | OpenAI GPT-3.5 / Google Gemini (with demo fallback) |
| UI Icons | Lucide React |

## Project Structure

```
edupath-navigator/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth & Progress context
│       ├── data/           # Static career path data
│       ├── layouts/        # Dashboard layout
│       ├── pages/          # All page components
│       ├── services/       # API service layer
│       └── utils/          # Helper functions
│
├── server/                 # Express backend
│   ├── config/             # Database config
│   ├── controllers/        # Route logic
│   ├── data/               # Static roadmap seed data
│   ├── middleware/         # JWT auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── services/           # AI service (OpenAI/Gemini)
│
└── .env.example            # Environment variables template
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- (Optional) OpenAI or Gemini API key

### 1. Clone and install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure environment

```bash
# Copy example env to server
cp .env.example server/.env
# Edit server/.env with your MongoDB URI and API keys
```

### 3. Start development servers

**Backend** (Terminal 1):
```bash
cd server
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Roadmaps
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roadmaps` | All roadmaps |
| GET | `/api/roadmaps/:id` | Single roadmap |

### Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | User's progress |
| POST | `/api/progress/update` | Update skill completion |
| DELETE | `/api/progress/reset` | Reset progress |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate-roadmap` | Generate custom roadmap |
| POST | `/api/ai/skill-analyze` | Analyze skills |
| POST | `/api/ai/chat` | AI chat message |
| GET | `/api/ai/chat/history` | Chat history |
| DELETE | `/api/ai/chat/history` | Clear history |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get profile + stats |
| PUT | `/api/user/profile` | Update profile |

## AI Configuration

The app works in three modes:

1. **OpenAI** — Set `OPENAI_API_KEY` in server `.env` (uses GPT-3.5-turbo)
2. **Gemini** — Set `GEMINI_API_KEY` in server `.env` (uses Gemini Pro)
3. **Demo mode** — No API key needed — pre-written responses (fully functional)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Marketing homepage |
| Sign Up | `/signup` | Create account |
| Login | `/login` | Sign in |
| Dashboard | `/dashboard` | Main overview |
| Career Paths | `/career-paths` | Browse all paths |
| Roadmap | `/roadmap/:id` | Path detail + tree |
| AI Generator | `/ai/generate` | Custom AI roadmap |
| AI Analyzer | `/ai/analyze` | Skill gap analysis |
| AI Chat | `/ai/chat` | Chat with EduBot |
| Profile | `/profile` | User profile + stats |

