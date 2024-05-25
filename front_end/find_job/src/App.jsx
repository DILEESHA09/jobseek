import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Applyjob from './page/applyjob'
import REGISTER from './page/REGISTER'
import Login from './page/Login'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from './page/Dashboard'
import Canidate_register from './page/canidate_register'
import Profile from './page/profile'
import Canidate_login from './page/canidate_login'
import Navbar from './page/Navbar';
import CandidateApplication from './page/canidateapplication'
import ViewJobApplications from './page/viewapplications'
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
     <Route path='/applyjob' element ={< Applyjob />} />
     <Route path='/canidate_register' element ={< Canidate_register />} />
     <Route path='/canidate_login' element ={< Canidate_login />} />
     <Route path='/candidateApplication' element ={< CandidateApplication />} />
     <Route path='/viewJobApplications' element ={< ViewJobApplications />} />
     <Route path='/profile' element ={< Profile  />} />
     </Routes>
     </Router>
    </>
  )
}

export default App
