import React, { useState, useEffect } from 'react';
import './Sites.css';

function Sites({ type }) {
    const [addSiteInput, setAddSiteInput] = useState('');
    const [removeSiteInput, setRemoveSiteInput] = useState('');
    const [siteList, setSiteList] = useState([]);
    const [unproductiveSites, setUnproductiveSites] = useState([]);

    useEffect(() => {
        const savedSites = JSON.parse(localStorage.getItem(type)) || [];
        setSiteList(savedSites);
    }, [type]);

    useEffect(() => {
        const unproductiveSites = JSON.parse(localStorage.getItem('unproductive')) || {};
        console.log(unproductiveSites)
        setUnproductiveSites(Object.keys(unproductiveSites));
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
        <div className="sites">
            <form>
                <input type="text" placeholder="Add site to list" value={addSiteInput} onChange={(e) => setAddSiteInput(e.target.value)} />
                <button type="button" onClick={addSite}>Add</button>

                <input type="text" placeholder="Remove site from list" value={removeSiteInput} onChange={(e) => setRemoveSiteInput(e.target.value)} />
                <button type="button" onClick={removeSite}>Remove</button>
            </form>

            <dl>
                {siteList.map((site, index) => (
                    <div key={index}>
                        <dt>{site}</dt>
                        <dd onClick={() => handleSiteVisit(site)}>{site}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default Sites;
