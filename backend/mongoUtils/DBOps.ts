import mongoose from 'mongoose'
import { BankAccountModel } from './models'
import dotenv from 'dotenv'
import path from 'path'
import { CONNREFUSED } from 'dns'

dotenv.config({ path: path.join(__dirname, '../.env') })

export async function validateEntry(accountNo: string): Promise<boolean> {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)

        const exists = await BankAccountModel.exists({ accountNo })
        return exists !== null // That's the conditional... 
        
    } catch (err) {
        console.error('error in validateEntry', err)
        throw err
    } finally {
        await mongoose.disconnect()
    }
}

export async function deposit(accountNo: string, sum: number) {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        
        const result = await BankAccountModel.findOneAndUpdate(
            { accountNo },
            {
              actionType: 'deposit',
              deposit: {
                sum,
                date: new Date()
              }
            },
            { new: true }
        )
 
        if (!result) {
            throw new Error('Account not found') // Express WILL send a vague error to the front
        }
 
        console.log('entry was added')
        return result
 
    } catch (err) {
        console.error('error in deposit func in DBOps.ts', err)
        throw err
    } finally {
        await mongoose.disconnect()
    }
}

export async function withdraw(accountNo: string, sum: number) {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        
        const result = await BankAccountModel.findOneAndUpdate(
            { accountNo },
            {
              actionType: 'withdraw',
              withdraw: {
                sum,
                date: new Date()
              }
            },
            { new: true }
        )
 
        if (!result) {
            throw new Error('Account not found') // Express WILL send a vague error to the front
        }
 
        console.log('entry was added')
        return result
 
    } catch (err) {
        console.error('error in deposit func in DBOps.ts', err)
        throw err
    } finally {
        await mongoose.disconnect()
    }
}