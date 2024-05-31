import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';





function NavScrollExample() {

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('session_id'); // Check if user is logged in
  const login =()=>{
    navigate('/candidate_login')
  }
  const data = {
    sessionKey: localStorage.getItem('session_id')
  }
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/candidate/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: JSON.stringify(data) // Add the request body if required
      });


      if (response.status === 200) {
        localStorage.removeItem('session_id')
        localStorage.removeItem('candidate_id')

        console.log('Logout successful');
        navigate('/candidate_login')
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
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
            <Nav.Link href="candidate_register">CANDIDATE</Nav.Link>
            <Nav.Link href='/profile'>MYPROFILE</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            {isLoggedIn ? ( // Check if user is logged in
              <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button variant="outline-success"  onClick ={login} >Login</Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;