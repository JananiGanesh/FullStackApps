import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const body = formData.toString();

      // const body = JSON.stringify({ username, password });


      const response = await fetch('http://localhost:8081/api/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body:body,
        credentials: 'include',
      });

      

      if (response.ok) {
         console.log("Raw response:", body);
        const data = await response.json(); // Parse the JSON response
        console.log("Roles received:", data.roles);
        login(data.roles);
        sessionStorage.setItem('roles', JSON.stringify(data.roles));

        if (data.roles.includes('ROLE_ADMIN')) {
          console.log("Navigating to admin");
          navigate('/admin');
        } else if (data.roles.includes('ROLE_DEVOTEE')) {
          console.log("Navigating to devotee");
          navigate('/devotee');
        } else {
          console.log("Navigating to home");
          navigate('/home'); // Default user page
        }
      } else {
        setError('Login failed! Invalid credentials.');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-center vh-100 bg-light">
      <div className="w-26 h-26">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <br></br>
        <div className="d-flex align-items-center justify-content-center d-inline-flex flex-column">
          <form onSubmit={handleSubmit} className='d-flex flex-column items-center justify-cente mt-10'>
            <input type="text" placeholder="Username" className='border border-gray-300 p-2 rounded mb-4' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className='border border-gray-300 p-2 rounded mb-4' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className='bg-blue-500 text-black p-2 rounded'>Login</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        <p className='text-center mt-4'>Don't have an account? <a href="/signup" className='text-blue-500'>SignUp</a></p>
      </div>
    </div>
  )
}

export default Login
