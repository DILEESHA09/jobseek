import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Applyjob = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate()
  const handleapply=()=>{
    navigate('/candidateApplication')
  }

  useEffect(() => {
    const fetch = () => {
      console.log("fetching..")
      axios.get('http://127.0.0.1:8000/company/open_job/')
        .then(response => {
          const data = response.data.map(item => ({
            id: item.id,
            company: 1,
            title: item.title,
            description: item.description,
            location: item.location,
            education_qualification: item.education_qualification,
            requirement: item.requirement
          }));
          console.log(data);
          setData(data);
        })
        .catch(error => console.error('Error fetching initial data:', error));
    };
    fetch();
  }, []);

  return (


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' ,marginTop:'60px'}}>
      <div>
      {Data.map((job, index) => (
        <Card key={index}  style={{ width: '58rem', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {job.title}
            </Typography>
            <Typography color="textSecondary">
              Company: {job.company}
            </Typography>
            <Typography color="textSecondary">
              Location: {job.location}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {job.description}
            </Typography>
            <Typography variant="body2" component="p">
              Requirements: {job.requirement}
            </Typography>
            {/* You can add more details here */}
            <Button variant="primary" className="mr-2" onClick={handleapply}  >Apply</Button>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default Applyjob;
