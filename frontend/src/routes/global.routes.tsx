import { lazy } from "react";
import { IRoute } from '@interfaces/IRoute'
const Home = lazy(() => import("@pages/Home"));

const GlobalRoutes: IRoute[] = [
  {
    path: '/',
    element: <Home />
  }
]

export default GlobalRoutes
