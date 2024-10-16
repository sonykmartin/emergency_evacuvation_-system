// src/Room.js
import React from 'react';
import './Room.css';

const Room = ({ roomId, exit }) => {
    return (
        <div className="room" style={{ left: `${(roomId - 1) * 150}px`, top: '50px' }}>
            <h3>Room {roomId}</h3>
            <div className="exit-door" style={{ position: 'absolute', bottom: '0', left: '50%' }}>
                Exit
            </div>
        </div>
    );
};

export default Room;
