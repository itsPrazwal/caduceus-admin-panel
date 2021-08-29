/** @format */
import { Redirect } from 'react-router-dom'
import { FC } from 'react'
import { validateLogin } from '../Utils/checkLogin'

export const RouteGuard:FC = ({ children }) => {

  const logOutUser = () => {
    localStorage.clear()
    return <Redirect to="/auth/login" />
  }

  return validateLogin()
    ? <>{children}</>
    : logOutUser()
}
