import React, { useState, useEffect } from 'react';
import './Sites.css';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

function Sites({ type }) {
    const [addSiteInput, setAddSiteInput] = useState('');
    const [removeSiteInput, setRemoveSiteInput] = useState('');
    const [siteList, setSiteList] = useState([]);
    const [unproductiveSites, setUnproductiveSites] = useState([]);
    const [webActivitySites, setWebActivitySites] = useState([]);

    useEffect(() => {
        const savedSites = JSON.parse(localStorage.getItem(type)) || [];
        setSiteList(savedSites);
    }, [type]);

    useEffect(() => {
        const unproductiveSites = JSON.parse(localStorage.getItem('unproductive')) || {};
        setUnproductiveSites(Object.keys(unproductiveSites));
    }, []);

    useEffect(() => {
        const webActivity = JSON.parse(localStorage.getItem('today_domains')) || {};
        const webActivitySites = Object.keys(webActivity);
        setWebActivitySites(webActivitySites);
    }, []);

    const addSite = () => {
        if (addSiteInput.length === 0 || siteList.includes(addSiteInput)) return;
        const updatedList = [...siteList, addSiteInput];
        setSiteList(updatedList);
        localStorage.setItem(type, JSON.stringify(updatedList));
        setAddSiteInput('');
    };

    const removeSite = () => {
        if (removeSiteInput.length === 0 || !siteList.includes(removeSiteInput)) return;
        const updatedList = siteList.filter((item) => item !== removeSiteInput);
        setSiteList(updatedList);
        localStorage.setItem(type, JSON.stringify(updatedList));
        setRemoveSiteInput('');
    };

    const handleSiteVisit = (url) => {
        if (unproductiveSites.includes(url)) {
            alert('You are using an unproductive site/restricted site.');
        }
    };

    return (
        <div className="sites-container">
            <form className="form-container">
                <FormControl fullWidth className="dropdown-container">
                    <InputLabel id="add-site-label">Select Site to Add</InputLabel>
                    <Select
                        labelId="add-site-label"
                        id="add-site-select"
                        value={addSiteInput}
                        onChange={(e) => setAddSiteInput(e.target.value)}
                    >
                        {webActivitySites.map((site, index) => (
                            <MenuItem key={index} value={site}>{site}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={addSite}
                    endIcon={<AddCircleOutline />}
                    className="action-button"
                >
                    Add
                </Button>

                <FormControl fullWidth className="dropdown-container">
                    <InputLabel id="remove-site-label">Select Site to Remove</InputLabel>
                    <Select
                        labelId="remove-site-label"
                        id="remove-site-select"
                        value={removeSiteInput}
                        onChange={(e) => setRemoveSiteInput(e.target.value)}
                    >
                        {siteList.map((site, index) => (
                            <MenuItem key={index} value={site}>{site}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={removeSite}
                    endIcon={<RemoveCircleOutline />}
                    className="action-button"
                >
                    Remove
                </Button>
            </form>

            <ul className="site-list">
                {siteList.map((site, index) => (
                    <li key={index} className="site-item" onClick={() => handleSiteVisit(site)}>
                        {site}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sites;
