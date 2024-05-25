import React, { useState,useEffect } from 'react';
import Openjob from './Openjob';
import Viewjob from './Viewjob';
import axios from 'axios';

function Dashboard() {
 

    // Example job data
    const [initialData, setInitialData] = useState([]);
 

    useEffect(() => {
      // Fetch initial data once component is mounted
  fetch();
  
    }, []);


    const fetch=()=>{
      console.log("fetching started");
      axios.get('http://127.0.0.1:8000/company/open_job/')
      .then(response => {
        // Extract required data from response
        const initialData = response.data.map(item => ({
          id:item.id,
          title: item.title,
          description: item.description,
          location: item.location,
          education_qualification: item.education_qualification,
          requirement: item.requirement
        }));
        // Update state with initial data
        setInitialData(initialData);
       
      
      })
      .catch(error => console.error('Error fetching initial data:', error));
    }
  return (
    <>
      
      <Openjob fetch={fetch}  />
      <Viewjob  initialData={initialData} fetch={fetch}/>
    </>
  );
}

export default Dashboard;
