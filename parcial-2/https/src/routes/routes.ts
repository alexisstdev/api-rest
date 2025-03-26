import type { Express } from 'express';
import userRoutes from './users/user.routes';
import authRoutes from './auth/auth.routes';

export function setupRoutes(app: Express) {
	app.use('/users', userRoutes);
	app.use('/auth', authRoutes);
}
