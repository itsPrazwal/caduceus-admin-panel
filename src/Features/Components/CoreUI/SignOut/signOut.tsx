import { Button } from 'antd'
import { NotifierTitle, OperationStatus } from '../../../../Utils/enums'
import React, { FC, useEffect } from 'react'
import { logOut } from '../../../../Redux'
import { useDispatch, useSelector } from 'react-redux'
import { RootDispatch } from '../../../../Redux/Store'
import { AuthReducerState } from '../../../../Redux/AuthRedux/AuthTypes'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../../../Redux/rootReducers'
import { notifier } from '../../../../Utils/Notifiers/Notifier'

export const SignOutBut: FC = () => {

  const { operationStatus } = useSelector<RootState>(state => state.AuthReducer) as AuthReducerState
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()

  const onLogOut = () => {
    dispatch(logOut.request())
  }

  useEffect(()=>{
    if(operationStatus.logout === OperationStatus.SUCCEEDED){
      notifier.success(NotifierTitle.LOG_OUT)
      history.push('/auth/login')
    }
  },[operationStatus, history])

  return(
    <Button type="primary" htmlType="button" loading={operationStatus.logout === OperationStatus.IN_PROGRESS} onClick={onLogOut} >Logout</Button>
  )
}
