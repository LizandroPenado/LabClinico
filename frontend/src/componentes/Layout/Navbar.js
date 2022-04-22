import React from 'react';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import Logo from './Logo';
import { Button, NavbarBrand } from 'react-bootstrap';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';

function Navegacionbar() {
/*   const [sidebar, setSidebar] = useState(false); */

 /*  const showSidebar = () => setSidebar(!sidebar); */

  return (
    <>
      <Navbar className='navbar' expand={false}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="despliegue" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="menu"
          >
            <Offcanvas.Header closeButton className='informacion'>
              <Logo />
              <Offcanvas.Title id="offcanvasNavbarLabel">SILAC</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className="lista-opciones">
                      {/* <Link to={item.path}>
                        {item.icon}
                        <span className="span">{item.title}</span>
                      </Link> */}
                      <a href={item.path} className="opciones">{item.icon} {' '} {item.title}</a>
                    </li>
                  );
                })}
                {/* <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <NavbarBrand>
            <span className='usuario'>Usuario</span> {' '}
            <Button variant='danger' size='sm'>
              <LogoutIcon />
            </Button>
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegacionbar;