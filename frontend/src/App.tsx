import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Importing pages and containers
const Loading = lazy(() => import('@common/Loading'))
const NotFound = lazy(() => import('@pages/NotFound'))
const Layout = lazy(() => import('@containers/Layout'))

//Importing routes
import routes from './routes'

//Importing styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import './styles/styles.css'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map((r) => (
                <Route path={r.path} element={r.element} key={r.path} />
              ))}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
