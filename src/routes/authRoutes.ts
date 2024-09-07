import express from 'express';
import { signup, login, whoAmI } from '../controllers/authController';
import { validateBody } from '../middleware/validateBody';
import { authSchema } from '../schema/authSchema';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/sign-up', validateBody(authSchema), signup);
router.post('/login', validateBody(authSchema), login);
router.get('/who-am-i', authenticate, whoAmI);

export default router;
