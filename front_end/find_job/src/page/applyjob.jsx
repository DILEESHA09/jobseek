import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Applyjob = () => {
  const [Data, setData] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const handleApply = async (jobId, company, cand) => {
    const candidateId = localStorage.getItem('candidate_id');
    const isLoggedIn = !!candidateId;
  
    if (!isLoggedIn) {
      navigate('/candidate_login');
      
    }


    try {
      var cand = localStorage.getItem('candidate_id');
      console.log(jobId);
      console.log(company);
      console.log(cand);


      const rdata = { job_id: jobId, company_id: company, canidate_id: cand };
      console.log(rdata);
      const response = await axios.post('http://127.0.0.1:8000/company/jobapplication/', rdata);

      if (response.status === 201) {
        console.log('Application submitted:', response);
        setIsAlert(true);

        setTimeout(() => {
          setIsAlert(false);
          navigate(`/applied_candidates/${jobId}`);
        }, 3000);
      } else if (response.status === 200) {
        console.log(response);
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  useEffect(() => {
    const fetch = () => {
      console.log("fetching...");
      axios.get('http://127.0.0.1:8000/company/open_job/')
        .then(response => {
          const data = response.data.map(item => ({
            id: item.id,
            company: item.company,
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

  const filteredData = Data.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '60px' }}>
      <div>
        {isAlert && (
          <Alert severity="success">
            Here is a gentle confirmation that you have successfully applied for this job.
          </Alert>
        )}
        {filteredData.map((job, index) => (
          <Card key={index} style={{ width: '58rem', marginBottom: '20px' }}>
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
              <Button variant="primary" className="mr-2" onClick={() => handleApply(job.id, job.company)}>Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Applyjob;
