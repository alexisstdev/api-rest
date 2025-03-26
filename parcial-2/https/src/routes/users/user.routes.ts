import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, authorize } from '@src/middleware/auth.middleware';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);

router.post('/', authenticate, authorize('admin'), userController.create);
router.put('/:id', authenticate, userController.update);
router.delete('/:id', authenticate, authorize('admin'), userController.remove);

export default router;
