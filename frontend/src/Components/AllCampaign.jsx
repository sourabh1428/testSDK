import { useEffect, useState } from 'react';
import { getAllCampaigns } from 'user-sdk-1428';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // Correct import
import CreateCampaign from './../Campaigns/CreateCampaign';

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

  return (
    <div>
     <CreateCampaign/>
      {data.length > 0 ? (
        data.map((e, index) => <h2 key={index}>{e.name}</h2>)
      ) : (
        <Spinner size='xl' />
      )}
    </div>
  );
};

export default AllCampaign;
