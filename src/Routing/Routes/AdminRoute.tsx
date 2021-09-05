import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RouteChildrenProps } from 'react-router'

import { DiseasePage, LandingPage } from '../../Pages'
import { RouteGuard } from '../RouteGuard'
import { AdminLayout } from '../../Features/Components'
import { DepartmentPage } from '../../Pages/DepartmentPage'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AdminRoute:FC<RouteChildrenProps> = props => {
  return (
    <RouteGuard {...props}>
      <AdminLayout>
        <Switch>
          <Redirect exact from={`${props?.match?.path}/`} to={`${props?.match?.path}/dashboard`} />
          <Route exact path={`${props?.match?.path}/dashboard`} component={LandingPage} />
          <Route exact path={`${props?.match?.path}/disease`} component={DiseasePage} />
          <Route exact path={`${props?.match?.path}/hospital/department`} component={DepartmentPage} />
          <Redirect to="/notFound" />
        </Switch>
      </AdminLayout>
    </RouteGuard>
  )
}

