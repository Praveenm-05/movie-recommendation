import React, { useState } from 'react';
import './Reg.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Reg() {
  const [id, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password || !age) {
      alert('Please fill out all fields.');
      return;
    }

    const userData = {
      name: id,
      password: password,
      age: age,
      wishlist: []
    };

    try {
      await axios.post('http://localhost:3001/data', userData);
      alert('Registration successful!');
      setName('');
      setPassword('');
      setAge('');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('There was an error. Please try again later.');
    }
  };

  return (
    <div className='reg'>
      <h1 className='he'>STREAM SAGA</h1>  
      <form onSubmit={handleSubmit} className='f2'>
        <fieldset className='b2'>
          <br />
          <legend>REGISTER</legend>
          <label htmlFor='name'>Name   &nbsp;&nbsp;  : </label>
          <input 
            type="text" 
            value={id} 
            placeholder='Enter your Name'
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <br />
          <label htmlFor='Pwd'>Passwd &nbsp;&nbsp;: </label>
          <input 
            type="password" 
            value={password} 
            placeholder='Enter the password'
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <br />
          <label htmlFor='Age'>Age &nbsp;&nbsp;&nbsp;&nbsp;  : </label>
          <input 
            type="number" 
            value={age} 
            placeholder='Enter your Age'
            onChange={(e) => setAge(e.target.value)} 
            required 
          /> 
          <br /> <br />
          <button type="submit">Register</button>
          <p className="signin-link">Already have an account? <Link to="/">Sign In</Link></p>
        </fieldset>
      </form>
    </div>
  );
}

export default Reg;
