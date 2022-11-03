import NavItem from '@components/NavItem'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const GlobalNavigation = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Link to='/' className='text-white'>
            <FontAwesomeIcon icon={faHome} className='me-2 icon' />
            Template
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <NavItem />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default GlobalNavigation
