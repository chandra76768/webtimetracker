import React, { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';
import App from '../App';

function SignUpLoginPage({ onSignUp }) {
    const [activePage, setActivePage] = useState('signup');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (username) => {
        setLoggedInUser(username);
    };

    return (
        <div className="signup-login-page">
            <div className="header">
                <button className={activePage === 'signup' ? 'active' : ''} onClick={() => setActivePage('signup')}>Sign Up</button>
                <button className={activePage === 'login' ? 'active' : ''} onClick={() => setActivePage('login')}>Login</button>
            </div>
            <div className="content">
                {activePage === 'signup' ? <SignUp onSignUp={onSignUp} /> : <Login onLogin={(username) => { handleLogin(username);  }} />}
                {loggedInUser && <App />}
            </div>
        </div>
    );
}

export default SignUpLoginPage;
