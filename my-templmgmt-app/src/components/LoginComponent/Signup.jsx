import React from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';



function Signup() {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
    
        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true);
            setError('');
         
    
            const signupData = {
                username,
                email,
                password,
            };
            const csrfToken = Cookies.get('THE_EXACT_COOKIE_NAME');
console.log("CSRF Token from Cookie:", csrfToken);
            try {
                const response = await fetch('http://localhost:8081/api/v1/signup/addUser', { // Replace '/api/signup' with your server endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify(signupData),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Signup successful:', data);
                    alert('Signup successful!');
                    // Optionally redirect the user or clear the form
                    setUsername('');
                    setEmail('');
                    setPassword('');
                } else {
                    const errorData = await response.json();
                    console.error('Signup failed:', errorData);
                    setError(errorData.error || 'Signup failed. Please try again.');
                }
            } catch (error) {
                console.error('There was an error sending the request:', error);
                setError('An unexpected error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
       
    
    return (
        <div className="d-flex flex-row align-items-center justify-content-center vh-100 bg-light">
            <div className="w-26 h-26">
                <h1 className='text-3xl font-bold align-items-center text-center justify-content-center'>SignUp Here</h1>
                <br></br>
                <div className="d-flex align-items-center justify-content-center d-inline-flex flex-column">
                <form onSubmit={handleSubmit} className='d-flex flex-column items-center justify-cente mt-10'>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                        <input type="text" placeholder="Username" 
                        value={username} onChange={(e)=>setUsername(e.target.value)} required className='border border-gray-300 p-2 rounded mb-4' />
                        <input type="email" placeholder="Email" 
                        vaue={email} onChange={(e)=>setEmail(e.target.value)} required className='border border-gray-300 p-2 rounded mb-4' />
                        <input type="password" placeholder="Password" 
                        value={password} onChange={(e)=>setPassword(e.target.value)} required className='border border-gray-300 p-2 rounded mb-4' />
                        <button type="submit" disabled={loading} className='bg-blue-500 text-black p-2 rounded'>
                            {loading ? 'Signing up...' : 'SignUp'}
                    </button>
                    </form>
                </div>
                <p className='text-center mt-4'>Already have an account? <a href="/login" className='text-blue-500'>Login</a></p>
            </div>
           
        </div>
    
        
    )
}

export default Signup
