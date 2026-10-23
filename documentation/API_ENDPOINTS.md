# API Endpoints

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
