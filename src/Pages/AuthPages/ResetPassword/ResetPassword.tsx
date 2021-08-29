/** @format */

import { FC, useEffect, useState } from 'react'
import { Divider, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { FormChangePassword, FormEnterEmail, FormEnterOTP } from '../../../Features/Components'

import { forgotPassword, resetPassword } from '../../../Redux'
import { RootDispatch } from '../../../Redux/Store'

import { LocalStorageKeys, OperationStatus, ResetPasswordWorkingState } from '../../../Utils/enums'
import { labels } from '../../../Utils/en'

import { RootState } from '../../../Redux/rootReducers'
import { FieldTypeResetPassword } from '../../../Redux/AuthRedux/AuthTypes'
import localStorage from 'redux-persist/es/storage'

const initialResetPasswordState = {
  email: '',
  otp: '',
  password: '',
  isChanging: {
    status: false,
    time: 0
  }
}

interface ResetPasswordFieldType extends FieldTypeResetPassword{
  isChanging: {
    status: boolean,
    time: number
  }
}

export const ResetPassword:FC = () => {
  const [currentState, setCurrentState] = useState<ResetPasswordWorkingState>(ResetPasswordWorkingState.FORGOT)
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordFieldType>(initialResetPasswordState)

  const history = useHistory<History>()
  const dispatch = useDispatch<RootDispatch>()
  const { operationStatus } = useSelector((state: RootState) => state.AuthReducer)



  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const localData = await localStorage.getItem(LocalStorageKeys.RESET_STATE)
        if(localData && JSON.parse(localData)){
          const parsedData:ResetPasswordFieldType = JSON.parse(localData)
          if(parsedData.isChanging.status && (parsedData.isChanging.time + 300000) > Date.now()){
            let toUpdateData:ResetPasswordFieldType = {} as ResetPasswordFieldType
            Object.keys(parsedData).map(pd => {
              if(parsedData[pd]){
                toUpdateData = { ...toUpdateData, [pd]: parsedData[pd] }
              }
            })
            if(toUpdateData.email) setCurrentState(ResetPasswordWorkingState.OTP)
            if(toUpdateData.otp) setCurrentState(ResetPasswordWorkingState.CHANGE)
            setResetPasswordState(toUpdateData)
          }else{
            await localStorage.removeItem(LocalStorageKeys.RESET_STATE)
          }
        }
      }catch (err){
        console.error(err)
      }
    }
    getDataFromLocal()
  }, [])

  useEffect(() => {
    if(resetPasswordState.isChanging.status)
      localStorage.setItem(LocalStorageKeys.RESET_STATE, JSON.stringify(resetPasswordState))
  }, [resetPasswordState])

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
    setResetPasswordState(prevState => ({ ...prevState, email, isChanging: { status: true, time: Date.now() } }))
    dispatch(forgotPassword.request({ email }))
  }

  const onOTPFinish = (values: { otp: string }) => {
    setResetPasswordState(prevState => ({ ...prevState, otp: values.otp, isChanging: { status: true, time: Date.now() } }))
    setCurrentState(ResetPasswordWorkingState.CHANGE)
  }

  const onChangePasswordFinish = ({ password }: { password: string }) => {
    dispatch(resetPassword.request({ ...resetPasswordState, password }))
  }

  return (
    <>
      <Typography.Title level={1}>{labels[currentState].title}</Typography.Title>
      <Typography.Text>{labels[currentState].text}<strong>{currentState === ResetPasswordWorkingState.OTP ? generateDisplayEmail(resetPasswordState.email) : ''}</strong></Typography.Text>
      <Divider />
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

const generateDisplayEmail = (email: string):string => {
  const atIndex = email.indexOf('@')
  return `${email.slice(0,3)}****${email.slice(atIndex)}`
}
