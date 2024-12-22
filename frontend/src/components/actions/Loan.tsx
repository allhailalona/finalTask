import { Button, Form, Input, InputNumber, message } from 'antd'

export default function Loan() {
    const [form] = Form.useForm()

    async function onFinish() {
        try {
            const values = form.getFieldsValue()
            const res = await fetch(`http://localhost:3000/loan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(values)
            })
            if (!res.ok) throw new Error('Unknown error occured')
            message.success('loan Successful!')
            form.resetFields()
        } catch (err) {
            console.error('error in onFinish loan.tsx', err)
            message.error('Error With loan...')
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
                rules={[{ required: true, message: 'Account number is required' }]}
            >
                <Input 
                   placeholder="Account No"
                   className='text-2xl font-bold h-[48px]' 
               />
            </Form.Item>

            <Form.Item
                label={<span className='text-2xl font-bold mt-2'>Loan Sum</span>}
                name="sum"
                rules={[
                    { required: true, message: 'Loan sum is required' },
                    { pattern: /^\d+$/, message: 'Please enter numbers only' }
                ]}
            >
                <InputNumber 
                   placeholder="Loan Sum"
                   className='text-2xl font-bold h-[48px] w-[200px]' 
               />
            </Form.Item>

            <Form.Item
                label={<span className='text-2xl font-bold mt-2'>Interest</span>}
                name="interest"
                rules={[
                    { required: true, message: 'Loan sum is required' },
                    { pattern: /^\d+$/, message: 'Please enter numbers only' }
                ]}
            >
                <InputNumber
                   placeholder="Interest"
                   className='text-2xl font-bold h-[48px] w-[200px]' 
               />
            </Form.Item>

            <Form.Item
                label={<span className='text-2xl font-bold mt-2'>No of payments</span>}
                name="noOfPayments"
                rules={[
                    { required: true, message: 'Loan sum is required' },
                    { pattern: /^\d+$/, message: 'Please enter numbers only' }
                ]}
            >
                <InputNumber
                   placeholder="No of payments"
                   className='text-2xl font-bold h-[48px] w-[200px]' 
               />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='text-2xl font-bold h-12'>
                    Loan
                </Button>
            </Form.Item>
        </Form>
    )
}