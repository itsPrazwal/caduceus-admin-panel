import { Button, Form, Input, Modal } from 'antd'
import { OperationStatus } from '../../../../Utils/enums'
import React, { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootDispatch } from '../../../../Redux/Store'
import { AuthReducerState } from '../../../../Redux/AuthRedux/AuthTypes'
import { RootState } from '../../../../Redux/rootReducers'
import { FormChangePassword } from '../../Auth'
import { changePassword } from '../../../../Redux'
import { FunctionWithNoParam, Nullable } from '../../../../Utils/types'

export const ChangePassword: FC = () => {

  const dispatch = useDispatch<RootDispatch>()
  const { operationStatus } = useSelector<RootState>(state => state.AuthReducer) as AuthReducerState
  const [oldPassword, setOldPassword] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [error, setError] = useState<Nullable<string>>(null)

  useEffect(() => {
    if(operationStatus.changePassword === OperationStatus.SUCCEEDED){
      setVisible(false)
    }
  }, [operationStatus.changePassword])

  const onChangePasswordComplete = async ({ password }: {password: string}) => {
    if(oldPassword){
      dispatch(changePassword.request({ newPassword: password, prevPassword: oldPassword }))
    }else{
      setError('Old password is required.')
    }
  }

  const clearStates:FunctionWithNoParam = () => {
    setOldPassword('')
    setError(null)
  }

  const handlePasswordChange:ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target
    setOldPassword(value)
    setError(null)
  }

  return(
    <>
      <Button type="link" htmlType="button" onClick={() => setVisible(true)} >Change Password</Button>
      <Modal closable={false} centered={true} onCancel={() => setVisible(false)} footer={null} visible={visible} destroyOnClose={true} afterClose={clearStates}>
        <Form layout="vertical" >
          <Form.Item
            label="Old Password"
            name="password"
            validateStatus={error ? 'error' : 'success'}
            help={error || null}
          >
            <Input.Password onChange={handlePasswordChange} autoFocus={true} />
          </Form.Item>
        </Form>
        <FormChangePassword disableSubmit={!!error} autoFocus={false} onFinish={onChangePasswordComplete} passwordSubmitted={operationStatus.changePassword === OperationStatus.IN_PROGRESS} />
      </Modal>
    </>
  )
}
