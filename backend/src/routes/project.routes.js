import express from 'express';
import multer from 'multer';
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';

const router = express.Router();

// IMPORTANT: memory storage
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB (optional)
});

router.get('/', getAllProjects);

// 🔴 THIS LINE IS THE MOST IMPORTANT
router.post('/', upload.single('image'), addProject);

router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

export default router;
