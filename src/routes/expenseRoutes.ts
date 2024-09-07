import { Router } from 'express';
import { createExpense, getExpenses, deleteExpense } from '../controllers/expenseController';
import { validateBody } from '../middleware/validateBody';
import { expenseValidationSchema } from '../schema/expenseSchema';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/', authenticate, getExpenses);
router.post('/', authenticate, validateBody(expenseValidationSchema), createExpense);
// router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);

export default router;
