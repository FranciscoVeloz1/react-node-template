import { useState } from 'react'
import Sidebar from './Sidebar'
import Navigation from '@components/Navigation'
import GlobalNavigation from './GlobalNavigation'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

import '@styles/containers/Layout.css'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  let user = {
    fk_rol: 2
  }

  if (user !== null && user.fk_rol === 2)
    return (
      <div className='main_container'>
        <Sidebar toggle={toggle} setToggle={setToggle} />

        <div
          className={toggle ? 'main_content active' : 'main_content'}
          onClick={() => (toggle ? setToggle(!toggle) : null)}
        >
          <Navigation setToggle={setToggle} toggle={toggle} />
          {children}
        </div>

        <ToastContainer />
        <Toaster position='top-center' reverseOrder={false} />
      </div>
    )

  return (
    <>
      <GlobalNavigation />
      {children}
      <ToastContainer />
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default Layout
