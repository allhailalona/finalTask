// schema.ts
import mongoose, { Schema } from 'mongoose';
import { BankAccount } from '../types';

const BankAccountSchema = new Schema<BankAccount>({
  accountNo: { 
    type: String, 
    required: true 
  },
  actionType: { 
    type: String, 
    enum: ['deposit', 'withdrawal', 'loan'],
    required: true 
  },
  deposit: {
    sum: Number,
    date: Date
  },
  withdrawal: {
    sum: Number,
    date: Date
  },
  loan: {
    sum: Number,
    interest: Number,
    numberOfPayments: Number,
    date: Date
  }
});

export const BankAccountModel = mongoose.model<BankAccount>('BankAccount', BankAccountSchema);