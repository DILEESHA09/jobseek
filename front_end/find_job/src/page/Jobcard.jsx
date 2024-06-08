import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Jobcard = ({ job , fetch}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const viewApplicants = (jobId) => {
    navigate(`/appliedCandidates/${jobId}`);
  };
  const [formData, setFormData] = useState({
    
    title: job?.title || '',
    location: job?.location || '',
    description: job?.description || ''
  });

  useEffect(() => {
    // Fetch data when component mounts
    fetch();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/company/open_job/');
  //     // Handle response data
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/company/open_job/?id=${job.id}`);
      console.log('Job deleted successfully:', response.data);
      fetch();
      // Implement logic to update UI after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/company/open_job/?id=${job.id}`, formData);
      console.log('Changes saved:', response.data);
      setShowModal(false);
      fetch();
      // Implement logic to update UI after successful update
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <>
      {job && (
        <Card style={{ width: '58rem', marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
            <Card.Text>{job.description}</Card.Text>
            <div className="d-flex justify-content-end">
            
             <Button variant="primary" className="mr-2" onClick={() => viewApplicants(job.id)}>View applicants</Button>
              <Button variant="primary" className="mr-2" onClick={handleEditClick}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing job details */}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Jobcard;
