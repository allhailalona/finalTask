import mongoose from 'mongoose'
import { BankAccountModel } from './models'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

export async function validateEntry(accountNo: string): Promise<boolean> {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)

        const exists = await BankAccountModel.exists({ accountNo })
        return exists !== null // That's the conditional... 
        
    } catch (err) {
        console.error('error in validateEntry', err)
        throw err
    }
}