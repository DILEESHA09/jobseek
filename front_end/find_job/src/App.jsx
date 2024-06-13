import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Applyjob from './page/applyjob'
import REGISTER from './page/REGISTER'
import Login from './page/Login'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from './page/Dashboard'
import Candidate_register from './page/candidate_register'
import Profile from './page/profile'
import Candidate_login from './page/candidate_login'
import Navbar from './page/Navbar';

import  AppliedCandidates from './page/viewapplications'
import { Link, useNavigate } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)



  return (
    <>
     <Router>
     <Navbar />
      <Routes>
     <Route path='/register' element={<REGISTER/>}> </Route>
     <Route path="/login" element={<Login/>} />
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/' element ={< Applyjob />} />
     <Route path='/candidate_register' element ={< Candidate_register />} />
     <Route path='/candidate_login' element ={< Candidate_login />} />
     <Route path='/profile' element ={< Profile  />} />
     <Route path='/appliedCandidates/:jobId' element={<AppliedCandidates/>} />
    
     </Routes>
     </Router>
    </>
  )
}

export default App
