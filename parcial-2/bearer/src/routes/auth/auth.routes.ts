import { Router } from 'express';
import { getProfile, login, register } from '@src/controllers/auth.controller';
import { authenticate } from '@src/middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected route
router.get('/profile', authenticate, getProfile);

export default router;
