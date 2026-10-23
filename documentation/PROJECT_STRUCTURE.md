# Project Structure

```
edupath-navigator/
├── frontend/                # React frontend (Vite)
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── context/         # Auth & Progress context
│       ├── data/            # Static career path data
│       ├── layouts/         # Dashboard layout
│       ├── pages/           # All page components
│       ├── services/        # API service layer
│       └── utils/           # Helper functions
│
├── backend/                 # Express backend
│   ├── controllers/         # Route logic
│   ├── middleware/          # JWT auth middleware
│   ├── routes/               # API routes
│   ├── services/             # AI service (Groq/OpenAI)
│   └── server.js
│
├── database/                # MongoDB layer (Mongoose)
│   ├── config/               # DB connection (db.js)
│   ├── models/                # Mongoose schemas (User, Progress, Roadmap, Chat)
│   └── data/                  # Static roadmap seed data
│
├── documentation/            # Detailed docs (this folder)
├── screenshots/               # App screenshots
│
└── .env.example              # Environment variables template
```

## Notes

- `backend/` and `database/` are separate npm packages, each with their own `package.json` and `node_modules` — install both (see root `README.md` Quick Start).
- `database/` has no standalone server of its own; it's required directly by `backend/` (e.g. `backend/server.js` calls `../database/config/db`, controllers call `../../database/models/*`).
