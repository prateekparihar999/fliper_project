import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';


// Load environment variables
dotenv.config();

import authRoutes       from './routes/auth.routes.js';
import projectRoutes    from './routes/project.routes.js';
import clientRoutes     from './routes/client.routes.js';
import contactRoutes    from './routes/contact.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';

const app = express();

// CORS with env-based origin
const rawFrontendUrl = process.env.FRONTEND_URL || '';
const FRONTEND_URL = rawFrontendUrl.replace(/\/+$/, ''); // remove trailing slash(es)

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));



app.use(session({
  secret: process.env.SESSION_SECRET || 'SecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',        authRoutes);
app.use('/api/projects',    projectRoutes);
app.use('/api/clients',     clientRoutes);
app.use('/api/contacts',    contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/', (_req, res) => res.send('✅ Flipr MERN backend is up!'));

export default app;
