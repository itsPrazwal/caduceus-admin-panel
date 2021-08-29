import { FC, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'

import { FunctionWithParam } from '../../../Utils/types'
import { validatePassword } from '../../../Utils/validation'

interface FormChangePasswordProps{
    onFinish: FunctionWithParam<FinishObject>,
    passwordSubmitted: boolean
    autoFocus?: boolean
  disableSubmit?: boolean
}

interface FinishObject{
  password: string
}

export const FormChangePassword:FC<FormChangePasswordProps> = ({ autoFocus = true, disableSubmit = false, onFinish, passwordSubmitted }) => {
  const [form] = useForm()
  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
  })

  const passwordValidation = (value: string): boolean => {
    let _error = ''
    if(!validatePassword(value)) _error = 'Invalid Password'
    if(!value) _error = 'Password is required'
    setError(prevState => ({ ...prevState, password: _error }))
    return !_error
  }

  const matchPassword = (value: string): boolean => {
    let _error = ''
    const matched = value === form.getFieldValue('password')
    if(!matched) _error = 'Password didn\'t match.'
    if(!value) _error = 'Confirm Password is required'
    setError(prevState => ({ ...prevState, confirmPassword: _error }))
    return !_error
  }

  const handleFinish = ({ password, confirmPassword }: { password: string, confirmPassword: string }) => {
    if(passwordValidation(password) && matchPassword(confirmPassword)){
      onFinish({ password })
    }
  }

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        label="New Password"
        name="password"
        validateStatus={error?.password ? 'error' : 'success'}
        help={error?.password || null}
      >
        <Input.Password
          onChange={() => setError(prevState => ({ ...prevState, password: '' }))}
          onBlur={e => passwordValidation(e.target.value)}
          autoFocus={autoFocus}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        validateStatus={error?.confirmPassword ? 'error' : 'success'}
        help={error?.confirmPassword || null}
      >
        <Input.Password
          onChange={() => setError(prevState => ({ ...prevState, confirmPassword: '' }))}
          onBlur={e => matchPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={passwordSubmitted}
          type="primary"
          htmlType="submit"
          disabled={!!error?.password || !!error?.confirmPassword || disableSubmit}
        >
            Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}
