import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllCampaign from './Components/AllCampaign';
import Allusers from './Components/Allusers';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import UserActivity from './Components/UserActivity';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <AllCampaign/> */}
     <Router>
<Routes> 
    <Route path='/' Component={AllCampaign} />
    <Route path='/Users' Component={Allusers}/>
    <Route path="/User/:id" Component={UserActivity} />
   </Routes>
     

     </Router>
    </>
  )
}

export default App
