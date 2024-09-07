import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
  type: string;
  user: string;
}

const expenseSchema: Schema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: Types.ObjectId, ref: 'Type', required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
});

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
