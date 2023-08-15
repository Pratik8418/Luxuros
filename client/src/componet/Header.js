import React, {useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
let firstrender = true;

const Header = () => {
  const [user,setUser] = useState();
  const getUserRequest = async () => {
    await axios
    .get("http://localhost:5000/api/test", {
      withCredentials: true,
    }).then((res) => {
       setUser(res.data);
    }).catch((error) => 
    {
      console.log(error);
      if (error.response) {
        if (error.response.status === 403) {
          console.log("header user 403")
        } else if (error.response.status === 401) {
          console.log("header user 401")
        } 
      }
    });
  }

  useEffect(() => {
    if(firstrender){ 
        getUserRequest();
        firstrender=false;
     } 
  },[])

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Luxuros.com</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/"> <span class="material-symbols-outlined">
          bed
        </span> Stays</Link></li>
        <li> <Link to="/flights"> 
        <span class="material-symbols-outlined">
          flight_takeoff
        </span> Flights</Link></li>
        <li><Link href="#"><span class="material-symbols-outlined">
          directions_car
        </span>Car Rentals</Link></li>
        <li><Link href="#"><span class="material-symbols-outlined">
          map
        </span>Destinations</Link></li>
      </ul>
      
      <div className="auth-buttons">
        <p>{user && user.name}</p>
      </div>
    </nav>
  )
}

export default Header
