import React, { useEffect, useState } from 'react'
import {getAllUsers} from 'user-sdk-1428'


const Allusers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getAllUsers();
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
}

export default Allusers