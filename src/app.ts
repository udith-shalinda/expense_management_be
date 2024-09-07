import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import expenseRoutes from './routes/expenseRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://udithshalinda2:2RLJEE2HNKABE97G@cluster0.01mvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      dbName: 'expense-db',
    },
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

export default app;
