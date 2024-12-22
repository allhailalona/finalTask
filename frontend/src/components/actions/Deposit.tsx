// Import required components and hooks
import { Button, Form, Input, message } from 'antd'

export default function Deposit() {
    const [form] = Form.useForm()

    async function onFinish() {
        try {
            const values = form.getFieldsValue()
            const res = await fetch(`http://localhost:3000/deposit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(values)
            })
            if (!res.ok) throw new Error('Unknown error occured')
            message.success('Deposit Successful!')
            form.resetFields()
        } catch (err) {
            console.error('error in onFinish Deposit.tsx', err)
            message.error('Error With Deposit...')
        }
    }


    return (
        <Form
            form={form}
            onFinish={onFinish}
            className='h-[90%] w-full border-red-400 border-4 p-24 flex justify-center items-center flex-col'
        >
            <Form.Item
                label={<span className='text-2xl font-bold mt-2'>Account No.</span>}
                name="accountNo"
            >
                <Input 
                   placeholder="Account No"
                   className='text-2xl font-bold h-[48px]' 
               />
            </Form.Item>

            <Form.Item
                label={<span className='text-2xl font-bold mt-2'>Deposit Sum</span>}
                name="sum"
            >
                <Input 
                   placeholder="Deposit Sum"
                   className='text-2xl font-bold h-[48px]' 
               />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='text-2xl font-bold h-12'>
                    Deposit
                </Button>
            </Form.Item>
        </Form>
    )
}