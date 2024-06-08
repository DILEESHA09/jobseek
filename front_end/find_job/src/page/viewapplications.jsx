import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AppliedCandidates() {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, [jobId]);

  const fetchCandidates = () => {
    axios.get(`http://127.0.0.1:8000/company/applied_candidates/${jobId}/`)
      .then(response => {
        console.log(response);
        setCandidates(response.data);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '60px' }}>
    <div>
      <h2>Applicants for Job ID: {jobId}</h2>
      {candidates.length > 0 ? (
        candidates.map(candidate => (
          <div  style={{backgroundColor:"pink",borderRadius:"10px",width:"350px",paddingLeft:"50px"}}  key={candidate.email}>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.email}</p>
            <p>Phone: {candidate.phone}</p>
            <p>Qualification: {candidate.qualification}</p>
            <p>CV:  <a href={`${candidate.cv_url}`}>Click here to view CV</a></p>
          </div>
        ))
      ) : (
        <p>No applicants found for this job.</p>
      )}
    </div>
    </div>
  );
}

export default AppliedCandidates;
