import React, { useEffect, useState } from 'react';
import { getAllCampaigns } from 'user-sdk-1428';

const AllCampaign = () => {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((e, index) => <h2 key={index}>{e._id}</h2>)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AllCampaign;
