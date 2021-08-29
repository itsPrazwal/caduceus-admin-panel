import { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AuthLayout } from '../../Features/Components'
import { Login, ResetPassword, VerifyUserPage } from '../../Pages'

export const AuthRoutes:FC = () => {

  return (
    <AuthLayout>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/reset-password" component={ResetPassword} />
        <Route exact path="/auth/verify-user/:token" component={VerifyUserPage} />
        <Redirect to="/auth/login" />
      </Switch>
    </AuthLayout>
  )
}
