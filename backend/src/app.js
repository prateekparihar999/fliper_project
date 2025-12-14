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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

/* ===== CORS (SINGLE SOURCE OF TRUTH) ===== */
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

/* ===== TRUST PROXY FOR RENDER ===== */
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

/* ===== SESSION CONFIG ===== */
app.use(session({
  name: 'flipr.sid',
  secret: process.env.SESSION_SECRET || 'SecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

/* ===== ROUTES ===== */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/', (_req, res) => {
  res.send('✅ Flipr MERN backend is running');
});

/* ===== ERROR HANDLER ===== */
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

export default app;
