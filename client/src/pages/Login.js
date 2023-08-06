import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      "email": email,
      "password": password
    }

    axios.post("http://localhost:5000/api/getUser", body).then(
      (res) => {
        navigate('/'); 
        console.log(res.data);
        message.success("login successfully");
      }
    ).catch(
      (error) => {
        if (error.response) {
          if (error.response.status === 404) {
            message.error("User Not found");
          } else if (error.response.status === 401) {
            message.error("Please Enter valid password");
          } else {
            message.error("something went wrong");
          }
        } else {
          message.error("Network error");
        }
      }
    )

  }

  return (
    <div>
      <div className="login-page">
        <div className="background-image" />
        <div className="login-container">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" required />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" required />

            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
