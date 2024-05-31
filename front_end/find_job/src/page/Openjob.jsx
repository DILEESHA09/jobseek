import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Openjob = ({fetch}) => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');0
  const [requirement, setRequirement] = useState('');
  const [education_qualification, setEducationQualification] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleRequirementChange = (event) => {
    setRequirement(event.target.value);
  };

  const handleEducationQualificationChange = (event) => {
    setEducationQualification(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/company/open_job/', {
        title: title,
        description: description,
        requirement: requirement,
        education_qualification: education_qualification,
        company :company.id,
        location: location 
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        fetch();
        setIsVisible(prevState => !prevState);
        setIsAlert(prevState => !prevState);
        setMessage('Registration successful!');
        setTimeout(() => {
          setIsAlert(prevState => !prevState);
        }, 3000);
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Button variant="primary" className="mr-2" onClick={toggleVisibility} style={{ width: '100%', marginTop: '20px' }}>Register job</Button>
        </div>
      </div>

      {isAlert && (
        <Alert severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}

      {isVisible && (
        <div>
          <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Create Job Opening</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter job title" value={title} onChange={handleTitleChange} />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter job description" value={description} onChange={handleDescriptionChange} />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Requirement</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter job qualification" value={requirement} onChange={handleRequirementChange} />
              </Form.Group>       

              <Form.Group controlId="formEducationQualification">
                <Form.Label>Education Qualification</Form.Label>
                <Form.Control type="text" placeholder="Enter education qualification" value={education_qualification} onChange={handleEducationQualificationChange} />
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter job location" value={location} onChange={handleLocationChange} />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '20px' }}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Openjob;
