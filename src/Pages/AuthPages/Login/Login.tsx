import { FC, useEffect } from 'react'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { FormLogin } from '../../../Features/Components'

import { login } from '../../../Redux'
import { RootDispatch } from '../../../Redux/Store'

import { OperationStatus } from '../../../Utils/enums'

import { AuthReducerState } from '../../../Redux/AuthRedux/AuthTypes'
import { LoginFieldType } from '../../../Utils/types'
import { RootState } from '../../../Redux/rootReducers'
import { labels } from '../../../Utils/en'


export const Login:FC = () => {
  const history = useHistory<History>()
  const dispatch = useDispatch<RootDispatch>()

  const { operationStatus } = useSelector((state: RootState) => state.AuthReducer) as AuthReducerState

  useEffect(() => {
    if((operationStatus.login === OperationStatus.SUCCEEDED)){
      history.push('/')
    }
  },[operationStatus, history, dispatch])

  const onFinish = (values: LoginFieldType) => {
    dispatch(login.request(values))
  }

  return (
    <>
      <Typography.Title level={1}>{labels.login.title}</Typography.Title>
      <Typography.Text>{labels.login.text}</Typography.Text>
      <FormLogin onFinish={onFinish} isLogging={operationStatus.login === OperationStatus.IN_PROGRESS} />
      <Typography.Link onClick={()=> history.push('/auth/reset-password')}>Forgot Password ?</Typography.Link>
    </>
  )
}
