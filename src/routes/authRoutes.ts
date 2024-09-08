import express from 'express';
import { signup, login, whoAmI } from '../controllers/authController';
import { validateBody } from '../middleware/validateBody';
import { authSchema } from '../schema/authSchema';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signUp', validateBody(authSchema), signup);
router.post('/login', validateBody(authSchema), login);
router.get('/whoAmI', authenticate, whoAmI);

export default router;
