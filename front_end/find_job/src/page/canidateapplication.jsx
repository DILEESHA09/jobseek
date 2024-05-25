import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

const CandidateApplication = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [cv, setCv] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('qualification', qualification);
      formData.append('cv', cv);

      const response = await axios.post('http://127.0.0.1:8000/company/jobapplication/', formData);
      
      console.log('Response:', response);
      if (response.status === 200) {
        alert('Application submitted successfully!');
        
      } else {
        alert('Error submitting application. Please try again later.');
      }
     
      // You can add additional logic after successful submission
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root} style={{marginTop:"50px"}}>
        <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
          JOB APPLICATION
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="upload-cv">Upload CV</label>
              <input
                id="upload-cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files[0])}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'20px'}}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CandidateApplication;
