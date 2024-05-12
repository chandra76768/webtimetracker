import React, { useEffect, useState } from 'react';
import './WebAct.css';

function WebAct() {
    const [siteList, setSiteList] = useState([]);

    useEffect(() => {
        const updateSiteList = () => {
            const domains = JSON.parse(localStorage.getItem('today_domains'));
            const domainKeys = Object.keys(domains);
            setSiteList(domainKeys);
        };

        updateSiteList();

        // Subscribe to changes in local storage
        window.addEventListener('storage', updateSiteList);

        return () => {
            // Unsubscribe from changes in local storage
            window.removeEventListener('storage', updateSiteList);
        };
    }, []);

    const formatSeconds = (seconds) => {
        if (seconds < 60) {
            return seconds + " s";
        } else if (seconds < 3600) {
            return Math.floor(seconds / 60) + " m " + (seconds % 60) + " s";
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds - hours * 3600) / 60);
            return hours + " h " + minutes + " m " + (seconds % 60) + " s";
        }
    };

    return (
        <div className="webact">
            <dl>
                {siteList.map((site) =>
                    <div key={site}>
                        <dt>{site}</dt>
                        <dd>{formatSeconds(JSON.parse(localStorage.getItem('today_domains'))[site])}</dd>
                    </div>
                )}
            </dl>
        </div>
    );
}

export default WebAct;
