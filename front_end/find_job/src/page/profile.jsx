import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    ftname: '',
    lname: '',
    qualification: '',
    cv: '',
    experience: 0,
    phone: '',
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/canidate/register/?id=${initialData.id}`);
      const data = response.data[0]; // Assuming response.data is an array
      setInitialData(data);
      setFormData({
        email: data.email,
        ftname: data.ftname,
        lname: data.lname,
        qualification: data.qualification,
        cv: '', // Initialize as null since file can't be set directly
        experience: data.experience,
        phone: data.phone,
      });
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
   
    fetchData();
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0],
    });
  };

  const handleSaveChanges = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('ftname', formData.ftname);
      formDataToSend.append('lname', formData.lname);
      formDataToSend.append('qualification', formData.qualification);
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }
      formDataToSend.append('experience',5);
      formDataToSend.append('phone', formData.phone);

      const response = await axios.patch(`http://127.0.0.1:8000/canidate/register/?id=${initialData.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Changes saved:', response.data);
      setShowModal(false);
      // Re-fetch the data to update UI
      fetchData();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <>
      <Card style={{ width: '58rem', marginBottom: '20px' }}>
        <Card.Body>
          <Card.Title>EMAIL: {initialData.email}</Card.Title>
          <Card.Title>FIRST NAME: {initialData.ftname}</Card.Title>
          <Card.Title>LAST NAME: {initialData.lname}</Card.Title>
          <Card.Title>PHONE: {initialData.phone}</Card.Title>
          <Card.Title>QUALIFICATION: {initialData.qualification}</Card.Title>
          <Card.Title>EXPERIENCE: {initialData.experience}</Card.Title>
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="mr-2" onClick={handleEditClick}>
              Update Profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing job details */}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" value={formData.email || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="fname" value={formData.ftname || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lname" value={formData.lname || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formQualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" name="qualification" value={formData.qualification || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control as="textarea" rows={3} name="experience" value={formData.experience || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formCv">
              <Form.Label>Upload CV</Form.Label>
              <Form.Control type="file" name="cv"  onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Myprofile;
