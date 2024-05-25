import React, { useEffect, useState } from 'react';
import Jobcard from './Jobcard';
import axios from 'axios';


const Viewjob = ({initialData,fetch}) => {


    
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '20px' }}>Job Openings</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {initialData.map((job, index) => (
            <Jobcard key={index} job={job} fetch={fetch}/>
          ))}
        </div>
      </div>
    );
  };
  
  export default Viewjob;
  