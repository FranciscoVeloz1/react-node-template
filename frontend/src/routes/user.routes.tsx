import { lazy } from 'react'
import { IRoute } from '@interfaces/IRoute'
const Users = lazy(() => import('@pages/users'))

const GlobalRoutes: IRoute[] = [
  {
    path: '/users',
    element: <Users />
  }
]

export default GlobalRoutes
