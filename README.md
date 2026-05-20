# Team Task Manager - MERN Full Stack App

A placement-ready MERN web app where users can create projects, add team members, assign tasks, track progress, and use role-based access control.

## Features

- Signup/Login with JWT authentication
- Admin and Member roles
- Project creation and team member management
- Task creation, assignment, priority, due date and status tracking
- Dashboard with project count, task count, todo, in-progress, completed and overdue stats
- MongoDB relationships using Mongoose refs
- Backend validations with express-validator
- Protected REST APIs
- Railway deployment-ready setup
- Responsive React frontend

## Tech Stack

Frontend: React, Vite, Axios, React Router, Lucide Icons  
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs  
Deployment: Railway

## Folder Structure

```txt
team-task-manager-mern/
├── client/
│   ├── src/
│   │   ├── api/api.js
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
├── package.json
├── railway.json
└── README.md
```

## Local Setup in VS Code

### 1. Extract ZIP
Open the extracted folder in VS Code. Make sure you are inside the root folder where this file exists:

```bash
package.json
client
server
```

### 2. Install dependencies

```bash
npm install
npm run install-all
```

### 3. Create backend env file
Create `server/.env` and paste:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/team_task_manager
JWT_SECRET=my_super_secret_key_123
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 4. Create frontend env file
Create `client/.env` and paste:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Add demo data

```bash
npm run seed
```

Demo accounts:

```txt
Admin: admin@example.com / 123456
Member: member@example.com / 123456
```

### 6. Run full app

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api/health`

## Role-Based Access

### Admin
- Can create projects
- Can create tasks
- Can assign tasks to project members
- Can update/delete tasks
- Can see dashboard stats

### Member
- Can login and view assigned/team tasks
- Can update task status
- Can see dashboard and project/task info

## REST API Overview

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users
- `GET /api/users`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Dashboard
- `GET /api/dashboard`

## Railway Deployment

### 1. Push project to GitHub

```bash
git init
git add .
git commit -m "Initial MERN Team Task Manager"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Create Railway project
- Go to Railway
- New Project
- Deploy from GitHub repo
- Select this repository

### 3. Add environment variables in Railway

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret_key
NODE_ENV=production
CLIENT_URL=https://your-railway-app-url.up.railway.app
```

Railway will use `railway.json` automatically.

### 4. Seed production database
You can run this locally using the Atlas URI in `server/.env`:

```bash
npm run seed
```

## Demo Video Script

1. Start with signup/login screen.
2. Login as Admin.
3. Show dashboard stats: projects, tasks, completed and overdue.
4. Create a project and select team members.
5. Create a task, assign it to a member, set due date and priority.
6. Change task status from Todo to In Progress/Completed.
7. Login as Member and show that member can view/update assigned tasks.
8. End by showing GitHub repo, Railway live URL and README.

## Troubleshooting

If `npm install` says package.json missing, you are not inside the correct extracted root folder.
Run:

```bash
dir
```

You should see:

```txt
client
server
package.json
README.md
```
