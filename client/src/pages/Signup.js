import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {message} from 'antd'
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "name": name,
      "email": email,
      "mobile": mobile,
      "password": password
    }

    axios.post("http://localhost:5000/api/createUser",data).then(
      (res) => { 
        
        console.log(res.data);
        if(res.data.message){
          message.error(res.data.message);   
        }else if(res.data){
          navigate('/login'); 
          message.success("Registration successfully"); 
        }
        
      }
    ).catch(
      (error) => {
         console.log("Error: " + error); 
         message.error("something is wrong"); 
        }
    )
    
    setName('');
    setEmail('');
    setPassword('');
    setMobile('');
  }
  return (
    <div>
      <div className="registration-page">
        <div className="background-image" />
        <div className="registration-container">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />

            <input
              type="tel"
              placeholder="Mobile Number"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
