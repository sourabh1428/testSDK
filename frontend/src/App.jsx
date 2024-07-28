import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllCampaign from './Components/AllCampaign';
import Allusers from './Components/Allusers';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <AllCampaign/> */}

     <Allusers/>
    </>
  )
}

export default App
