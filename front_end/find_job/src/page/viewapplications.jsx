import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewJobApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch job applications from the backend when the component mounts
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/jobapplication/');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    };

    fetchJobApplications();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Job Applications</h2>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            <h3>Name: {application.name}</h3>
            <p>Qualification: {application.qualification}</p>
            <a href={application.cv} target="_blank" rel="noopener noreferrer">View CV</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewJobApplications;
