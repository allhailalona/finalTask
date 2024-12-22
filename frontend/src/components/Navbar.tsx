import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className='h-[10%] w-full flex justify-center items-center'>
            <ul className='flex flex-row justify-center py-4 px-4 rounded-lg shadow-lg bg-blue-200 gap-8 min-w-[50%]'>
                <Button type='primary' className='text-3xl font-bold p-6' onClick={() => navigate('/actions/deposit')}>Deposit</Button>
                <Button type='primary' className='text-3xl font-bold p-6' onClick={() => navigate('/actions/withdraw')}>Withdraw</Button>
                <Button type='primary' className='text-3xl font-bold p-6' onClick={() => navigate('/actions/loan')}>Loan</Button>
            </ul>
        </nav>
    )
}