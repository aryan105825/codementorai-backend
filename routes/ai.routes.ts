import express from 'express';
import { aiAssistHandler } from '../controllers/ai.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/assist', authenticate, aiAssistHandler);

export default router;

