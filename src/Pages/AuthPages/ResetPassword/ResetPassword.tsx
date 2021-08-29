/** @format */

import { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { FormChangePassword, FormEnterEmail, FormEnterOTP } from '../../../Features/Components'

import { forgotPassword, resetPassword } from '../../../Redux'
import { RootDispatch } from '../../../Redux/Store'

import { OperationStatus, ResetPasswordWorkingState } from '../../../Utils/enums'
import { labels } from '../../../Utils/en'

import { ResetPasswordFieldType } from '../../../Utils/types'
import { RootState } from '../../../Redux/rootReducers'

const initialResetPasswordState = {
  email: '',
  otp: '',
  password: '',
}

export const ResetPassword:FC = () => {
  const [currentState, setCurrentState] = useState<ResetPasswordWorkingState>(ResetPasswordWorkingState.FORGOT)
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordFieldType>(initialResetPasswordState)

  const history = useHistory<History>()
  const dispatch = useDispatch<RootDispatch>()
  const { operationStatus } = useSelector((state: RootState) => state.AuthReducer)

  useEffect(()=>{
    if(operationStatus.email === OperationStatus.SUCCEEDED && currentState === ResetPasswordWorkingState.FORGOT){
      setCurrentState(ResetPasswordWorkingState.OTP)
    }
    if(operationStatus.resetPassword === OperationStatus.SUCCEEDED && currentState === ResetPasswordWorkingState.CHANGE){
      history.push('/auth/login')
      setResetPasswordState(initialResetPasswordState)
    }
  },[currentState, operationStatus, history])

  const onEnterEmailFinish = ({ email }: { email: string }) => {
    setResetPasswordState(prevState => ({ ...prevState, email }))
    dispatch(forgotPassword.request({ email }))
  }

  const onOTPFinish = (values: { otp: string }) => {
    setResetPasswordState(prevState => ({ ...prevState, otp: values.otp }))
    setCurrentState(ResetPasswordWorkingState.CHANGE)
  }

  const onChangePasswordFinish = ({ password }: { password: string }) => {
    dispatch(resetPassword.request({ ...resetPasswordState, password }))
  }

  return (
    <>
      <Typography.Title level={1}>{labels[currentState].title}</Typography.Title>
      <Typography.Text>{labels[currentState].text}</Typography.Text>
      {currentState === ResetPasswordWorkingState.FORGOT
        ? <FormEnterEmail onFinish={onEnterEmailFinish} emailSubmitted={operationStatus.email === OperationStatus.IN_PROGRESS} />
        : currentState === ResetPasswordWorkingState.OTP
          ? <FormEnterOTP onFinish={onOTPFinish} />
          : currentState === ResetPasswordWorkingState.CHANGE
            ? <FormChangePassword onFinish={onChangePasswordFinish} passwordSubmitted={operationStatus.resetPassword === OperationStatus.IN_PROGRESS}/>
            : null}
      <Typography.Link onClick={() => history.push('/auth/login')}>Back to Login</Typography.Link>
    </>
  )
}

