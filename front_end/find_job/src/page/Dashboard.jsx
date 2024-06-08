// Dashboard.js
import React, { useState, useEffect } from 'react';
import Openjob from './Openjob';
import Viewjob from './Viewjob';
import axios from 'axios';


function Dashboard() {
  const [initialData, setInitialData] = useState([]);
 
  var cmp =  localStorage.getItem('company_id');
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = () => {
    console.log("fetching started");
    const company_id = localStorage.getItem('company_id');
    axios.get(`http://127.0.0.1:8000/singleCompany/open_job/?company_id=${company_id}`)
      .then(response => {
        const filteredData = response.data.map(item => ({
          id: item.id,
          title: item.title,
          company: item.company,
          description: item.description,
          location: item.location,
          education_qualification: item.education_qualification,
          requirement: item.requirement
        }));
        setInitialData(filteredData);
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
