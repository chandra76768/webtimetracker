import React, { useState, useEffect } from 'react';
import './Title.css';
import { Button, TextField, InputAdornment, IconButton, Grid } from '@mui/material';
import axios from 'axios';
import { AccountCircle, Lock, Phone } from '@mui/icons-material';

function Title({ onDashboardClick }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isNameStored, setIsNameStored] = useState(false);
    const [nameExists, setNameExists] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        const storedPassword = localStorage.getItem('password');
        const storedMobileNumber = localStorage.getItem('mobileNumber');
        if (storedName) {
            setUserName(storedName);
            setIsNameStored(true);
        }
        if (storedPassword) {
            setPassword(storedPassword);
        }
        if (storedMobileNumber) {
            setMobileNumber(storedMobileNumber);
        }
    }, []);

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
                    // Name is available, store in localStorage
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('password', password);
                    localStorage.setItem('mobileNumber', mobileNumber);
                    setIsNameStored(true);
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
        <div className="Title">
            <h1 style={{ color: "blue", fontSize: "40px", fontWeight: "bold", fontFamily: "Arial, sans-serif", marginBottom: "20px" }}>
                Time Tracker <br /> (eLitmus project)
            </h1>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    {isNameStored ? (
                        <h2 style={{ color: "orange", marginBottom: "20px" }}>{userName}</h2>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                name="userName"
                                placeholder="Enter your unique name"
                                value={userName}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter mobile number"
                                value={mobileNumber}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                onClick={handleSaveName}
                                size="small"
                                sx={{ borderRadius: '20px', marginTop: '10px' }}
                            >
                                Save
                            </Button>
                        </>
                    )}
                    {nameExists && (
                        <span style={{ color: 'red', marginTop: '10px' }}>This name already exists. Please choose a different one.</span>
                    )}
                </Grid>
                <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "flex-centre" }}>
                    <Button
                        onClick={onDashboardClick}
                        size="large"
                       
                        sx={{ borderRadius: '25px' }}
                    >
                        EXPORT
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Title;
