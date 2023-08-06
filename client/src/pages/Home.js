import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {message} from 'antd'
import axios from 'axios'
let firstrender = true;
axios.defaults.withCredentials = true;

const Home = () => {
 const [user,setUser] = useState();
const navigate = useNavigate();
  const getUserRequest = async () => {
    await axios
    .get("http://localhost:5000/api/test", {
      withCredentials: true,
    }).then((res) => {
       setUser(res.data);
    })
    .catch((error) => 
    {
      console.log(error);
      if (error.response) {
        if (error.response.status === 403) {
          message.error("Authorized token expired, please login again");
          navigate('/login')
        } else if (error.response.status === 401) {
          message.error("Token is not atteched with header");
          navigate('/login')
        } 
      }
    });
  }

  useEffect(() => {
    if(firstrender) { firstrender = false; getUserRequest(); }
  },[])

  return (
    <div>
       <h1>Name: {user && user.name}</h1>
    </div>
  )
}

export default Home
