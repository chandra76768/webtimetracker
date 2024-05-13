import React, { useState } from 'react';


function SetLimit({ webActivitySites }) {
    const [selectedSite, setSelectedSite] = useState('');
    const [timeLimit, setTimeLimit] = useState(300); // Default time limit of 5 minutes
    const [isTracking, setIsTracking] = useState(true); // Default state for tracking

    // Function to handle toggling tracking state
    const toggleTracking = () => {
        setIsTracking(!isTracking);
        localStorage.setItem('is_tracking', JSON.stringify(!isTracking)); // Update local storage
    };

    // Function to handle setting the time limit
    const handleTimeLimitChange = (event) => {
        const newLimit = parseInt(event.target.value);
        setTimeLimit(newLimit);
        // Save the new time limit to local storage or use it in your application logic
    };

    // Function to handle selecting a site
    const handleSiteSelect = (event) => {
        setSelectedSite(event.target.value);
    };

    // Function to handle checking usage against time limit for selected site
    const checkUsage = () => {
        // Here you can fetch usage data for the selected site from local storage or your data source
        const siteUsage = 360; // Example usage time in seconds (6 minutes)
        if (siteUsage > timeLimit) {
            alert(`You have exceeded the time limit for ${selectedSite}`);
        }
    };

    return (
        <div className="set-limit">
            <div className="set-limit-content">
                <label htmlFor="site-select">Select Site:</label>
                <select id="site-select" className="set-limit-options" value={selectedSite} onChange={handleSiteSelect}>
                    <option value="">Select a site</option>
                    {webActivitySites.map((site, index) => (
                        <option key={index} value={site}>{site}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="time-limit-select">Time Limit:</label>
                <select id="time-limit-select" className="set-limit-options" value={timeLimit} onChange={handleTimeLimitChange}>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                    <option value="600">10 minutes</option>
                    <option value="900">15 minutes</option>
                    <option value="1800">30 minutes</option>
                    <option value="3600">1 hour</option>
                    <option value="86400">Infinite</option>
                </select>
                of Inactivity
            </div>

            <button className="set-limit-button" onClick={toggleTracking}>
                {isTracking ? "Pause Tracking" : "Continue Tracking"}
            </button>

            {/* Example usage */}
            <button className="set-limit-button" onClick={checkUsage}>
                Check Usage
            </button>
        </div>
    );
}

export default SetLimit;
