import React, { useState } from 'react';

function Login({ onLogin, onRedirect,setShowDashbord }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send login request to backend
        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the response contains user data upon successful login
            if (data.success) {
                // Call the callback function with the logged-in username
                onLogin(data.username);
                // Redirect to the main page
                setShowDashbord(false)
                onRedirect();
            }
        })
        .catch(error => console.error('Error logging in:', error));
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
