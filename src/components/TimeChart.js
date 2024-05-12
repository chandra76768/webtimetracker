import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts'; // Import PieChart and related components
import './TimeChart.css';

function upsert_data_to_server(data) {
    const userName = localStorage.getItem('userName');
    const userpassword = localStorage.getItem('password');
    const Mobile = localStorage.getItem('mobileNumber');
    // Retrieve the user's name from localStorage
    data.forEach((item) => {
        item.user = userName;
        item.date = new Date();
        item.password = userpassword;
        item.mobile = Mobile; // Add the user's name to each item in the data array
    });

    axios
        .put('http://localhost:9000/upsert', data)
        .then((response) => {
            console.log('Data upserted successfully', response);
        })
        .catch((err) => {
            console.log('Failed to upsert ', err);
        });
}

function TimeChart() {
    const [siteData, setSiteData] = useState([]);
    const [chartType, setChartType] = useState('PieChart');

    useEffect(() => {
        const updateSiteData = () => {
            const data = [];
            const domains = JSON.parse(localStorage.getItem('today_domains'));
            const domainKeys = Object.keys(domains);
            for (const domain of domainKeys) {
                data.push({ name: domain, usage: domains[domain] });
            }
            setSiteData(data);
            upsert_data_to_server(data); // Call the upsert function with the updated data
        };

        updateSiteData();

        // Subscribe to changes in local storage
        window.addEventListener('storage', updateSiteData);

        return () => {
            // Unsubscribe from changes in local storage
            window.removeEventListener('storage', updateSiteData);
        };
    }, []);

    const formatTooltip = (value) => {
        if (value < 60) {
            return `${value} seconds`;
        } else if (value < 3600) {
            const minutes = Math.floor(value / 60);
            const seconds = value % 60;
            return `${minutes} minutes ${seconds} seconds`;
        } else {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value - hours * 3600) / 60);
            const seconds = value % 60;
            return `${hours} hours ${minutes} minutes ${seconds} seconds`;
        }
    };

    const renderChart = () => {
        if (chartType === 'PieChart') {
            return (<PieChart width={400} height={400}>
                <Pie
                    data={siteData}
                    dataKey="usage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    innerRadius={100}
                    fill="#8884d8"
                    label={(entry) => (entry.value > 5 ? entry.name : '')} // Display label only when slice size is larger than 5
                >
                    {siteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => formatTooltip(value)} />
            </PieChart>
                
            );
        } else if (chartType === 'LineChart') {
            return (
                
                <LineChart data={siteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatTooltip(value)} />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            );
        }
    };

    return (
        <div className="time-chart-section">
            <div className="time-chart-heading">Today's Usage</div>
            <ResponsiveContainer width="100%" height={400}>
                {renderChart()}
            </ResponsiveContainer>
            <div height={20}></div>
            <div className="chart-buttons">
                <Button
                    variant={chartType === 'PieChart' ? 'contained' : 'outlined'}
                    onClick={() => setChartType('PieChart')}
                    size="large"
                    sx={{ borderRadius: '20px' }}
                >
                    PieChart
                </Button>
                <Button
                    variant={chartType === 'LineChart' ? 'contained' : 'outlined'}
                    onClick={() => setChartType('LineChart')}
                    size="large"
                    sx={{ borderRadius: '20px', marginRight: '20px' }}
                >
                    LineChart
                </Button>
            </div>
        </div>
    );
}

export default TimeChart;
