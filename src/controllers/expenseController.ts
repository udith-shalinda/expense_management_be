import { Request, Response } from 'express';
import { Expense } from '../models/expenseModel';
import mongoose from 'mongoose';

export const createExpense = async (req: Request, res: Response) => {
  const { description, amount, date, type, user } = req.body;
  const MAX_MONTHLY_LIMIT = 10000;

  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const totalExpensesForMonth = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user.id),
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const currentTotal =
      totalExpensesForMonth.length > 0 ? totalExpensesForMonth[0].totalAmount : 0;

    if (currentTotal + amount > MAX_MONTHLY_LIMIT) {
      return res
        .status(400)
        .json({ message: 'Monthly expense limit exceeded. Cannot add this expense.' });
    }

    const expense = new Expense({ description, amount, date, type, user: user.id });
    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  const { searchQuery, selectedType } = req.query;

  try {
    const filter: any = {};

    if (searchQuery) {
      filter.description = { $regex: searchQuery, $options: 'i' };
    }

    if (selectedType) {
      filter.type = selectedType;
    }

    const expenses = await Expense.find(filter).populate('type');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// TODO add req body validation
// export const updateExpense = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(expense);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
