import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faFileAlt, faHome, faUserGroup, faX } from '@fortawesome/free-solid-svg-icons'

//Importing styles and assets
import '@styles/containers/Sidebar.css'

interface Props {
  toggle: boolean
  setToggle: Function
}

const Sidebar = ({ toggle, setToggle }: Props) => {
  return (
    <div className={toggle ? `Sidebar active` : 'Sidebar'}>
      <div className='sidebar_header'>
        <Link to='/admin'>
          <FontAwesomeIcon icon={faHome} className='me-2 icon txt-primary' />
          Dashboard
        </Link>
        <FontAwesomeIcon
          icon={faX}
          className='me-2 icon d-lg-none sidebar_close'
          onClick={() => setToggle(false)}
        />
      </div>

      <div className='sidebar_content'>
        <ul>
          <p className='sidebar_subtitle'>Menu</p>
          <li>
            <Link to='/admin/template'>
              <FontAwesomeIcon icon={faFileAlt} className='me-2 sidebar_icon' />
              Template
            </Link>
          </li>

          {/* User section */}
          <p className='sidebar_subtitle'>Users</p>
          <li>
            <Link to='/admin/users'>
              <FontAwesomeIcon icon={faUserGroup} className='me-2 sidebar_icon' />
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
