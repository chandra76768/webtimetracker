import React, { useState } from 'react';
import './App.css';
import Title from './components/Title';
import Accordion from './components/Accordion';
import Settings from './components/Settings';
import TimeChart from './components/TimeChart';
import WebAct from './components/WebAct';
import Sites from './components/Sites';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';
import Login from './components/Login';
import SignUpLoginPage from './components/SignupLoginPage';

function App() {
    const [showDashboard, setShowDashboard] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(true);
    const [isSignedUp, setIsSignedUp] = useState(true);

    const handleSignUp = (username) => {
        setLoggedInUser(username);
        setIsSignedUp(true);
    };

    const handleLogin = (username) => {
        setLoggedInUser(username);
        setShowDashboard(false)
    };

    const handleRedirectToMainPage = () => {
        setShowDashboard(false);
    };

    return (
        <div className="container">
            {loggedInUser ? (
                !showDashboard ? (
                    <>
                        <Title onDashboardClick={() => setShowDashboard(true)} />
                        
                        <TimeChart />
                        <Accordion name="All Web Activities" content={<WebAct />} />
                        <Accordion name="Productive Sites" content={<Sites type="productive" />} />
                        <Accordion name="Unproductive Sites" content={<Sites type="unproductive" />} />
                        <Accordion name="Settings" content={<Settings />} />
                        
                    </>
                ) : (
                    <Dashboard onBackClick={() => setShowDashboard(false)} />
                )
            ) : (
                <>
                    {!isSignedUp ? (
                        <SignUpLoginPage onSignUp={handleSignUp} /> 
                    ) : (
                        <Login onLogin={handleLogin} onRedirect={handleRedirectToMainPage}  />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
