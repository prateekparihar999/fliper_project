import express from 'express';
import {
  register,
  login,
  logout,
  checkAuth,
  getAllUsers,
  deleteUser,
  updateUser
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);   // ✅ NO requireAuth
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', checkAuth);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;
