import React, { useEffect, useState } from 'react'
import {getUserEvents} from 'user-sdk-1428'
import { useParams } from 'react-router-dom';

const UserActivity = () => {
    const { id } = useParams();
    const[data,setData]=useState([]);


    useEffect(()=>{
       async function run(){
        const d= await getUserEvents(id);
        setData(d);
        console.log(data);
       }
        run();
    },[])


  return (


    <div></div>
  )
}

export default UserActivity