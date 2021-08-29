/** @format */

import { FC, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'

import { ValidateErrorEntity } from 'rc-field-form/lib/interface'

import { FunctionWithParam } from '../../../Utils/types'

interface FormEnterOTPProps{
    onFinish: FunctionWithParam<FinishObject>,
}

interface FinishObject{
  otp: string
}

export const FormEnterOTP:FC<FormEnterOTPProps> = ({ onFinish }) => {
  const [hasError, setHasError] = useState(false)
  const [form] = useForm()

  const onFinishFailed = (err: ValidateErrorEntity) => {
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
        label="OTP"
        name="otp"
        rules={[{ required: true, message: 'OTP is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasError}
        >
              Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
