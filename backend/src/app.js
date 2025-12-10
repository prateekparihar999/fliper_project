// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import authRoutes       from './routes/auth.routes.js';
import projectRoutes    from './routes/project.routes.js';
import clientRoutes     from './routes/client.routes.js';
import contactRoutes    from './routes/contact.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Build frontend origin(s)
const rawFrontendUrl = process.env.FRONTEND_URL || 'https://fliper-project-5.onrender.com';
const FRONTEND_URL = rawFrontendUrl.replace(/\/+$/, ''); // remove trailing slash(es)

const devOrigins = [
  'http://localhost:5173', // Vite default
  'http://127.0.0.1:5173',
  'http://localhost:3000', // CRA default if used
];

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [FRONTEND_URL]
  : [FRONTEND_URL, ...devOrigins];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public so requests to /public/logo.svg work
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// CORS config: allow credentials and exact origins
app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser requests (e.g. curl) which have no origin
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS: Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
}));

// If your app is behind a proxy (Render, Heroku) trust it for secure cookies
if (process.env.TRUST_PROXY === 'true' || process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(session({
  secret: process.env.SESSION_SECRET || 'SecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: (process.env.NODE_ENV === 'production'), // true in prod (requires HTTPS)
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // for cross-site cookies
  },
}));

// API routes (keep '/api' prefix so frontend can call /api/...)
app.use('/api/auth',        authRoutes);
app.use('/api/projects',    projectRoutes);
app.use('/api/clients',     clientRoutes);
app.use('/api/contacts',    contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

// healthcheck & root
app.get('/', (_req, res) => res.send('✅ Flipr MERN backend is up!'));

// basic error handler for CORS errors to help debugging
app.use((err, _req, res, _next) => {
  if (err?.message?.startsWith('CORS')) {
    console.error('CORS error:', err.message);
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app;
