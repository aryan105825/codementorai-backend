import express from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', (req, res) => void register(req, res)); 
router.post('/login', (req, res) => void login(req, res));       

export default router;
