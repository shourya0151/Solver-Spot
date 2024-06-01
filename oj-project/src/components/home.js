import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import Navbar from './Navbar';

const Home = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/OJ/problem/')
      .then((response) => {
        console.log('Response:', response);
        setProblems(response.data.problemList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleProblemClick = (problem) => {
    //this is how I am sending problem data to problem page
    navigate('/problem', { state: { problem } });
  };

  return (

    <div className="container">
      <Navbar/>
      <h1 className="title">Problem List</h1>
      <div className="problem-list">
        {problems.length === 0 ? (
          <p className="loading-message">Loading problems...</p>
        ) : (
          problems.map((problem, index) => (
            <div
              className="problem"
              key={index}
              onClick={() => handleProblemClick(problem)}
            >
              {problem.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
