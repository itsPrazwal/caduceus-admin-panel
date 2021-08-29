/** @format */

import { FC, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'

import { FunctionWithParam } from '../../../Utils/types'
import { validateEmail } from '../../../Utils/validation'

interface FormEnterEmailProps{
    onFinish: FunctionWithParam<FinishObject>,
    emailSubmitted: boolean
}

interface FinishObject{
  email: string,
}

export const FormEnterEmail:FC<FormEnterEmailProps> = ({ onFinish, emailSubmitted }) => {
  const [error, setError] = useState('')
  const [form] = useForm()

  const submitEmail = ({ email }: {email: string}) => {
    if(validatingEmail(email)){
      onFinish({ email })
    }
  }

  const validatingEmail = (email: string) => {
    let _error = ''
    if(!validateEmail(email)) _error = 'Invalid Email Address.'
    if(!email) _error = 'Email Address is required.'
    setError(_error)
    return !_error
  }

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={submitEmail}
      onChangeCapture={() => setError('')}
      form={form}
    >
      <Form.Item
        label="Email Address"
        name="email"
        validateStatus={error ? 'error' : 'success'}
        help={error ? error : null}
      >
        <Input onBlur={e => validatingEmail(e.target.value || '')} />
      </Form.Item>
      <Form.Item>
        <Button
          loading={emailSubmitted}
          type="primary"
          htmlType="submit"
          disabled={!!error}
        >
            Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
