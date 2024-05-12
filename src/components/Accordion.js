import React, { useState } from 'react';
import './Accordion.css';

function Accordion({ name, content }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="accordion">
            <div type="button" className="accordion-title" onClick={() => setIsActive(!isActive)}>
                {name}
                <div className="accordion-indicator">{isActive ? '-' : '+'}</div>
            </div>

            {isActive && (
                <div className="accordion-content">
                    {content}
                </div>
            )}
        </div>
    );
}

export default Accordion;
