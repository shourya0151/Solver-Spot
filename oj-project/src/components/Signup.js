import React, { useState } from 'react';
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err , setErr] = useState('');
  var history = useNavigate();

  const handleuserNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the signup data
    const signupData = {
      userName,
      email,
      password,
    };

    // Send a POST request to the backend server
    axios
      .post('http://localhost:4000/OJ/auth/signup', signupData)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        // Reset the form
        setuserName('');
        setPassword('');
        setEmail('');
        history('/');
      })
      .catch((error) => {
        // Handle errors
        console.log(error.response.data.error);
        setErr(error.response.data.error);
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <div className='login-box'>
        <h2>Signup</h2>
        <form  onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName"></label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={handleuserNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-group"></label>
            <input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <pre>{err?<div className='redText'>{err}</div>:""}</pre>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
