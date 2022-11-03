import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Importing pages and containers
import NotFound from './pages/NotFound'
import Layout from './containers/Layout'

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
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((r) => (
            <Route path={r.path} element={r.element} key={r.path} />
          ))}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
