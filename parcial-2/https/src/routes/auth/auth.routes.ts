import { Router } from 'express';
import { getProfile, login, register } from '@src/routes/auth/auth.controller';
import { authenticate } from '@src/middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/profile', authenticate, getProfile);

export default router;
