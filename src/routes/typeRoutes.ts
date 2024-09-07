import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getTypes } from '../controllers/typeController';

const router = express.Router();

router.get('/', authenticate, getTypes);

export default router;
