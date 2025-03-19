import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);

router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
