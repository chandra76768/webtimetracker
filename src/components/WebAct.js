import React, { useEffect, useState } from 'react';
import './WebAct.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Website</TableCell>
                            <TableCell>Time Spent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {siteList.map((site) => (
                            <TableRow key={site}>
                                <TableCell>{site}</TableCell>
                                <TableCell>{formatSeconds(JSON.parse(localStorage.getItem('today_domains'))[site])}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default WebAct;
