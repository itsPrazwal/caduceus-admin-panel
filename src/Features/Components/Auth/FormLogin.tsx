/** @format */

import { Button, Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'

import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { FunctionWithParam, LoginFieldType } from '../../../Utils/types'

interface FormLoginProps{
    onFinish: FunctionWithParam<LoginFieldType>,
    isLogging: boolean,
}

export const FormLogin:FC<FormLoginProps> = ({ onFinish, isLogging }) => {
  const [hasError, setHasError] = useState(false)
  const [form] = useForm()

  const onFinishFailed = (err:ValidateErrorEntity) => {
    setHasError(err.errorFields.length > 0)
  }

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChangeCapture={() => setHasError(false)}
      form={form}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        className="animate__animated animate__fadeIn"
        rules={[{ required: true, message: 'Password is required!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLogging}
          type="primary"
          htmlType="submit"
          disabled={hasError}
        >
            LOG IN
        </Button>
      </Form.Item>
    </Form>
  )
}
