import { useRoutes } from 'react-router-dom'
import routesConfig from './routesConfig'

const RouteRenderer = () => {
  const routes = useRoutes(routesConfig)
  return routes;
}

export default RouteRenderer
