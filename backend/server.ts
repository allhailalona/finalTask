import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { validateEntry } from './mongoUtils/DBOps'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

app.get('/validate-entry', async (req: Request, res: Response) => {
    try {
        const accountNo = req.query.accountNo
        const isEntryValidated = await validateEntry(accountNo)
        res.status(200).json(isEntryValidated)
    } catch (err) {
        console.error('error in /validate-entry route', err)
        res.status(500).json('Unknown error occured') // Again, intentionally vague, the actual details appear above and in the functions themselves
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('listening on port ', 3000)
})