import React, { useState } from 'react';
import './Settings.css';

function Settings() {
    const [isTracking, setIsTracking] = useState(true);

    const toggleTracking = () => {
        const newValue = !isTracking;
        console.log(newValue)
        setIsTracking(newValue);
        localStorage.setItem('is_tracking', JSON.stringify(newValue));
    };

    const clearAllData = () => {
        localStorage.removeItem('domains');
        localStorage.removeItem('today_domains');
        localStorage.removeItem('productive');
        localStorage.removeItem('unproductive');
    };

    return (
        <div className="settings">
            <div className="settings-content">
                Stop Tracking After
                <select className="settings-options" defaultValue="300">
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

            <button className="settings-button" onClick={toggleTracking}>
                {isTracking ? "Pause Tracking" : "Continue Tracking"}
            </button>

            <button className="settings-button" onClick={clearAllData}>
                Clear All Data
            </button>
        </div>
    );
}

export default Settings;