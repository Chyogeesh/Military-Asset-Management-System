// Directory Structure
- military-asset-management/
  - backend/
    - controllers/
    - models/
    - routes/
    - middleware/
    - logs/
    - config/
    - app.js
    - server.js
    - database.sql
    - Dockerfile
  - frontend/
    - public/
    - src/
      - components/
      - pages/
      - services/
      - App.js
      - index.js
    - package.json
    - Dockerfile
  - README.md
  - docker-compose.yml

// === Sample Backend Files ===

// backend/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const authMiddleware = require('./middleware/auth');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', authMiddleware, routes);

module.exports = app;

// backend/server.js
const app = require('./app');
const PORT = process.env.PORT || 5000;
const sequelize = require('./config/db');

(async () => {
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

// backend/config/db.js
const { Sequelize } = require('sequelize');
module.exports = new Sequelize('military_db', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// backend/routes/index.js
const router = require('express').Router();
router.use('/dashboard', require('./dashboard'));
router.use('/purchases', require('./purchases'));
router.use('/transfers', require('./transfers'));
router.use('/assignments', require('./assignments'));
module.exports = router;

// backend/Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "server.js"]

// frontend/Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

// === docker-compose.yml ===
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DB_HOST=postgres
      - DB_USER=user
      - DB_PASS=password
      - DB_NAME=military_db
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: military_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

// === Sample Frontend Entry Point ===

// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Assignments from './pages/Assignments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App;

// === Sample SQL Dump (backend/database.sql) ===
-- PostgreSQL dump
CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name TEXT,
  location TEXT
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  type TEXT,
  model TEXT,
  serial_number TEXT,
  base_id INT REFERENCES bases(id),
  status TEXT
);

CREATE TABLE asset_movements (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id),
  from_base_id INT,
  to_base_id INT,
  type TEXT,
  quantity INT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  role TEXT,
  base_id INT REFERENCES bases(id),
  password TEXT
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id),
  assigned_to INT REFERENCES users(id),
  date_assigned DATE,
  is_expended BOOLEAN
);

CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  action_type TEXT,
  user_id INT REFERENCES users(id),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  details JSON
);

-- Add seed data here as needed

// === README.md ===
# Military Asset Management System

## Overview
Web-based system for managing military assets (vehicles, weapons, ammo) across bases. Includes dashboards, transfers, assignments, and RBAC.

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT + RBAC
- Dockerized: Yes

## Setup
```bash
git clone <repo>
cd military-asset-management
docker-compose up --build
```
App will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Default Roles
- Admin
- Base Commander
- Logistics Officer

## Folder Structure
- `backend/`: Express server, routes, models, auth
- `frontend/`: React frontend with pages and services
- `database.sql`: Schema and sample data

## API Endpoints
- `/api/dashboard`
- `/api/purchases`
- `/api/transfers`
- `/api/assignments`

## Future Improvements
- Graphical trends on dashboard
- OTP login for security
- PDF export for transfer logs
- Role audit trails

## Maintainer
- [Your Name]
