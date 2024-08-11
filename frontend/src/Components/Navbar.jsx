import React from 'react'
import './NavBar.css'
import { Box, Center, Flex } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Navbar = () => {
  return (<div>
     <Flex className='NavBar' align="center" justify="space-between">
    hi
    <Avatar src='https://bit.ly/broken-link' />
    <Button colorScheme='teal' size='md'>Logout</Button>
</Flex>

</div>
   
    
  )
}

export default Navbar