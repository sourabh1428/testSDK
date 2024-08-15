import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Container } from '@chakra-ui/react';
import { getParticularCampaign } from 'user-sdk-1428';

const SingleCampaign = () => {
  const { cid } = useParams(); // Get the campaign ID from the URL parameters
  const [campaign, setCampaign] = useState(null); // State to store campaign details
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    // Fetch campaign details when the component mounts
    const fetchCampaignDetails = async () => {
      try {
        const data = await getParticularCampaign(cid);
        if (data) {
          setCampaign(data);
        } else {
          setError("No data found for the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setError("An error occurred while fetching campaign details.");
      }
    };

    fetchCampaignDetails();
  }, [cid]); // Dependency array includes id to refetch if id changes

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error" variant="subtle">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" p={4}>
      <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
        <Heading mb={4}>{campaign.name}</Heading>
        <Text fontSize="lg" mb={2}>Type: {campaign.type}</Text>
        <Text fontSize="md" mb={4}>Description: {campaign.description}</Text>
        <Image
          src={campaign.imageURL}
          alt={campaign.name}
          borderRadius="md"
          fallbackSrc="path/to/default-image.jpg"
          boxSize="full"
        />
      </Box>
    </Container>
  );
}

export default SingleCampaign;
