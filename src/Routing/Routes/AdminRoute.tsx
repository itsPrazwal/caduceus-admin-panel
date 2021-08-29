import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RouteChildrenProps } from 'react-router'

import { LandingPage } from '../../Pages'
import { RouteGuard } from '../RouteGuard'
import { AdminLayout } from '../../Features/Components'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AdminRoute:FC<RouteChildrenProps> = props => {
  return (
    <RouteGuard {...props}>
      <AdminLayout>
        <Switch>
          <Redirect exact from={`${props?.match?.path}/`} to={`${props?.match?.path}/dashboard`} />
          <Route exact path={`${props?.match?.path}/dashboard`} component={LandingPage} />
          <Redirect to="/notFound" />
        </Switch>
      </AdminLayout>
    </RouteGuard>
  )
}

