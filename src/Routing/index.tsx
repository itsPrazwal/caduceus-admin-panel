import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { AdminRoute, AuthRoutes } from './Routes'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ComponentRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to={`/admin/`} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path={'/admin/'} component={AdminRoute} />
      </Switch>
    </Router>
  )
}

export default ComponentRouter
