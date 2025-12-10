// routes/project.routes.js

import express from 'express';
import multer from 'multer';

import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';

import { requireAuth } from '../middleware/auth.middleware.js';

// Store uploaded image in memory → Controller saves to DB
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// PUBLIC ROUTES
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// PROTECTED ROUTES (requireAuth)
router.post('/', requireAuth, upload.single('image'), addProject);
router.put('/:id', requireAuth, upload.single('image'), updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
