import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './login';
import Reg from './Regiser';
import App from './App';
import List from './Bar'
//import './Start.css';

function Start() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/app" element={<App />} />
    
      </Routes>
    </Router>
  );
}

export default Start;
