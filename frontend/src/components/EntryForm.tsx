import { Button, Form, Input } from 'antd';

export default function EntryForm() {
   const [form] = Form.useForm();

    async function onFinish() {
        try {
            const values = form.getFieldsValue()
            const params = new URLSearchParams(values)
            const res = await fetch(`http://localhost:3000/validate-entry${params}`, {method: 'GET'})
            if (!res.ok) throw new Error('Unknown error occured') // Intentionally vague error handling
            form.resetFields()
        } catch (err) {
            console.error('error in onFinsih EntryForm.tsx', err)
        }
    }

   return (
       <Form 
           form={form} 
           onFinish={onFinish}
           className='h-full w-full flex justify-center items-center flex-col'
       >
           <Form.Item 
               name="accountName"
               label={<span className='text-2xl font-bold'>Account Name</span>}
           >
                <Input 
                   placeholder="Enter account name"
                   className='text-2xl font-bold h-[48px]' 
               />
           </Form.Item>

           <Button type="primary" htmlType="submit" className='flex justify-end text-2xl font-bold h-12'>
               Submit
           </Button>
       </Form>
   );
}