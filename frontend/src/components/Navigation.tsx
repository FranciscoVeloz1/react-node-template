import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons'

interface Props {
  toggle: boolean
  setToggle: Function
}

const Navigation = ({ toggle, setToggle }: Props) => {
  const navigate = useNavigate()

  //Sign out
  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <Navbar bg='light' variant='light' className='border-radius'>
      <Container fluid>
        <div onClick={() => setToggle(!toggle)} className='btn'>
          <FontAwesomeIcon icon={faBars} className='icon txt-primary my-auto' />
        </div>

        <Nav className='ms-auto'>
          <Dropdown drop='start'>
            <Dropdown.Toggle variant='outline-light' className='button-primary' id='dropdown-basic'>
              Francisco
            </Dropdown.Toggle>

            <Dropdown.Menu className='dropdown-growIn'>
              <Link to='/profile'>
                <div className='mt-2 dropdown-item'>
                  <FontAwesomeIcon icon={faUser} className='me-2 icon txt-secondary' />
                  Profile
                </div>
              </Link>
              <hr />
              <Dropdown.Item className='mb-2' onClick={handleSignOut}>
                <FontAwesomeIcon icon={faSignOut} className='me-2 icon my-auto txt-secondary' />
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
