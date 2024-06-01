import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Problem from './components/Problem';
import {  Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
    
  );
};

export default App;
