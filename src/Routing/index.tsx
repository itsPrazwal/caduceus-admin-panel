import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { AdminRoute, AuthRoutes } from './Routes'
import { NotFound } from '../Pages'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ComponentRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to={`/admin`} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path={'/admin'} component={AdminRoute} />
        <Route path={'/notFound'} component={NotFound} />
      </Switch>
    </Router>
  )
}

export default ComponentRouter
