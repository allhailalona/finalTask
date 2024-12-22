// populateDB.ts
import mongoose from 'mongoose'
import { BankAccountModel } from './models'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

async function populateDB() {
   try {
       await mongoose.connect(process.env.MONGODB_URI as string)

       // Check if DB already has documents
       const count = await BankAccountModel.countDocuments()
       if (count > 0) {
           console.log('Database not empty, cleaning...')
           await BankAccountModel.deleteMany({})
       }

       // Generate 5 sample accounts
       const sampleAccounts = [
           { accountNo: "ACC001", actionType: "deposit" },
           { accountNo: "ACC002", actionType: "deposit" },
           { accountNo: "ACC003", actionType: "deposit" },
           { accountNo: "ACC004", actionType: "deposit" }, 
           { accountNo: "ACC005", actionType: "deposit" }
       ]

       await BankAccountModel.insertMany(sampleAccounts)
       console.log('Database populated with fresh sample accounts')

   } catch (err) {
       console.error('Error populating database:', err)
   } finally {
       await mongoose.disconnect()
   }
}

populateDB()