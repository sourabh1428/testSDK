import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Skeleton, Container, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/react';
import { getParticularCampaign } from 'user-sdk-1428';
import moment from 'moment-timezone';

const SingleCampaign = () => {
  const { cid } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        setLoading(true);
        const data = await getParticularCampaign(cid);
        if (data) {
          setCampaign(data);
        } else {
          setError("No data found for the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setError("An error occurred while fetching campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [cid]);

  const formatDate = (epochTime) => {
    return moment.unix(epochTime).tz('Asia/Kolkata').format('DD MMM YYYY, hh:mm A');
  };

  if (error) {
    return (
      <Container centerContent p={4}>
        <Alert status="error" variant="subtle" borderRadius="md" p={4} width="full">
          <AlertIcon />
          <Stack spacing={2}>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Stack>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" p={4} centerContent>
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="full"
        h="full"
        textAlign="center"
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
        boxShadow="md"
      >
        {loading ? (
          <Stack spacing={4} w="full" align="center">
            <Skeleton height="200px" width="full" />
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="60%" />
            <Skeleton height="20px" width="40%" />
          </Stack>
        ) : (
          <>
            <Heading mb={4} size="lg">{campaign.name}</Heading>
            <Text fontSize="lg" mb={2}>Type: {campaign.type}</Text>
            <Text fontSize="md" mb={4}>Description: {campaign.description || "No description available"}</Text>
            <Image
              src={campaign.imageURL}
              alt={campaign.name}
              borderRadius="md"
              fallbackSrc="path/to/default-image.jpg"
              boxSize="300px" // Fixed size for medium image
              objectFit="cover"
              mb={4}
            />
            <Flex
              direction="row"
              justify="flex-end"
              align="flex-end"
              w="full"
              position="absolute"
              bottom="10px"
              right="10px"
            >
              <Text fontSize="sm" color="gray.500">Created At: {formatDate(campaign.createdAt)}</Text>
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default SingleCampaign;
