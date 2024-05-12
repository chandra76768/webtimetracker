import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function SignupPage({ onSignup }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [nameExists, setNameExists] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'userName') {
            setUserName(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'mobileNumber') {
            setMobileNumber(value);
        }
    };

    const handleSaveName = () => {
        // Check if the name exists in the database
        axios.get(`http://localhost:9000/checkName/${userName}`)
            .then(response => {
                if (response.data.available) {
                    // Name is available, invoke onSignup callback with user details
                    onSignup({ userName, password, mobileNumber });
                    // Reset nameExists state
                    setNameExists(false);
                } else {
                    // Name already exists, set warning
                    setNameExists(true);
                }
            })
            .catch(error => {
                console.error('Error checking name:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                name="userName"
                placeholder="Enter your unique name"
                value={userName}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={handleInputChange}
            />
            <Button
                onClick={handleSaveName}
                size="small"
                sx={{ borderRadius: '20px', marginLeft: '10px' }}
            >
                Save
            </Button>
            {nameExists && (
                <span style={{ color: 'red' }}>This name already exists. Please choose a different one.</span>
            )}
        </div>
    );
}

export default SignupPage;
