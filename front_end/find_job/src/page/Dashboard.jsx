// Dashboard.js
import React, { useState, useEffect } from 'react';
import Openjob from './Openjob';
import Viewjob from './Viewjob';
import axios from 'axios';


function Dashboard() {
  const [initialData, setInitialData] = useState([]);
 

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    console.log("fetching started");
    axios.get('http://127.0.0.1:8000/company/open_job/')
      .then(response => {
        const initialData = response.data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: item.location,
          education_qualification: item.education_qualification,
          requirement: item.requirement
        }));
        setInitialData(initialData);
      })
      .catch(error => console.error('Error fetching initial data:', error));
  };

 

  return (
    <>
      <Openjob fetch={fetchJobs} />
      <Viewjob initialData={initialData} fetch={fetchJobs} />

    
         
     
    </>
  );
}

export default Dashboard;
