import { Types } from 'mongoose'

export type Deposit = {
    sum: number;
    date: Date;
   }
   
   export type Withdraw = {
    sum: number;
    date: Date;
   }
   
   export type Loan = {
    sum: number;
    interest: number;
    numberOfPayments: number;
    date: Date;
   }
   
   export type BankAccount = {
    _id: Types.ObjectId;
    accountNo: string;
    actionType: 'deposit' | 'withdraw' | 'loan';
    deposit?: Deposit;
    withdraw?: Withdraw;
    loan?: Loan;
   }