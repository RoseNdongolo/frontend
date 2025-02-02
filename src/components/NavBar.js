import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Use Link from react-router-dom for navigation

function NavBar() {
  return (
    <Navbar 
      style={{
        backgroundColor: 'rgba(0, 132, 255, 0.7)', // Faded blue background with 70% opacity
        color: 'white'
      }} 
      variant="dark" 
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link 
            as={Link} 
            to="/destinations" 
            style={{ color: 'white', fontWeight: 'bold' }} 
            onMouseOver={(e) => e.target.style.color = '#ff9900'} 
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            Destinations
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/attraction" 
            style={{ color: 'white', fontWeight: 'bold' }} 
            onMouseOver={(e) => e.target.style.color = '#ff9900'} 
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            Attractions
          </Nav.Link>
          <Nav.Link 
            href="#contact" 
            style={{ color: 'white', fontWeight: 'bold' }} 
            onMouseOver={(e) => e.target.style.color = '#ff9900'} 
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            Contact
          </Nav.Link>
          <Nav.Link 
            href="#profile" 
            style={{ color: 'white', fontWeight: 'bold' }} 
            onMouseOver={(e) => e.target.style.color = '#ff9900'} 
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            Hello, Welcome
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
