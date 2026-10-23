# Live deployment on Render

This repository runs as one Node web service: Express serves the built React
frontend and `/api` from the same HTTPS origin. Production deep links return the
React entry page. Unknown API routes return JSON 404; `/api/health` checks the
MongoDB connection. Development commands still use Vite and the local API.

## Before deployment

1. Resume or create your MongoDB Atlas cluster. Use Connect → Drivers to obtain
   its current connection string. Create a database user with access only to the
   application database; use a unique password and URL-encode special characters
   in the connection string.
2. Allow the Render service's outbound IP ranges in Atlas Network Access. Obtain
   these from the service's Connect/Outbound information. Keep local MongoDB
   private; a live server cannot reach `127.0.0.1` on your computer.
3. Connect the GitHub repository to Render. Select New → Blueprint and choose
   this repository. The included `render.yaml` requests one free Node service.
4. Supply `MONGO_URI` and `GROQ_API_KEY` through Render's private environment
   settings. Render generates `JWT_SECRET`. Never add real credentials to Git.

Free services can sleep when inactive; the first request may take longer.
Confirm the selected plan and any account verification requirements in Render.
Do not add paid resources unless you intend to pay for them.

## Deployment commands

- Build: `npm run build` (installs the three packages and builds React).
- Start: `npm start` (Express serves React and the API).
- Node: 24; `NODE_ENV=production`; `PORT` is supplied by Render.
- JWT secret: private, at least 32 characters.
- `VITE_API_URL` is unnecessary for this single-origin deployment.

## Verify before sharing

Check `/api/health`, the homepage and a refreshed `/login` deep link. Then verify
signup/login, roadmaps, progress persistence, and all three AI tools on the
actual HTTPS URL. An exported local account is not automatically copied to
Atlas. Migrate records deliberately if you need existing local users online.

Official references:
- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/blueprint-spec
- https://render.com/docs/free
