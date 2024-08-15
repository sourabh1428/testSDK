import React, { useState } from 'react'
import './NavBar.css'
import { Box, Center, Flex, useStatStyles } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  
  const [state, setstate] = useState();
  

  const navigate=useNavigate();

  async function handleClick(e){
    localStorage.clear("token")
    navigate('/signin');

  }


  return (<div>
     <Flex className='NavBar' align="center" justify="space-between">
    hi

    <ButtonGroup variant="outline">
      <Button size='sm' onClick={()=>navigate("campaigns")}>Campaigns</Button>
      <Button size='sm' onClick={()=>navigate("users")}>Users</Button>
      <Button size='sm' onClick={()=>navigate("analytics")}>Analytics</Button>
    </ButtonGroup>
    <Button colorScheme='teal' size='md'onClick={handleClick}>Logout</Button>
</Flex>

</div>
   
    
  )
}

export default Navbar