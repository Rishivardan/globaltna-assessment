# GlobalTNA Assessment - Mini Service Request Board

## Overview
Full-stack app where homeowners post service requests and tradespeople browse, view details, and update job status.

## Tech Stack
- Frontend: Next.js (App Router)
- Backend: Node.js + Express
- Database: MongoDB
- ODM: Mongoose
- Styling: Tailwind CSS

## Project Structure
- backend/ - Express API + MongoDB models
- frontend/ - Next.js UI

## Environment Variables
Backend (backend/.env):
- MONGO_URI=your_mongodb_connection_string
- PORT=5000 (optional)

Frontend (frontend/.env.local):
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

Production (Vercel env var):
- NEXT_PUBLIC_API_BASE_URL=https://globaltna-assessment.onrender.com

## Running Locally
Backend:
1. cd backend
2. npm install
3. npm run dev

Frontend:
1. cd frontend
2. npm install
3. npm run dev

Open http://localhost:3000

## API Endpoints
- GET /api/jobs
- GET /api/jobs/:id
- POST /api/jobs
- PATCH /api/jobs/:id (status only)
- DELETE /api/jobs/:id

## Features
- Create new service requests
- Filter requests by category
- View details, update status, and delete requests

## Deployment
Frontend (Vercel): https://globaltna-assessment-zeta.vercel.app/
Backend (Render): https://globaltna-assessment.onrender.com/

## Postman API Testing
List requests:
![GET /api/jobs](docs/screenshots/Screenshot%202026-05-15%20230046.png)

Create request:
![POST /api/jobs](docs/screenshots/Screenshot%202026-05-15%20230008.png)

## Notes
- CORS allows localhost and the Vercel URL.
- contactEmail is validated on create.

## Limitations
- No authentication or ownership checks yet (anyone can update/delete).
