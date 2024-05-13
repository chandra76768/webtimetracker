import React, { useState, useEffect } from 'react';


function Pomodoro() {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
          if (message.type === "updateTime") {
            setCurrentTime(message.time);
          }
        });
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        chrome.runtime.sendMessage({ type: "startTimer" });
    };

    const handleStop = () => {
        chrome.runtime.sendMessage({ type: "stopTimer" });
    };

    return (
        <div className="pomodoro">
            <div className="time-display">
                Time Elapsed: {formatTime(currentTime)}
            </div>
            <div className="controls">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
            </div>
        </div>
    );
}

export default Pomodoro;
