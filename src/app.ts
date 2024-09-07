import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import expenseRoutes from './routes/expenseRoutes';
import authRoutes from './routes/authRoutes';
import typeRoutes from './routes/typeRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL!, {
    dbName: 'expense-db',
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/types', typeRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

export default app;
