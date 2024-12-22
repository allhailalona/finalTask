import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { validateEntry, deposit, withdraw, loan } from './mongoUtils/DBOps'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

app.get('/validate-entry', async (req: Request, res: Response) => {
    try {
        const accountNo = req.query.accountNo
        const isEntryValidated = await validateEntry(accountNo)
        if (!isEntryValidated) {
            throw new Error('Internal error occured')
        }
        res.status(200).json(isEntryValidated)
    } catch (err) {
        console.error('error in /validate-entry route', err)
        res.status(500).json('Unknown error occured') 
    }
})

// Greetings! 
// Since the instructions do not clearly state the use of zod validation, I'll rely for now on the Schema validation to throw error in case of an incorrect type
// If I'll have time left, I'll add front and back validation!
app.post('/deposit', async (req: Request, res: Response) => {
    try {
        const { accountNo, sum } = req.body
        await deposit(accountNo, sum) // An error will be thrown from this func, and the other op functions if no account is found
        res.sendStatus(200)
    } catch (err) {
        console.error('error in /deposit route', err)
        res.status(500).json('Internal Server Error')
    }
})

app.post('/withdraw', async (req: Request, res: Response) => {
    try {
        const { accountNo, sum } = req.body
        await withdraw(accountNo, sum)
        res.sendStatus(200)
    } catch (err) {
        console.error('error in /withdraw route', err)
        res.status(500).json('Internal server error')
    }
})

app.post('/loan', async (req: Request, res: Response) => {
    try {
        const { accountNo, sum, interest, noOfPayments } = req.body
        await loan(accountNo, sum, interest, noOfPayments)
        res.sendStatus(200)
    } catch (err) {
        console.error('error in /loan route', err)
        res.status(500).json('Internal server error')
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('listening on port ', 3000)
})