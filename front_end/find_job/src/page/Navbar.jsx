import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';





function NavScrollExample() {



  const handleLogout = async () => {
    try {
      // Make an HTTP POST request to the logout endpoint
      const response = await axios.post('http://127.0.0.1:8000/candidate/logout/', {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // Ensure cookies are sent with the request if needed
      });

      // Check if the request was successful
      if (response.status === 200) {
        console.log(response);
        // Remove session ID from local storage
        localStorage.removeItem('session_id');
        // Redirect the user to the login page
        navigate('/canidate_login');
      } else {
        console.error('Logout failed:', response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error.message);
      // Display error message to the user
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href='/applyjob' >FIND YOUR DREAM JOBS HERE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/register">COMPANY REGISTER</Nav.Link>
            <Nav.Link href="canidate_register">CANIDATE</Nav.Link>
            
          
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;