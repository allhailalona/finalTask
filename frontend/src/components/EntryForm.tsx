import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'

export default function EntryForm() {
   const [form] = Form.useForm();
   const navigate = useNavigate()

    async function onFinish() {
        try {
            const values = form.getFieldsValue()
            const params = new URLSearchParams(values)
            const res = await fetch(`http://localhost:3000/validate-entry?${params}`, {method: 'GET'})
            if (!res.ok) throw new Error('Unknown error occured') // Intentionally vague error handling
            const data = await res.json()
            if (data) {
                message.success('Account validated, redirecting...')
                navigate('/actions')
            } else {
                message.error('Account is not validated, please use a valid name!')
            }
            form.resetFields()
        } catch (err) {
            console.error('error in onFinish EntryForm.tsx', err)
        }
    }

   return (
       <Form 
           form={form} 
           onFinish={onFinish}
           className='h-full w-full flex justify-center items-center flex-col'
       >
           <Form.Item 
               name="accountNo"
               label={<span className='text-2xl font-bold mt-2'>Account No.</span>}
           >
                <Input 
                   placeholder="Enter Account No."
                   className='text-2xl font-bold h-[48px]' 
               />
           </Form.Item>

           <Button type="primary" htmlType="submit" className='flex justify-end text-2xl font-bold h-12'>
               Submit
           </Button>
       </Form>
   );
}