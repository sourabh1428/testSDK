import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {getAllUsers} from 'user-sdk-1428'
import { Spinner } from '@chakra-ui/react'

const Allusers = () => {
    const [data, setData] = useState([]);
    const navigate=useNavigate();


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
  
    function handleClick(e){
        console.log(e);
        navigate(`/User/${e.ID}`);
    }


    return (
      <div>
        {data.length > 0 ? (
          data.map((e, index) => <h2 onClick={()=>handleClick(e)} key={index}>{e.name}</h2>)
        ) : (
          <Spinner size='xl' />
        )}
      </div>
    );
}

export default Allusers