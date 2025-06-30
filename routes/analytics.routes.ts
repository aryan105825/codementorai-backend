import { Router } from 'express';
import { getAnalyticsHandler  } from '../controllers/analytics.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getAnalyticsHandler);
export default router;
