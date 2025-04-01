import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, authorize } from '@src/middleware/auth.middleware';

/**
 * Express router for user-related endpoints.
 *
 * @module UserRoutes
 * @description Handles all user-related routes including CRUD operations.
 *              Some routes require authentication and admin privileges.
 */
const router = Router();

/**
 * GET /users
 * Returns all users rendered with the 'users' template.
 * Public route - no authentication required.
 */
router.get('/', userController.get);

/**
 * GET /users/:id
 * Returns a specific user by ID.
 * Public route - no authentication required.
 */
router.get('/:id', userController.getById);

/**
 * POST /users
 * Creates a new user.
 * Protected route - requires authentication and admin role.
 */
router.post('/', authenticate, authorize('admin'), userController.create);

/**
 * PUT /users/:id
 * Updates an existing user.
 * Protected route - requires authentication.
 */
router.put('/:id', authenticate, userController.update);

/**
 * DELETE /users/:id
 * Deletes a user.
 * Protected route - requires authentication and admin role.
 */
router.delete('/:id', authenticate, authorize('admin'), userController.remove);

export default router;
