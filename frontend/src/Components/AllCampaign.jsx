import React, { useEffect, useState } from 'react';
import { getAllCampaigns } from 'user-sdk-1428';
import { Spinner, Box, Container, Heading, Text, Button, Stack, Image, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import CreateCampaign from './../Campaigns/CreateCampaign';
import { motion } from 'framer-motion';

// Define a motion.div for animations
const MotionBox = motion(Box);

const AllCampaign = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // If the token is invalid, consider it expired
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  useEffect(() => {
    // Check token expiration when the page loads
    if (isTokenExpired()) {
      logout();
    }

    // Set up an interval to check token expiration every minute
    const checkTokenInterval = setInterval(() => {
      if (isTokenExpired()) {
        logout();
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(checkTokenInterval);
  }, []); // Run once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCampaigns();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  const handleBoxClick = (id) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <Container maxW="container.lg" p={4}>
      <CreateCampaign />
      <Center>
        <Stack spacing={4} width="full" maxW="md">
          {data.length > 0 ? (
            data.map((campaign, index) => (
              <MotionBox
                key={index}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                p={4}
                bg="white"
                boxShadow="md"
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                display="flex"
                alignItems="center"
                onClick={() => handleBoxClick(campaign.segment_id)}
              >
                <Image
                  src={campaign.imageURL || 'path/to/default-image.jpg'}
                  alt={campaign.name}
                  boxSize="80px"
                  objectFit="cover"
                  mr={4}
                />
                <Box flex="1">
                  <Heading size="md" mb={2}>{campaign.name}</Heading>
                  <Text noOfLines={2}>{campaign.description || "No description available"}</Text>
                </Box>
              </MotionBox>
            ))
          ) : (
            <Stack align="center">
              <Spinner size="xl" />
              <Text mt={4}>Loading campaigns...</Text>
            </Stack>
          )}
        </Stack>
      </Center>
    </Container>
  );
};

export default AllCampaign;
