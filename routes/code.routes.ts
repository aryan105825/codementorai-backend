import { Router } from 'express';
import { executeCode } from '../controllers/code.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/execute', authenticate, executeCode);

export default router;
