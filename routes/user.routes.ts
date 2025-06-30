import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getMe } from '../controllers/user.controller';

const router = express.Router();

router.get('/me', authenticate, getMe);

export default router;
