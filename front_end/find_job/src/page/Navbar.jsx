import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavScrollExample() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const isLoggedIn = localStorage.getItem('candidate_id'); // Check if user is logged in
  const isCompanyLoggedIn = localStorage.getItem('company_id'); // Check if user is logged in
  
  const login = () => {
    navigate('/candidate_login');
  };
  
  const logincmp = () => {
    navigate('/login');
  };
  
  const data = {
    sessionKey: localStorage.getItem('session_id'),
  };
  
  const datacmp = {
    sessionKey: localStorage.getItem('session_cmp_id'),
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/candidate/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: JSON.stringify(data), // Add the request body if required
      });

      if (response.status === 200) {
        localStorage.removeItem('session_id');
        localStorage.removeItem('candidate_id');
        console.log('Logout successful');
        navigate('/candidate_login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCompanyLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/company/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: JSON.stringify(datacmp), // Add the request body if required
      });

      if (response.status === 200) {
        localStorage.removeItem('session_cmp_id');
        localStorage.removeItem('company_id');
        console.log('Logout successful');
        navigate('/login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = () => {
    navigate(`/applyjob?search=${searchQuery}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href='/applyjob'>FIND YOUR DREAM JOBS HERE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
  {isLoggedIn && <Nav.Link href='/profile'>MYPROFILE</Nav.Link>}
            {isCompanyLoggedIn && <Nav.Link href='/dashboard'>COMPANY DASHBOARD</Nav.Link>}
         

          </Nav>

    
          <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            
          
          </Form>

    

        </Navbar.Collapse>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>

{isCompanyLoggedIn ? (
  <Button variant="outline-success" className="mx-2" onClick={handleCompanyLogout}>COMPANY LOGOUT</Button>
) : (
  <Button variant="outline-success" className="mx-2" onClick={logincmp}>COMPANY LOGIN</Button>
)}
{isLoggedIn ? (
  <Button variant="outline-success" className="mx-2" onClick={handleLogout}>CANDIDATE LOGOUT</Button>
) : (
  <Button variant="outline-success" className="mx-2" onClick={login}>CANDIDATE LOGIN</Button>
)}

</Nav>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
