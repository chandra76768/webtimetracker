import React from 'react';
import './Main.css';
import Title from './components/Title';
import Accordion from './components/Accordion';
import Settings from './components/Settings';
import TimeChart from './components/TimeChart';
import WebAct from './components/WebAct';
import Sites from './components/Sites';

function Main() {
    return (
        <div className="container">
            <Title />
            <Accordion name="Settings" content={<Settings />} />
            <TimeChart />
            <Accordion name="All Web Activities" content={<WebAct />} />
            <Accordion name="Productive Sites" content={<Sites type="productive" />} />
            <Accordion name="Unproductive Sites" content={<Sites type="unproductive" />} />
        </div>
    );
}

export default Main;